import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { PROJECTS, type Project } from "./data";
// SVG Icon for the "External Link" button
const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

// SVG Icon for the "GitHub" button
const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

/* ── Project Card Component ──────────────────────────────────── 
   This component takes a `project` object as a prop and displays it in a beautiful 3D card.
*/
const ProjectCard = ({ project }: { project: Project }) => (
  <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} glareEnable glareMaxOpacity={0.07} glareColor={project.color} glarePosition="all" style={{ transformStyle: "preserve-3d", height: "100%" }}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${project.color}18`, height: "100%", display: "flex", flexDirection: "column", position: "relative" }}
    >
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, flexShrink: 0 }} />
      <div style={{ height: 220, overflow: "hidden", flexShrink: 0, background: "#0a0a1a", position: "relative" }}>
        <img src={project.img} alt={`${project.title} screenshot`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", transition: "transform 0.5s ease" }}
          loading="lazy"
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 65%, rgba(10,10,26,0.85) 100%)`, pointerEvents: "none" }} />
        {/* This is called "Conditional Rendering". 
            The `&&` means "If the project is featured, then render the div on the right. Otherwise, render nothing."
        */}
        {project.featured && (
          <div style={{ position: "absolute", top: 12, right: 12, background: `${project.color}22`, border: `1px solid ${project.color}66`,
            borderRadius: 9999, padding: "0.2rem 0.65rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700,
            color: project.color, textTransform: "uppercase", letterSpacing: "0.08em", backdropFilter: "blur(6px)" }}>
            ⭐ Featured
          </div>
        )}
      </div>
      <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.3rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--color-heading)" }}>{project.title}</h3>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-body-faint)" }}>{project.year}</span>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: project.color, fontWeight: 600, marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{project.subtitle}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-body-muted)", lineHeight: 1.75, marginBottom: "1.25rem", flex: 1 }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.4rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ padding: "0.18rem 0.6rem", borderRadius: 9999, fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 500, background: `${project.color}0e`, border: `1px solid ${project.color}22`, color: project.color }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.65rem" }}>
          {project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" id={`project-live-${project.id}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.45rem 1rem", borderRadius: 9999, background: `${project.color}16`, border: `1px solid ${project.color}38`, fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: project.color, textDecoration: "none", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${project.color}28`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${project.color}16`; }}>
              <ExternalIcon /> Live Demo
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" id={`project-github-${project.id}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.45rem 1rem", borderRadius: 9999, background: "var(--color-card)", border: "1px solid var(--color-border)", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-body)", textDecoration: "none", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--color-heading)"; el.style.borderColor = "var(--color-border-strong)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--color-body)"; el.style.borderColor = "var(--color-border)"; }}>
            <GitHubIcon /> Code
          </a>
        </div>
      </div>
    </motion.div>
  </Tilt>
);

