import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Personality Radar SVG ──────────────────────────────────────────────────── */
const RADAR_TRAITS = [
  { label: "Curiosity",     score: 0.92 },
  { label: "Analysis",      score: 0.95 },
  { label: "Discipline",    score: 0.88 },
  { label: "Problem Solving", score: 0.93 },
  { label: "Communication", score: 0.85 },
  { label: "Teamwork",      score: 0.87 },
  { label: "Detail Focus",  score: 0.90 },
  { label: "Speed",         score: 0.84 },
];

const polarToXY = (angle: number, r: number, cx: number, cy: number) => ({
  x: cx + r * Math.sin(angle),
  y: cy - r * Math.cos(angle),
});

const PersonalityRadar = () => {
  const n   = RADAR_TRAITS.length;
  const cx  = 200;
  const cy  = 200;
  const R   = 150;
  const ref = useRef<SVGPolygonElement>(null);

  const buildPoints = (scale: number) =>
    RADAR_TRAITS.map((t, i) => {
      const angle  = (2 * Math.PI * i) / n;
      const pt     = polarToXY(angle, t.score * R * scale, cx, cy);
      return `${pt.x},${pt.y}`;
    }).join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let frame = 0;
      const total = 50;
      const tick = () => {
        frame++;
        const t = frame / total;
        const ease = 1 - Math.pow(1 - t, 3);
        el.setAttribute("points", buildPoints(ease));
        if (frame < total) requestAnimationFrame(tick);
      };
      el.setAttribute("points", buildPoints(0));
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <section style={{ position: "relative", padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(107,72,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="section-wrapper">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
          Self-Assessment
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
          My <span className="violet-text-gradient">Personality</span> Radar
        </motion.h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ flexShrink: 0 }}>
            <svg viewBox="0 0 400 400" width={360} height={360} style={{ overflow: "visible", maxWidth: "100%", height: "auto" }}>
              {rings.map((r, ri) => (
                <polygon key={ri}
                  points={RADAR_TRAITS.map((_, i) => {
                    const a  = (2 * Math.PI * i) / n;
                    const pt = polarToXY(a, r * R, cx, cy);
                    return `${pt.x},${pt.y}`;
                  }).join(" ")}
                  fill="none" stroke="rgba(107,72,255,0.15)" strokeWidth={1} />
              ))}

              {RADAR_TRAITS.map((_, i) => {
                const a   = (2 * Math.PI * i) / n;
                const tip = polarToXY(a, R, cx, cy);
                return <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="rgba(107,72,255,0.12)" strokeWidth={1} />;
              })}

              <polygon
                ref={ref}
                points={buildPoints(0)}
                fill="rgba(107,72,255,0.18)"
                stroke="url(#radarGrad)"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />

              <defs>
                <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#6B48FF" />
                  <stop offset="100%" stopColor="#E8A045" />
                </linearGradient>
              </defs>

              {RADAR_TRAITS.map((t, i) => {
                const a    = (2 * Math.PI * i) / n;
                const dot  = polarToXY(a, t.score * R, cx, cy);
                const lbl  = polarToXY(a, R + 24, cx, cy);
                const pct  = polarToXY(a, R + 42, cx, cy);
                return (
                  <g key={t.label}>
                    <circle cx={dot.x} cy={dot.y} r={4} fill="#6B48FF" stroke="#E8A045" strokeWidth={1.5} />
                    <text x={lbl.x} y={lbl.y} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "var(--font-body)", fontSize: 11, fill: "var(--color-body-muted)", fontWeight: 600 }}>
                      {t.label}
                    </text>
                    <text x={pct.x} y={pct.y} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "var(--font-body)", fontSize: 9.5, fill: "var(--color-accent-gold)", fontWeight: 700 }}>
                      {Math.round(t.score * 100)}%
                    </text>
                  </g>
                );
              })}

              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                style={{ fontFamily: "var(--font-heading)", fontSize: 12, fill: "rgba(107,72,255,0.6)", fontWeight: 700 }}>
                ME
              </text>
            </svg>
          </motion.div>

          <div style={{ flex: "1 1 280px", maxWidth: 400 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-faint)",
              textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "1.5rem" }}>
              Self-rated Traits
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {RADAR_TRAITS.map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", width: 120, flexShrink: 0 }}>{t.label}</span>
                  <div style={{ flex: 1, height: 5, borderRadius: 999, background: "var(--color-border)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.score * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                      style={{ height: "100%", borderRadius: 999,
                        background: "linear-gradient(90deg, #6B48FF, #E8A045)" }}
                    />
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-accent-gold)", fontWeight: 700, width: 34, textAlign: "right", flexShrink: 0 }}>
                    {Math.round(t.score * 100)}%
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)", marginTop: "2rem", lineHeight: 1.7 }}>
              These ratings reflect my commitment to data analysis. High scores in Analysis and Problem Solving mirror my dedication to logical database designs, while Teamwork and Detail Focus are values I practice daily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TRAITS = [
  {
    title: "Data Analytics",
    desc: "Performing comprehensive EDA, predictive modeling, data cleaning and wrangling using Python, Pandas, and Scikit-learn.",
    iconPath: "M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586",
    color: "#E8A045",
  },
  {
    title: "Data Visualisation",
    desc: "Designing interactive dashboards and visual reports in Power BI to frame business scenarios and deliver data-driven insights.",
    iconPath: "M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm0 14a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2z",
    color: "#6B48FF",
  },
  {
    title: "Relational Databases",
    desc: "Querying, schema design, stored procedures, joins, and data manipulation inside SQL Server and MySQL.",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    color: "#E8A045",
  },
  {
    title: "Web Technologies",
    desc: "Developing web frontends using HTML5, CSS3, JavaScript, and React to build dashboard interfaces.",
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    color: "#6B48FF",
  },
];

