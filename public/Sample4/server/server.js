require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// ─── Secured banking details via environment variables ───────────────────────
const BANKING_REVEAL_TOKEN = process.env.BANKING_TOKEN || "reveal-token-change-me";
const BANKING_DETAILS = {
  bankName: process.env.BANK_NAME || "Commercial Bank of Ceylon",
  accountHolder: process.env.ACCOUNT_HOLDER || "Colombo Building Supplies (Pvt) Ltd",
  branch: process.env.BANK_BRANCH || "Colpetty Branch",
  accountNumber: process.env.ACCOUNT_NUMBER || "8001234567890",
  swiftCode: process.env.SWIFT_CODE || "CCEYLKLX",
};

// ─── Ensure uploads directory exists ─────────────────────────────────────────
(async () => {
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch {}
})();

// ─── Multer: file upload config ───────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".jpg", ".jpeg", ".png", ".dwg", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error("File type not allowed. Use PDF, JPG, PNG, DWG, or DOC."));
  },
});

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: /^http:\/\/localhost(:\d+)?$/ }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── In-memory data store ─────────────────────────────────────────────────────
let store = { leads: [], testimonials: [] };

async function loadData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      store = {
        leads: Array.isArray(parsed.leads) ? parsed.leads : [],
        testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      };
    }
  } catch (err) {
    if (err.code !== "ENOENT") console.error("Failed to read data.json:", err);
  }
}

async function saveData() {
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// GET /api/testimonials — public
app.get("/api/testimonials", (req, res) => {
  res.json(store.testimonials);
});

// POST /api/leads — save a new lead with optional file upload
app.post("/api/leads", upload.single("attachment"), async (req, res) => {
  const { name, email, phone, service, volume, urgency, notes } = req.body || {};

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ error: "Name, email, phone, and service are required." });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(String(email))) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const lead = {
    id: uuidv4(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    service: String(service).trim(),
    volume: volume ? String(volume).trim() : "",
    urgency: urgency ? String(urgency).trim() : "",
    notes: notes ? String(notes).trim() : "",
    attachmentFilename: req.file ? req.file.filename : null,
    attachmentOriginalName: req.file ? req.file.originalname : null,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  store.leads.push(lead);

  try {
    await saveData();
    res.status(201).json({ success: true, id: lead.id });
  } catch (err) {
    console.error("Failed to save lead:", err);
    res.status(500).json({ error: "Failed to save your request. Please try again." });
  }
});

// POST /api/reveal-banking — returns banking details ONLY if token matches
app.post("/api/reveal-banking", (req, res) => {
  const { token } = req.body || {};
  if (!token || token !== BANKING_REVEAL_TOKEN) {
    return res
      .status(403)
      .json({ error: "Invalid token. Please submit the quote form first to unlock payment details." });
  }
  res.json(BANKING_DETAILS);
});

// GET /api/leads — admin endpoint protected with HTTP Basic Auth
app.get("/api/leads", (req, res) => {
  const auth = req.headers.authorization;
  const expected =
    "Basic " + Buffer.from(`admin:${process.env.ADMIN_PASSWORD || "changeme"}`).toString("base64");
  if (auth !== expected) {
    res.setHeader("WWW-Authenticate", 'Basic realm="CBS Admin"');
    return res.status(401).json({ error: "Unauthorized. Admin credentials required." });
  }
  res.json({
    count: store.leads.length,
    new: store.leads.filter((l) => l.status === "new").length,
    leads: store.leads.slice().reverse(), // newest first
  });
});

// ─── Error handling ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Maximum size is 10MB." });
    }
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error." });
});

// ─── Start ────────────────────────────────────────────────────────────────────
loadData()
  .catch(console.error)
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 CBS API Server  →  http://localhost:${PORT}`);
      console.log(`📋 Leads endpoint  →  http://localhost:${PORT}/api/leads`);
      console.log(`🔒 Banking reveal  →  POST /api/reveal-banking\n`);
    });
  });