/* ── Main Projects Page ──────────────────────────────────────── 
   This displays the grid of projects and handles filtering.
*/
const Projects = () => {
  // `filter` state determines which tab is active ("all" or "featured")
  const [filter, setFilter] = useState<"all" | "featured">("all");
  
  // Filter the list of projects based on the active tab
  const shown = filter === "featured" ? PROJECTS.filter((p) => p.featured) : PROJECTS;

  return (
    <main className="page-content" id="page-projects">
      <section style={{ padding: "5rem 0 6rem" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            What I've built
          </motion.p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", gap: "1.5rem" }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)" }}>
              My <span className="saffron-text-gradient">Projects</span>
            </motion.h1>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["all", "featured"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} id={`projects-filter-${f}`}
                  style={{ padding: "0.48rem 1.2rem", borderRadius: 9999, fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer",
                    border: filter === f ? "1px solid var(--color-accent-gold)" : "1px solid var(--color-border)",
                    background: filter === f ? "rgba(232,160,69,0.12)" : "var(--color-card)",
                    color: filter === f ? "var(--color-accent-gold)" : "var(--color-body-muted)", transition: "all 0.2s ease" }}>
                  {f === "all" ? "All Projects" : "Featured"}
                </button>
              ))}
            </div>
          </div>

          {/* AnimatePresence handles elements being removed from the screen.
              When `filter` changes, the old grid fades out and the new grid fades in. */}
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.75rem" }}>
              {/* `map` creates a ProjectCard for each item in the `shown` array */}
              {shown.map((project) => (<ProjectCard key={project.id} project={project} />))}
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginTop: "5rem" }}>
            <div className="glass-card" style={{ display: "inline-block", padding: "2.5rem 3.5rem", borderRadius: 24, border: "1px solid rgba(107,72,255,0.2)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-body-faint)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>More on GitHub</p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.65rem", color: "var(--color-heading)", marginBottom: "1.5rem" }}>See everything I've built</h2>
              <a href="https://github.com/Umangpandey75" target="_blank" rel="noopener noreferrer" className="btn-primary" id="projects-cta-github">View GitHub Profile &rarr;</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section style={{ position: "relative", borderTop: "1px solid var(--color-border)", padding: "5rem 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(107,72,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Across all 50 projects
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
            By the <span className="violet-text-gradient">Numbers</span>
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { n: "50",    label: "Total Projects",      sub: "Dashboards, Web Apps, ML Models",  icon: "🚀", color: "#6B48FF" },
              { n: "680+",  label: "Git Commits",         sub: "Across all active repos",          icon: "📝", color: "#E8A045" },
              { n: "13",    label: "DBs & APIs Used",     sub: "SQL Server, MySQL, SQLite",        icon: "🔌", color: "#00CEA8" },
              { n: "8",     label: "Relational DB",       sub: "For bug tracking & logs",          icon: "☁️", color: "#22C55E" },
              { n: "~22k+", label: "Lines of Code",       sub: "Hand-crafted data scripts & UI",   icon: "⌨️", color: "#F472B6" },
              { n: "2",     label: "Tata Internships",    sub: "Data Visualisation & Analytics",   icon: "🏆", color: "#E8A045" },
              { n: "100%",  label: "Shipped",             sub: "All verified and functional",      icon: "✅", color: "#22C55E" },
              { n: "4",     label: "Tech Platforms",      sub: "React & Streamlit frameworks",     icon: "⚛️", color: "#61DAFB" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 24, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div style={{ padding: "1.5rem 1.25rem", borderRadius: 18, textAlign: "center", height: "100%",
                  background: "var(--color-card)", border: `1px solid ${stat.color}22`,
                  transition: "border-color 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${stat.color}55`; el.style.boxShadow = `0 12px 40px ${stat.color}14`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${stat.color}22`; el.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>{stat.icon}</div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: stat.color, lineHeight: 1, marginBottom: "0.4rem" }}>{stat.n}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.8rem", color: "var(--color-heading)", marginBottom: "0.3rem" }}>{stat.label}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--color-body-faint)", lineHeight: 1.5 }}>{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD LOG ── */}
      <section style={{ position: "relative", borderTop: "1px solid var(--color-border)", padding: "6rem 0" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400,
          background: "radial-gradient(circle, rgba(232,160,69,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Behind the screens
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            The Build <span className="saffron-text-gradient">Log</span> 📓
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3.5rem", maxWidth: 560, lineHeight: 1.75 }}>
            unfiltered behind-the-scenes logs of my project builds.
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                project: "Employee Performance Dashboard", color: "#E8A045", emoji: "📊", date: "June–August 2025",
                entries: [
                  { day: "Day 1",  log: "Received employee performance data from HR. Realized the dataset had massive inconsistencies and missing fields. Spent 6 hours cleaning data using Power Query." },
                  { day: "Day 4",  log: "Set up the relational schema in SQL Server. Wrote stored procedures to aggregate performance stats by department." },
                  { day: "Day 7",  log: "Designed interactive charts in Power BI. Wrote complex DAX measures for employee KPIs (attendance, performance scores)." },
                  { day: "Day 10", log: "Configured Row-Level Security (RLS) so managers can only see their own department's data. Reduced manual reporting time by 10%." },
                ],
              },
              {
                project: "Heart-IQ — Cardiac Prediction", color: "#6B48FF", emoji: "🧠", date: "Feb–May 2026",
                entries: [
                  { day: "Day 1", log: "Researched ML models for cardiovascular risk prediction. Selected Scikit-learn's Random Forest classifier." },
                  { day: "Day 3", log: "Cleaned and processed patient dataset. Trained the model to output risk probability scores." },
                  { day: "Day 6", log: "Built the interactive web app using Streamlit and Plotly for risk factors. Added secure OTP recovery via SMTP." },
                  { day: "Day 8", log: "Designed role-based access control with SMTP/SSL OTP recovery and a print-ready report system using CSS media print." },
                ],
              },
              {
                project: "Bug Tracking System", color: "#00CEA8", emoji: "🔍", date: "Dec 2024–March 2025",
                entries: [
                  { day: "Day 1", log: "Started designing the database schema for bug tracking. Identified entities: Users, Projects, Bugs, Logs." },
                  { day: "Day 3", log: "Built the frontend form using HTML/CSS. Added validation to make sure users submit accurate logs." },
                  { day: "Day 6", log: "Wrote the backend API integration in Python to store bug logs in SQL database. Automated logging increases accuracy by 35%." },
                ],
              },
            ].map((proj, pi) => (
              <motion.div key={proj.project} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: proj.project === "Bug Tracking System" ? 0.2 : pi * 0.1 }}>
                <div style={{ borderRadius: 20, overflow: "hidden", height: "100%", background: "var(--color-card)", border: `1px solid ${proj.color}22` }}>
                  <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${proj.color}18`,
                    background: `linear-gradient(135deg, ${proj.color}08, transparent)`,
                    display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontSize: "1.3rem" }}>{proj.emoji}</span>
                      <div>
                        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: proj.color }}>{proj.project}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--color-body-faint)" }}>{proj.date}</p>
                      </div>
                    </div>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: proj.color,
                      background: `${proj.color}14`, border: `1px solid ${proj.color}28`, borderRadius: 9999, padding: "0.12rem 0.6rem", fontWeight: 700 }}>
                      BUILD LOG
                    </span>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {proj.entries.map((e, ei) => (
                      <div key={ei} style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, color: proj.color,
                          background: `${proj.color}12`, border: `1px solid ${proj.color}25`,
                          borderRadius: 6, padding: "0.15rem 0.55rem", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>
                          {e.day}
                        </span>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-body-muted)", lineHeight: 1.7 }}>{e.log}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I ACTUALLY LEARNED ── */}
      <section style={{ position: "relative", borderTop: "1px solid var(--color-border)", padding: "6rem 0" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            The real takeaways
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            What I <span className="violet-text-gradient">Actually</span> Learned 🧩
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3.5rem", maxWidth: 560, lineHeight: 1.75 }}>
            Specific insights and key takeaways from each project build.
          </motion.p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            {[
              { project: "Employee Performance Dashboard", color: "#E8A045", emoji: "📊",
                lesson: "Row-Level Security (RLS) is vital when designing corporate dashboards. Restricting data based on departments ensures security and clarity for organizational managers.",
                principle: "Secure data visibility by design." },
              { project: "Heart-IQ — Cardiac Prediction", color: "#6B48FF", emoji: "🧠",
                lesson: "Plotly provides highly interactive UI elements that help clinicians interpret patient health parameters. OTP recovery via SMTP ensures clinical data remains secure.",
                principle: "Interactive visualization boosts usability." },
              { project: "Bug Tracking System", color: "#00CEA8", emoji: "🔍",
                lesson: "Automated logging increases database record accuracy by 35% compared to manual entries. Relational database normalization is critical for relational query performance.",
                principle: "Automate validation to reduce human error." },
            ].map((item, i) => (
              <motion.div key={item.project} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ display: "flex", gap: "0", alignItems: "stretch", background: "var(--color-card)",
                  borderBottom: "1px solid var(--color-border)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${item.color}05`}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--color-card)"}>
                <div style={{ width: 4, flexShrink: 0, background: item.color, opacity: 0.7 }} />
                <div style={{ padding: "1.5rem 1.75rem", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.92rem", color: item.color }}>{item.project}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.87rem", color: "var(--color-body-muted)", lineHeight: 1.8, marginBottom: "0.85rem" }}>{item.lesson}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Principle:</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: item.color, fontStyle: "italic" }}>"{item.principle}"</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S COMING NEXT ── */}
      <section style={{ position: "relative", borderTop: "1px solid var(--color-border)", padding: "6rem 0 8rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(107,72,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            In the pipeline
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "0.75rem" }}>
            What's <span className="saffron-text-gradient">Coming Next</span> 🔭
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-body-muted)", marginBottom: "3.5rem", maxWidth: 560, lineHeight: 1.75 }}>
            Future projects that I am planning or researching.
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { name: "Predictive Customer Churn Model", tagline: "Using Scikit-learn and Python to predict customer churn risk based on transaction history.", status: "Planning", pct: 20, color: "#6B48FF", emoji: "📉", eta: "Q3 2026", stack: ["Python", "Scikit-Learn", "Pandas"] },
              { name: "SQL Query Builder Tool", tagline: "An interactive UI that helps non-technical users build SQL queries visually and export results.", status: "Designing", pct: 15, color: "#E8A045", emoji: "🛢️", eta: "Q3 2026", stack: ["React", "TypeScript", "SQL"] },
              { name: "Financial Dashboard", tagline: "A Power BI dashboard tracking monthly expenses and portfolio growth with automatic Excel updates.", status: "Researching", pct: 10, color: "#00CEA8", emoji: "💰", eta: "Q4 2026", stack: ["Power BI", "Excel", "DAX"] },
            ].map((proj, i) => (
              <motion.div key={proj.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div style={{ borderRadius: 20, overflow: "hidden", height: "100%",
                  background: "var(--color-card)", border: `1px solid ${proj.color}25`, position: "relative",
                  transition: "border-color 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${proj.color}55`; el.style.boxShadow = `0 16px 50px ${proj.color}14`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${proj.color}25`; el.style.boxShadow = "none"; }}>
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                    background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${proj.color}04 3px, ${proj.color}04 4px)` }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ padding: "1.5rem 1.5rem 1rem", borderBottom: `1px solid ${proj.color}18`,
                      background: `linear-gradient(135deg, ${proj.color}08, transparent)` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "2rem" }}>{proj.emoji}</span>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, color: proj.color,
                            background: `${proj.color}14`, border: `1px solid ${proj.color}28`, borderRadius: 9999, padding: "0.12rem 0.65rem" }}>
                            {proj.status}
                          </span>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "var(--color-body-faint)" }}>ETA: {proj.eta}</span>
                        </div>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.2rem", color: "var(--color-heading)", marginBottom: "0.5rem" }}>{proj.name}</h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", lineHeight: 1.65 }}>{proj.tagline}</p>
                    </div>
                    <div style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Progress</span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: proj.color, fontWeight: 700 }}>{proj.pct}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 999, background: "var(--color-border)", overflow: "hidden", marginBottom: "1rem" }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${proj.pct}%` }} viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                          style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${proj.color}80, ${proj.color})` }} />
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {proj.stack.map(s => (
                          <span key={s} style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600,
                            padding: "0.1rem 0.5rem", borderRadius: 9999,
                            background: `${proj.color}10`, border: `1px solid ${proj.color}22`, color: proj.color }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            style={{ marginTop: "4rem", textAlign: "center" }}>
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "var(--color-heading)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              "Every project is an opportunity to solve a real problem.<br/>The value lies in making the final product simple and functional."
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-gold)", marginTop: "0.75rem" }}>— Umang Pandey</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
