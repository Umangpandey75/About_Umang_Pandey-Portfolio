import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useTheme } from "../../context/ThemeContext";

/* ── Theme-safe color resolver ────────────────────────── */
const LIGHT_COLOR_MAP: Record<string, string> = {
  "#ffffff": "#334155",
  "#F7DF1E": "#92600A",
  "#FCC624": "#7A5200",
};

function useDisplayColor(rawColor: string): string {
  const { theme } = useTheme();
  if (theme === "dark") return rawColor;
  return LIGHT_COLOR_MAP[rawColor] ?? rawColor;
}

import { type Skill, SKILLS, CATEGORIES, CAT_COLOR, CODE_LINES } from "./data";

// The VibeTerminal component creates a fake IDE window that types out code line-by-line!
const VibeTerminal = () => {
  // `visibleLines` tracks how many complete lines of code are currently shown
  const [visibleLines, setVisibleLines] = useState(0);
  // `charCount` tracks how many characters of the *current* line have been typed out
  const [charCount, setCharCount] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  // This useEffect acts as our typing engine. It runs repeatedly to update the state.
  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const currentLine = CODE_LINES[visibleLines];
    if (charCount < currentLine.text.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setCharCount(0);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [visibleLines, charCount]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [visibleLines, charCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(107,72,255,0.3)",
        boxShadow: "0 0 40px rgba(107,72,255,0.12), 0 0 80px rgba(232,160,69,0.06)",
        background: "#0d0d14",
        flex: "1 1 480px",
        maxWidth: 580,
      }}
    >
      {/* Window chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.85rem 1.25rem",
        background: "#161623",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56", display: "block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E", display: "block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F", display: "block" }} />
        <span style={{ flex: 1, textAlign: "center", fontFamily: "monospace", fontSize: "0.72rem", color: "#555", letterSpacing: "0.08em" }}>
          umang.dev — vscode
        </span>
      </div>

      {/* Code area */}
      <div
        ref={termRef}
        style={{
          padding: "1.5rem 1.75rem",
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
          fontSize: "0.82rem",
          lineHeight: 1.9,
          minHeight: 320,
          maxHeight: 380,
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ color: "#444", minWidth: 20, userSelect: "none", textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ color: line.color || "#e2e8f0" }}>{line.text}</span>
          </div>
        ))}
        {visibleLines < CODE_LINES.length && (
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ color: "#444", minWidth: 20, userSelect: "none", textAlign: "right", flexShrink: 0 }}>{visibleLines + 1}</span>
            <span style={{ color: CODE_LINES[visibleLines].color || "#e2e8f0" }}>
              {CODE_LINES[visibleLines].text.slice(0, charCount)}
              <span style={{
                display: "inline-block", width: 2, height: "1em",
                background: "#6B48FF", marginLeft: 1, verticalAlign: "text-bottom",
                animation: "cursorBlink 1s step-end infinite",
              }} />
            </span>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "1.5rem",
        padding: "0.45rem 1.25rem",
        background: "#6B48FF",
        fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)",
      }}>
        <span>⎇ main</span>
        <span>TypeScript</span>
        <span style={{ marginLeft: "auto" }}>Ln {Math.min(visibleLines + 1, CODE_LINES.length)}, Col {charCount + 1}</span>
        <span>UTF-8</span>
      </div>

      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </motion.div>
  );
};

