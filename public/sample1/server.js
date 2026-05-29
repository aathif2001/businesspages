const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let store = {
  feedback: [],
  enquiries: [],
};

async function loadData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      store = {
        feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [],
        enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
      };
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Failed to read data.json:", error);
    }
  }
}

async function saveData() {
  const payload = JSON.stringify(store, null, 2);
  await fs.writeFile(DATA_FILE, payload, "utf8");
}

app.get("/api/feedback", (req, res) => {
  res.json(store.feedback);
});

app.post("/api/feedback", async (req, res) => {
  const { name, rating, comment } = req.body || {};

  if (!comment || typeof comment !== "string") {
    return res.status(400).json({ error: "Comment is required." });
  }

  const safeName =
    typeof name === "string" && name.trim() ? name.trim() : "Anonymous";
  const numRating = Number.isFinite(Number(rating))
    ? Math.max(1, Math.min(5, Number(rating)))
    : 0;

  if (!numRating) {
    return res.status(400).json({ error: "Rating between 1 and 5 is required." });
  }

  const entry = {
    id: Date.now().toString(36),
    name: safeName,
    rating: numRating,
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
  };

  store.feedback.push(entry);

  try {
    await saveData();
    res.status(201).json(entry);
  } catch (error) {
    console.error("Unable to save feedback:", error);
    res.status(500).json({ error: "Failed to save feedback." });
  }
});

app.post("/api/enquiries", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Name, email, phone and message are required." });
  }

  const enquiry = {
    id: Date.now().toString(36),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    subject: subject ? String(subject).trim() : "",
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  store.enquiries.push(enquiry);

  try {
    await saveData();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Unable to save enquiry:", error);
    res.status(500).json({ error: "Failed to save enquiry." });
  }
});

loadData()
  .catch((error) => {
    console.error("Failed to load existing data:", error);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });

