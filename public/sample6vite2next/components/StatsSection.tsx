import { Award, Users, Clock, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Award, value: "208+", label: "Projects Completed", sub: "Across all sectors" },
  { icon: Users, value: "3,400+", label: "Happy Clients", sub: "Island-wide" },
  { icon: Clock, value: "35+", label: "Years of Experience", sub: "Trusted since 1989" },
  { icon: ThumbsUp, value: "4.9/5", label: "Customer Rating", sub: "Based on reviews" },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: "#1C2B4A" }} id='stats'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
            Trusted For Decades
          </span>
          <h2 className="text-white mt-2">Numbers That Speak</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.3)" }}
                >
                  <Icon size={22} style={{ color: "#C9A227" }} />
                </div>
                <div
                  style={{ color: "#C9A227", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}
                  className="mb-1"
                >
                  {stat.value}
                </div>
                <div className="text-white text-sm font-medium mb-0.5">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