/* ── Skill card (grid) ────────────────────────────── 
   This component renders a single skill (like Python or React) as a 3D glass card.
   It uses the `react-parallax-tilt` library to make the card rotate when you hover!
*/
const SkillCard = ({ skill, i }: { skill: Skill; i: number }) => {
  // If the user is in light mode, we adjust colors so white icons are visible on light backgrounds
  const displayColor = useDisplayColor(skill.color);
  const isWhiteIcon = skill.color === "#ffffff";

  return (
    // `layout` tells Framer Motion to smoothly animate this card to its new position if the grid changes
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: i * 0.04, duration: 0.4 }}
      layout
    >
      <Tilt
        tiltMaxAngleX={14}
        tiltMaxAngleY={14}
        glareEnable
        glareMaxOpacity={0.15}
        glareColor={displayColor}
        glarePosition="all"
        style={{ transformStyle: "preserve-3d", height: "100%" }}
      >
        <div
          style={{
            padding: "1.75rem 1.25rem 1.5rem",
            borderRadius: 20,
            background: "var(--color-card)",
            border: `1px solid ${displayColor}28`,
            textAlign: "center",
            cursor: "default",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            height: "100%",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${displayColor}60`;
            el.style.boxShadow = `0 0 28px ${displayColor}28`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = `${displayColor}28`;
            el.style.boxShadow = "none";
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${displayColor}99, transparent)`,
          }} />
          <div style={{
            position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
            width: 90, height: 90, borderRadius: "50%",
            background: `radial-gradient(circle, ${displayColor}18 0%, transparent 70%)`,
            filter: "blur(14px)", pointerEvents: "none",
          }} />

          <div style={{
            width: 58, height: 58, margin: "0 auto 1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 16,
            background: isWhiteIcon
              ? "var(--white-icon-bg, rgba(0,0,0,0.08))"
              : `${displayColor}14`,
            border: `1px solid ${displayColor}30`,
            padding: "0.65rem",
            position: "relative", zIndex: 1,
          }}>
            <img
              src={skill.icon}
              alt={skill.name}
              style={{
                width: 34, height: 34, objectFit: "contain",
                filter: isWhiteIcon ? "var(--white-icon-filter, brightness(0.75))" : "none",
              }}
              loading="lazy"
            />
          </div>

          <p style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "0.88rem", color: "var(--color-heading)", marginBottom: "0.5rem",
            position: "relative", zIndex: 1,
          }}>
            {skill.name}
          </p>

          <span style={{
            fontFamily: "var(--font-body)", fontSize: "0.64rem", fontWeight: 600,
            color: displayColor,
            textTransform: "uppercase", letterSpacing: "0.08em",
            background: `${displayColor}14`,
            border: `1px solid ${displayColor}30`,
            borderRadius: 9999, padding: "0.15rem 0.55rem",
            display: "inline-block", position: "relative", zIndex: 1,
          }}>
            {skill.cat}
          </span>
        </div>
      </Tilt>
    </motion.div>
  );
};