const QUICK_FACTS = [
  { label: "Location",  value: "Ghaziabad, Uttar Pradesh, India",   href: undefined },
  { label: "Degree",    value: "B.Tech (CSE) — NITRA Tech Campus", href: undefined },
  { label: "Degree Status", value: "Class of 2026",                 href: undefined },
  { label: "Email",     value: "umangpandey.co@gmail.com",          href: undefined },
  { label: "Phone",     value: "+91 7518593228",                    href: undefined },
  { label: "GitHub",    value: "github.com/Umangpandey75",          href: "https://github.com/Umangpandey75",                  hoverColor: "#E8A045" },
  { label: "LinkedIn",  value: "/in/umang-pandey-01b486273",        href: "https://linkedin.com/in/umang-pandey-01b486273",    hoverColor: "#E8A045" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => (
  <main className="page-content" id="page-about">
    <section style={{ padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,72,255,0.08) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />

      <div className="section-wrapper">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          Introduction
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "2.5rem" }}
        >
          About <span className="saffron-text-gradient">Me</span>
        </motion.h1>

        <div style={{ display: "flex", gap: "5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            style={{ flex: "0 0 auto", position: "relative" }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: 300 }}>
              <div style={{
                position: "absolute", inset: -2,
                borderRadius: 28,
                background: "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-violet))",
                zIndex: 0,
              }} />
              <div style={{
                position: "relative", zIndex: 1,
                width: "100%", aspectRatio: "300 / 380",
                borderRadius: 26,
                overflow: "hidden",
                background: "var(--color-photo-bg)",
                border: "3px solid var(--color-photo-border)",
              }}>
                <img
                  src="/my.jpeg"
                  alt="Umang Pandey — CS Student & Data Analyst"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://avatars.githubusercontent.com/u/269774892?v=4"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 55%)", pointerEvents: "none" }} />
              </div>

              <div style={{ position: "absolute", top: -10, left: -10, width: 28, height: 28, borderTop: "3px solid var(--color-accent-gold)", borderLeft: "3px solid var(--color-accent-gold)", borderRadius: "6px 0 0 0", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: -10, right: -10, width: 28, height: 28, borderBottom: "3px solid var(--color-accent-violet)", borderRight: "3px solid var(--color-accent-violet)", borderRadius: "0 0 6px 0", zIndex: 2 }} />

              <div style={{
                position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", zIndex: 3,
                background: "var(--color-nav-bg-mobile)", border: "1px solid rgba(232,160,69,0.3)",
                borderRadius: 9999, padding: "0.45rem 1.4rem",
                fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)",
                fontWeight: 600, whiteSpace: "nowrap", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", gap: "0.45rem",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0, boxShadow: "0 0 8px #22C55E" }} />
                Open to Opportunities
              </div>
            </div>
          </motion.div>

          <div style={{ flex: "1 1 280px", paddingTop: "0.5rem" }}>
            {[
              "I'm Umang Pandey, a Computer Science student at NITRA Technical Campus in Ghaziabad, who genuinely enjoys querying datasets, building Power BI dashboards, and turning numbers into visual insights.",
              "I care about analyzing data patterns that help business decisions. I learn fast, take ownership of what I build, and enjoy transforming raw databases into clear visual stories.",
              "Beyond data, I explore full-stack web applications and machine learning, bridging the gap between database management and end-user visualizations.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body)", lineHeight: 1.85, marginBottom: "1.35rem" }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "0.75rem", marginTop: "1.75rem" }}
            >
              {QUICK_FACTS.map((f) => {
                const inner = (
                  <div key={f.label} className="glass-card" style={{ padding: "0.75rem 1rem", borderRadius: 12, transition: "border-color 0.2s, box-shadow 0.2s" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--color-body-faint)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {f.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: f.href ? (f as { hoverColor?: string }).hoverColor ?? "var(--color-accent-gold)" : "var(--color-accent-gold)", fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {f.value}
                    </p>
                  </div>
                );
                return f.href ? (
                  <a key={f.label} href={f.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    {inner}
                  </a>
                ) : (
                  <div key={f.label}>{inner}</div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ marginTop: "2.25rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a href="https://mail.google.com/mail/?view=cm&to=umangpandey.co@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-primary" id="about-cta-email">
                Send Me an Email
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="about-cta-resume">
                View Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Strengths ── */}
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-wrapper">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          What I bring
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-heading)", marginBottom: "3rem" }}
        >
          My <span className="violet-text-gradient">Strengths</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}
        >
          {TRAITS.map((t) => (
            <motion.div
              key={t.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card"
              style={{ padding: "2rem 1.75rem", borderRadius: 20, cursor: "default", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `${t.color}12`,
                border: `1px solid ${t.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={t.iconPath} />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.05rem", color: "var(--color-heading)", marginBottom: "0.65rem" }}>
                {t.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-muted)", lineHeight: 1.75 }}>
                {t.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── ORIGIN STORY ── */}
    <section style={{ position: "relative", padding: "5rem 0", borderTop: "1px solid var(--color-border)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(232,160,69,0.05) 0%, transparent 70%)" }} />
      <div className="section-wrapper" style={{ maxWidth: 820, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "2rem" }}>
          — Origin Story —
        </motion.p>

        <motion.blockquote initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ borderLeft: "3px solid var(--color-accent-gold)", paddingLeft: "1.5rem", margin: "0 0 2.5rem", fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", color: "var(--color-heading)", lineHeight: 1.4 }}>
          "I didn't start with complex machine learning. I started with basic Python loops and a question: <em style={{ color: "var(--color-accent-gold)" }}>how do we extract logic from raw records?"</em>
        </motion.blockquote>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.8rem" }}>
          It was 2021. Wrote my first lines of Python. Stared at the output. That first script launched something permanent. I was fascinated by the clarity of python code and how it could automate operations.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
          Ghaziabad wasn't just a place to study; it became my sandbox. I spent hours building SQL schemas, querying mock databases, and learning how database relationships work. Every error in a JOIN query at midnight became a learning lesson.
        </motion.p>

        <motion.blockquote initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ borderLeft: "3px solid var(--color-accent-violet)", paddingLeft: "1.5rem", margin: "0 0 2.5rem",
            fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            color: "var(--color-heading)", lineHeight: 1.4 }}>
          "Visualizing data is not just drawing charts.<br />
          <em style={{ color: "var(--color-accent-violet-light)" }}>It's about helping business owners make decisions.</em>"
        </motion.blockquote>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.8rem" }}>
          In 2025, I did Tata virtual internships for Data Analytics and Data Visualisation. Designing interactive dashboards for business scenarios rewired how I looked at data. It's not just numbers; it's the story you tell with them.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
          In 2026, I built Heart-IQ, an ML classification app. Standing in front of my peers presenting predictive health data made me realize — the best analysts are the ones who can speak clearly to their audience.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", margin: "3rem 0", padding: "1.5rem 0" }}>
          {[
            { n: "2021", label: "Year I wrote my first Python script" },
            { n: "2+",    label: "Tata Virtual Trainee Internships" },
            { n: "4+",    label: "Functional Projects Completed" },
            { n: "2026",  label: "Graduation Year" },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: "1 1 140px", textAlign: "center", padding: "0.5rem 1rem",
              borderRight: i < 3 ? "1px solid var(--color-border)" : "none" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2.2rem", color: "var(--color-accent-gold)", lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-body-faint)", marginTop: "0.4rem" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── DAY IN MY LIFE ── */}
    <section style={{ position: "relative", padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
      <div className="section-wrapper">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
          A Typical Day
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
          24 Hours in My <span className="saffron-text-gradient">World</span>
        </motion.h2>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, var(--color-accent-violet), var(--color-accent-gold), transparent)",
            opacity: 0.3, transform: "translateY(-50%)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { time: "06:00", label: "Wake up & light exercise", icon: "🌅", color: "#22C55E",  above: true },
              { time: "07:30", label: "Read tech blogs / query practices", icon: "☕", color: "#E8A045", above: false },
              { time: "09:00", label: "B.Tech CSE classes", icon: "🎓", color: "#6B48FF",       above: true },
              { time: "12:30", label: "Lunch & GitHub/Kaggle scroll", icon: "🍽️", color: "#00CEA8", above: false },
              { time: "14:00", label: "Programming labs / code practices", icon: "💻", color: "#E8A045", above: true },
              { time: "17:00", label: "Gym / physical activity", icon: "🏃", color: "#22C55E",  above: false },
              { time: "19:00", label: "Dashboard designs & SQL scripting", icon: "📊", color: "#6B48FF", above: true },
              { time: "22:00", label: "Deep work — dataset analysis", icon: "🔥", color: "#F472B6",  above: false },
              { time: "00:30", label: "Note down next day tasks", icon: "📝", color: "#E8A045", above: true },
              { time: "01:30", label: "Sleep", icon: "🌙", color: "#6B48FF",    above: false },
            ].map((item, i) => (
              <motion.div key={item.time}
                initial={{ opacity: 0, y: item.above ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem", position: "relative" }}>

                <div className="hidden sm:block" style={{ flex: 1, textAlign: "right", paddingRight: "1.5rem", opacity: item.above ? 1 : 0, pointerEvents: item.above ? "auto" : "none" }}>
                  <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end",
                    padding: "0.7rem 1.1rem", borderRadius: 14, background: "var(--color-card)",
                    border: `1px solid ${item.color}28`, maxWidth: 220 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{item.time}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", textAlign: "right" }}>{item.icon} {item.label}</span>
                  </div>
                </div>

                <div className="sm:mx-0 mr-4 sm:flex-shrink-0" style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, boxShadow: `0 0 10px ${item.color}88`, zIndex: 1 }} />

                <div className="flex-1 pl-0 sm:pl-6" style={{ opacity: 1, pointerEvents: "auto" }}>
                  <div className="flex sm:hidden flex-col items-start" style={{
                    padding: "0.7rem 1.1rem", borderRadius: 14, background: "var(--color-card)",
                    border: `1px solid ${item.color}28`, maxWidth: "100%" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{item.time}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)" }}>{item.icon} {item.label}</span>
                  </div>

                  <div className="hidden sm:inline-flex sm:flex-col sm:items-start" style={{
                    opacity: item.above ? 0 : 1, pointerEvents: item.above ? "none" : "auto",
                    padding: "0.7rem 1.1rem", borderRadius: 14, background: "var(--color-card)",
                    border: `1px solid ${item.color}28`, maxWidth: 220 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{item.time}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)" }}>{item.icon} {item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── Radar ── */}
    <PersonalityRadar />

    {/* ── Letter to Future Self ── */}
    <section style={{ position: "relative", padding: "5rem 0 7rem", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(107,72,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="section-wrapper" style={{ maxWidth: 720, margin: "0 auto" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "2rem", textAlign: "center" }}>
          — Written on 14 June 2026 —
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 40, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="p-5 sm:p-10 lg:p-14"
          style={{
            borderRadius: 24,
            background: "rgba(232,160,69,0.04)",
            border: "1px solid rgba(232,160,69,0.18)",
            boxShadow: "0 20px 80px rgba(107,72,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative",
          }}>

          <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>
            PRIVATE · JUNE 2026
          </div>

          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1.05rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            Dear Umang — 5 years from now,
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            I hope you're reading this from somewhere you worked hard to reach. Leading a team of analytics developers, or scaling a data product.
            I hope you visualised or predicted something this week that helped solve a critical business bottleneck.
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            Right now it's 2026. I'm a final-year B.Tech CSE student in Ghaziabad, working on data visualizations, complex SQL schemas, and predictive ML models.
            I completed Tata virtual internships and built multiple dashboards that I'm proud of.
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "1.4rem" }}>
            The thing I want you to remember: you were never waiting to feel completely ready. Every dataset you cleaned, every dashboard you deployed, you did it by figuring things out along the way. <em style={{ color: "var(--color-accent-gold)" }}>Learn while building.</em>
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", color: "var(--color-body-muted)", lineHeight: 1.9, marginBottom: "2rem" }}>
            Don't forget the SQL syntax issues, the midnight dataset preprocessing, and presenting ML predictions to peer cadences. That version of you — who showed up even when the code wasn't compiling —
            <em style={{ color: "var(--color-accent-violet-light)" }}> he's the reason you are where you are now.</em>
          </p>

          <div style={{ borderTop: "1px solid rgba(232,160,69,0.15)", paddingTop: "1.5rem" }}>
            <p style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "1rem", color: "var(--color-body-faint)", marginBottom: "0.3rem" }}>
              With belief in you,
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem",
              background: "var(--grad-name)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Umang, 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default About;