// The main Skills page component
const Skills = () => {
  // State to track which filter category is currently selected (e.g., "All", "Frontend", "Backend")
  const [active, setActive] = useState("All");
  
  // We filter the SKILLS array based on the `active` category.
  // If "All" is selected, we show everything. Otherwise, only show skills matching the category.
  const shown = active === "All" ? SKILLS : SKILLS.filter((s) => s.cat === active);

  return (
    <main className="page-content" id="page-skills">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "15%", right: 0,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-orb-violet) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: 0,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,160,69,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <section style={{ padding: "5rem 0 6rem", position: "relative", zIndex: 1 }}>
        <div className="section-wrapper">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}
          >
            What I work with
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}
          >
            My <span className="violet-text-gradient">Tech Stack</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-muted)", maxWidth: 520, lineHeight: 1.75, marginBottom: "4rem" }}
          >
            Technologies I use to extract, query, analyze, and visualize data. Hover cards for 3D effect.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ marginBottom: "5rem" }}
          >
            <VibeTerminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                id={`skills-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: 9999,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem", fontWeight: 500,
                  cursor: "pointer",
                  border: active === cat ? `1px solid ${CAT_COLOR[cat]}55` : "1px solid var(--color-border)",
                  background: active === cat ? `${CAT_COLOR[cat]}14` : "var(--color-card)",
                  color: active === cat ? CAT_COLOR[cat] : "var(--color-body-muted)",
                  transition: "all 0.22s ease",
                  boxShadow: active === cat ? `0 0 14px ${CAT_COLOR[cat]}22` : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {shown.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: "5rem" }}
          >
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "1.5rem",
              padding: "2.5rem", borderRadius: 24,
              background: "var(--color-card)", border: "1px solid var(--color-border)",
            }}>
              {[
                { title: "Data Visualization", body: "Designing interactive, insightful Power BI dashboards and reports that translate raw numbers into business decisions." },
                { title: "SQL & Databases",    body: "Writing optimized queries, views, stored procedures and triggers to manage and extract relational data." },
                { title: "Python Analysis",    body: "Using libraries like Pandas, NumPy, Matplotlib, and Scikit-learn to clean datasets, run EDA, and build ML models." },
              ].map((item) => (
                <div key={item.title} style={{ flex: "1 1 220px" }}>
                  <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, marginBottom: "0.9rem" }} />
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-heading)", marginBottom: "0.5rem" }}>{item.title}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", lineHeight: 1.75 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RPG SKILL UNLOCK BOARD ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(107,72,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Progress Report
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            Skill <span className="saffron-text-gradient">Unlocked</span> 🎮
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3rem", maxWidth: 520, lineHeight: 1.75 }}>
            Honest self-assessed levels based on hands-on project implementations.
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {[
              { name: "Python",      xp: 820, maxXp: 1000, level: 8,  badge: "🐍", color: "#3776AB", tag: "Builder"  },
              { name: "SQL & DBs",   xp: 840, maxXp: 1000, level: 8,  badge: "🛢️", color: "#336791", tag: "Builder"  },
              { name: "Power BI",    xp: 810, maxXp: 1000, level: 8,  badge: "📊", color: "#E8A045", tag: "Analyst"  },
              { name: "Excel & DAX", xp: 830, maxXp: 1000, level: 8,  badge: "📈", color: "#339933", tag: "Analyst"  },
              { name: "Pandas/NumPy",xp: 800, maxXp: 1000, level: 8,  badge: "🐼", color: "#150458", tag: "Analyst"  },
              { name: "Git & GitHub",xp: 760, maxXp: 1000, level: 7,  badge: "🔱", color: "#F05032", tag: "Builder"  },
              { name: "HTML5/CSS3",  xp: 740, maxXp: 1000, level: 7,  badge: "🌐", color: "#E34F26", tag: "Builder"  },
              { name: "JavaScript",  xp: 650, maxXp: 1000, level: 6,  badge: "⚡", color: "#F7DF1E", tag: "Learner"  },
              { name: "React",       xp: 580, maxXp: 1000, level: 5,  badge: "⚛️", color: "#61DAFB", tag: "Learner"  },
              { name: "Scikit-learn",xp: 610, maxXp: 1000, level: 6,  badge: "🤖", color: "#FF9900", tag: "Learner"  },
            ].map((skill, i) => (
              <motion.div key={skill.name}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div style={{
                  padding: "1.1rem 1.4rem", borderRadius: 14,
                  background: "var(--color-card)", border: `1px solid ${skill.color}22`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${skill.color}50`; el.style.boxShadow = `0 8px 30px ${skill.color}14`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${skill.color}22`; el.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{skill.badge}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "var(--color-heading)" }}>{skill.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: skill.color,
                        background: `${skill.color}15`, border: `1px solid ${skill.color}30`, borderRadius: 9999, padding: "0.12rem 0.5rem", textTransform: "uppercase" }}>
                        {skill.tag}
                      </span>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.85rem", color: skill.color }}>
                        Lv.{skill.level}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "var(--color-border)", overflow: "hidden", marginBottom: "0.35rem" }}>
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 + 0.3, duration: 0.9, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "var(--color-body-faint)" }}>XP: {skill.xp} / {skill.maxXp}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: skill.color, fontWeight: 700 }}>{Math.round((skill.xp / skill.maxXp) * 100)}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── "HOW I ACTUALLY USE THIS" ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Proof, not claims
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            How I <span className="violet-text-gradient">Actually</span> Use These
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3rem", maxWidth: 560, lineHeight: 1.75 }}>
            Specific examples of what I actually built with these tools.
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            {[
              {
                tech: "Power BI & DAX",
                color: "#E8A045",
                real: "Built the Employee Performance Dashboard. Designed DAX measures for attendance rates, performance scoring, and enabled RLS for secure departmental views.",
                proof: "Employee Performance Dashboard Project",
                emoji: "📊",
              },
              {
                tech: "Python & Streamlit",
                color: "#3776AB",
                real: "Developed Heart-IQ, a cardiac risk prediction app using a pre-trained Scikit-learn model, rendering live patient health probability scores with Plotly.",
                proof: "Heart-IQ Predictive System",
                emoji: "🐍",
              },
              {
                tech: "SQL Server & MySQL",
                color: "#336791",
                real: "Wrote complex queries and relational database schemas to log bugs for the Bug Tracking & Reporting system and support analytics databases.",
                proof: "Bug Tracking System Backend",
                emoji: "🛢️",
              },
              {
                tech: "HTML5, CSS3, & React",
                color: "#61DAFB",
                real: "Designed responsive dashboard UIs and styled interactive web pages, including this customized 3D glassmorphism portfolio.",
                proof: "Responsive Frontends",
                emoji: "⚛️",
              },
            ].map((item, i) => (
              <motion.div key={item.tech}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{
                  display: "flex", gap: "1.5rem", alignItems: "flex-start",
                  padding: "1.6rem 2rem",
                  background: "var(--color-card)",
                  borderBottom: "1px solid var(--color-border)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${item.color}06`}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--color-card)"}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: item.color }}>{item.tech}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", fontStyle: "italic" }}>→ {item.proof}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-body-muted)", lineHeight: 1.75 }}>{item.real}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK COMBOS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(232,160,69,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            My Recipes
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            Stack <span className="saffron-text-gradient">Combos</span> 🧩
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3rem", maxWidth: 520, lineHeight: 1.75 }}>
            The exact tool combinations I use when approaching data-driven tasks.
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                type: "Data Visualization Pipeline",
                emoji: "📊",
                color: "#E8A045",
                time: "~3–5 days",
                ingredients: ["Power BI", "SQL Server", "Excel", "DAX"],
                steps: "Query and join data in SQL Server → extract to Power BI → write DAX measures for KPIs → design dashboard metrics → deploy with Row-Level Security.",
              },
              {
                type: "Predictive Analytics App",
                emoji: "🧠",
                color: "#3776AB",
                time: "~5–7 days",
                ingredients: ["Python", "Scikit-learn", "Streamlit", "Plotly", "Git"],
                steps: "Clean dataset with Pandas → train classifier with Scikit-learn → construct UI in Streamlit → generate Plotly visuals → publish to Git.",
              },
              {
                type: "Relational Database Backend",
                emoji: "🛢️",
                color: "#336791",
                time: "~3–4 days",
                ingredients: ["SQL Server", "MySQL", "VS Code", "Git"],
                steps: "Design relational schema → write queries with indexing → create stored procedures for automated logging → push code to GitHub.",
              },
            ].map((recipe, i) => (
              <motion.div key={recipe.type}
                initial={{ opacity: 0, y: 30, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div style={{
                  borderRadius: 20, height: "100%", overflow: "hidden",
                  background: "var(--color-card)", border: `1px solid ${recipe.color}25`,
                  boxShadow: `0 4px 24px ${recipe.color}08`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${recipe.color}50`; el.style.boxShadow = `0 16px 50px ${recipe.color}18`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${recipe.color}25`; el.style.boxShadow = `0 4px 24px ${recipe.color}08`; }}>
                  <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: `1px solid ${recipe.color}18`,
                    background: `linear-gradient(135deg, ${recipe.color}08, transparent)` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "2rem" }}>{recipe.emoji}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, color: recipe.color,
                        background: `${recipe.color}14`, border: `1px solid ${recipe.color}28`, borderRadius: 9999, padding: "0.15rem 0.6rem" }}>
                        ⏱ {recipe.time}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--color-heading)" }}>{recipe.type}</h3>
                  </div>
                  <div style={{ padding: "1rem 1.5rem 0.8rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: "var(--color-body-faint)",
                      textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>Ingredients</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                      {recipe.ingredients.map(ing => (
                        <span key={ing} style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600,
                          padding: "0.15rem 0.6rem", borderRadius: 9999,
                          background: `${recipe.color}12`, border: `1px solid ${recipe.color}28`, color: recipe.color }}>
                          {ing}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: "var(--color-body-faint)",
                      textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Method</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-body-muted)", lineHeight: 1.7 }}>{recipe.steps}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING ORIGIN TIMELINE ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0 8rem", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            The Journey
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            How I <span className="violet-text-gradient">Learned</span> Each Stack
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3.5rem", maxWidth: 520, lineHeight: 1.75 }}>
            Acquired through online documentation, community tutorials, and hands-on project creation.
          </motion.p>

          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
            <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2,
              background: "linear-gradient(180deg, var(--color-accent-violet), var(--color-accent-gold), transparent)", opacity: 0.25 }} />

            {[
              { year: "2021", skill: "Python Basics", how: "Wrote my first lines of Python in IDLE. Fascinated by syntax clarity. Completed Google's Crash Course on Python.", color: "#3776AB", emoji: "🐍" },
              { year: "2022", skill: "SQL Databases", how: "Learned schema design, querying, joins and grouping. Configured stored procedures and triggers to manage bug tracking databases.", color: "#336791", emoji: "🛢️" },
              { year: "2023", skill: "HTML/CSS & Web Tech", how: "Explored building responsive frontends. Certified in Web Development through Infosys Springboard.", color: "#61DAFB", emoji: "⚛️" },
              { year: "2024", skill: "Data Libraries (Pandas/NumPy)", how: "Dived into exploratory data analysis. Cleaned and prepared databases for visualization.", color: "#150458", emoji: "🐼" },
              { year: "2025", skill: "Power BI & TATA Internships", how: "Delivered data visualization dashboards for Tata virtual internships. Practiced complex DAX calculations.", color: "#E8A045", emoji: "📊" },
              { year: "2026", skill: "Predictive Modeling (Scikit-learn)", how: "Trained classifiers for cardiac risk probability and integrated results into web apps.", color: "#FF9900", emoji: "🤖" },
            ].map((item, i) => (
              <motion.div key={`${item.year}-${item.skill}`}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1.2rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 58, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color,
                    boxShadow: `0 0 12px ${item.color}88`, marginTop: 18, zIndex: 1 }} />
                </div>
                <div style={{
                  flex: 1, padding: "1.2rem 1.5rem", borderRadius: 14,
                  background: "var(--color-card)", border: `1px solid ${item.color}22`,
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}45`; el.style.boxShadow = `0 6px 24px ${item.color}12`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}22`; el.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: item.color }}>{item.skill}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", marginLeft: "auto" }}>{item.year}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-body-muted)", lineHeight: 1.7, fontStyle: "italic" }}>"{item.how}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            style={{ textAlign: "center", marginTop: "3rem" }}>
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "var(--color-heading)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              "Analyzing data is not just about writing queries.<br/>It is about uncovering the story hidden within the numbers."
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-gold)", marginTop: "0.75rem" }}>— Umang Pandey</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Skills;
