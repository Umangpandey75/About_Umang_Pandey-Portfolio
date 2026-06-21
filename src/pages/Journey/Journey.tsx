import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { type Achievement, ACHIEVEMENTS, TYPE_LABEL, FILTERS } from "./data";
/* ── Resume Section ────────────────────────────────────────────── 
   This component displays two different resumes ("Data Analyst" or "Python Developer").
   We store the data in a simple JavaScript object so it's easy to swap between them!
*/
const ResumeSection = () => {
  // State to track which resume profile the user has selected
  const [profile, setProfile] = useState<"analyst" | "python">("analyst");

  const data = {
    analyst: {
      title: "Umang Pandey",
      subtitle: "Data Analyst & B.Tech CSE Student",
      pdfUrl: "/resume.pdf",
      pdfName: "Umang_Pandey_Resume.pdf",
      driveUrl: "https://drive.google.com/file/d/1GlkSOIIwOqW9fVtnLfMzSAYJNrSKx2bW/view?usp=drivesdk",
      skills: [
        "Python", "SQL", "Power BI", "Pandas", "NumPy", "Data Wrangling",
        "Machine Learning", "Generative AI", "DAX", "Data Analysis",
        "NLP", "Sentiment Analysis", "Database Structures", "React",
        "TypeScript", "Vite", "ThreeJS", "HTML5 & CSS3"
      ],
      experience: [
        {
          role: "Data Science Intern",
          org: "British Airways · Forage",
          date: "Feb 2026",
          color: "#00CEA8",
          desc: "Scraped and analyzed passenger review datasets with Python scripts. Developed Natural Language Processing (NLP) sentiment models and built predictive machine learning pipelines to forecast booking behaviors and optimize marketing channels."
        },
        {
          role: "Data Analytics Intern",
          org: "Deloitte Australia · Forage",
          date: "Aug 2025",
          color: "#38BDF8",
          desc: "Conducted exhaustive data quality checks and validation steps. Built dynamic business intelligence dashboards to monitor organizational KPIs and produced client-ready statistical presentations."
        },
        {
          role: "Data Analytics & Visualisation Trainee",
          org: "TATA Group · Forage",
          date: "July 2025",
          color: "#6B48FF",
          desc: "Formulated dashboard drafts in Power BI, modeled critical DAX calculated variables, and cleaned highly dimensional enterprise datasets to support executive strategic reviews."
        }
      ]
    },
    python: {
      title: "Umang Pandey",
      subtitle: "Python Developer & B.Tech CSE Student",
      pdfUrl: "/Umang_pandey_python_L_.pdf",
      pdfName: "Umang_Pandey_Python_Developer_Resume.pdf",
      driveUrl: "https://drive.google.com/file/d/1JfLCwCC_kALNLKbjPftt77d6kuN8s45s/view?usp=drivesdk",
      skills: [
        "Python", "SQL", "Pandas", "NumPy", "Generative AI", "Object-Oriented Programming (OOP)",
        "Data Structures", "Algorithms", "Software Engineering", "REST APIs", "Machine Learning",
        "Git & GitHub", "React", "TypeScript", "Vite", "HTML5 & CSS3"
      ],
      experience: [
        {
          role: "Python Data & AI Intern",
          org: "British Airways · Forage",
          date: "Feb 2026",
          color: "#00CEA8",
          desc: "Built custom Python web scraping programs utilizing BeautifulSoup to parse and extract passenger reviews. Engineered NLP pipelines for sentiment profiling and trained predictive ML classifiers for booking forecast optimization."
        },
        {
          role: "Python Backend & Analytics Intern",
          org: "Deloitte Australia · Forage",
          date: "Aug 2025",
          color: "#38BDF8",
          desc: "Developed Python automation scripts for data cleansing and consistency validation. Structured complex SQL relational database schemas and integrated data procedures."
        },
        {
          role: "Software Development Trainee",
          org: "TATA Group · Forage",
          date: "July 2025",
          color: "#6B48FF",
          desc: "Wrote clean, modular logic classes in Python for virtual internship business scenarios, resolving functional automation challenges and optimizing code modularity."
        }
      ]
    }
  };

  const current = data[profile];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        width: "100%",
        background: "rgba(30, 30, 40, 0.5)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 24,
        padding: "2.5rem",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow effects */}
      <div style={{ position: "absolute", top: -150, right: -150, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(232, 160, 69, 0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -150, left: -150, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(107, 72, 255, 0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Profile Selector Toggle */}
      <div style={{
        display: "inline-flex",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 14,
        padding: "0.35rem",
        marginBottom: "2rem",
        gap: "0.25rem"
      }}>
        <button
          onClick={() => setProfile("analyst")}
          style={{
            padding: "0.6rem 1.4rem",
            borderRadius: 10,
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            border: "none",
            background: profile === "analyst" ? "linear-gradient(135deg, rgba(232,160,69,0.2) 0%, rgba(232,160,69,0.05) 100%)" : "transparent",
            borderLeft: profile === "analyst" ? "2px solid var(--color-accent-gold)" : "2px solid transparent",
            color: profile === "analyst" ? "var(--color-accent-gold)" : "var(--color-body-muted)",
            boxShadow: profile === "analyst" ? "0 4px 12px rgba(232,160,69,0.1)" : "none",
            transition: "all 0.25s ease",
          }}
        >
          📊 Data Analyst Resume
        </button>
        <button
          onClick={() => setProfile("python")}
          style={{
            padding: "0.6rem 1.4rem",
            borderRadius: 10,
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            border: "none",
            background: profile === "python" ? "linear-gradient(135deg, rgba(232,160,69,0.2) 0%, rgba(232,160,69,0.05) 100%)" : "transparent",
            borderLeft: profile === "python" ? "2px solid var(--color-accent-gold)" : "2px solid transparent",
            color: profile === "python" ? "var(--color-accent-gold)" : "var(--color-body-muted)",
            boxShadow: profile === "python" ? "0 4px 12px rgba(232,160,69,0.1)" : "none",
            transition: "all 0.25s ease",
          }}
        >
          🐍 Python Developer Resume
        </button>
      </div>

      {/* Top Header */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1.5rem",
        marginBottom: "2.5rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        paddingBottom: "1.5rem"
      }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "var(--color-heading)", marginBottom: "0.2rem", letterSpacing: "-0.02em" }}>
            {current.title}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-accent-gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {current.subtitle}
          </p>
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          {current.driveUrl && (
            <a
              href={current.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.8rem 1.6rem",
                borderRadius: 12,
                background: "linear-gradient(135deg, var(--color-accent-gold) 0%, #D4AF37 100%)",
                color: "#0f0f15",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(232, 160, 69, 0.3)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 8px 25px rgba(232, 160, 69, 0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 20px rgba(232, 160, 69, 0.3)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Resume
            </a>
          )}
        </div>
      </div>

      {/* Main Body Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
        
        {/* Left Column (Details, Skills & Tools) */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Quick Info */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800,
              color: "var(--color-heading)", marginBottom: "1.2rem",
              display: "flex", alignItems: "center", gap: "0.6rem"
            }}>
              <span style={{ color: "var(--color-accent-gold)" }}>👤</span> Contact Info
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: "✉️", text: "umangpandey.co@gmail.com", url: "mailto:umangpandey.co@gmail.com" },
                { icon: "📞", text: "+91 7518593228", url: "tel:+917518593228" },
                { icon: "📍", text: "Ghaziabad, UP, India" },
                { icon: "🔗", text: "linkedin.com/in/umang-pandey-01b486273", url: "https://linkedin.com/in/umang-pandey-01b486273" },
                { icon: "💻", text: "github.com/Umangpandey75", url: "https://github.com/Umangpandey75" },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
                  <span style={{ fontSize: "1.1rem", opacity: 0.9 }}>{item.icon}</span>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-body-muted)", textDecoration: "none", transition: "color 0.2s" }}
                       onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-heading)"}
                       onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-body-muted)"}>
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ color: "var(--color-body-muted)" }}>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Skills */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800,
              color: "var(--color-heading)", marginBottom: "1.2rem",
              display: "flex", alignItems: "center", gap: "0.6rem"
            }}>
              <span style={{ color: "var(--color-accent-gold)" }}>⚡</span> Core Competencies
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {current.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "var(--color-accent-gold)",
                    background: "rgba(232,160,69,0.08)",
                    border: "1px solid rgba(232,160,69,0.18)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Experience & Education) */}
        <div style={{
          flex: "2 1 420px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          paddingLeft: "2rem"
        }}>
          
          {/* Work / Virtual Internships */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800,
              color: "var(--color-heading)", marginBottom: "1.5rem",
              display: "flex", alignItems: "center", gap: "0.6rem"
            }}>
              <span style={{ color: "var(--color-accent-gold)" }}>💼</span> Experience &amp; Virtual Internships
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              {current.experience.map((job, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--color-heading)" }}>
                      {job.role}
                    </h4>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-body-faint)" }}>
                      {job.date}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: job.color, fontWeight: 600, marginBottom: "0.5rem" }}>
                    {job.org}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-body-muted)", lineHeight: 1.6 }}>
                    {job.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800,
              color: "var(--color-heading)", marginBottom: "1.5rem",
              display: "flex", alignItems: "center", gap: "0.6rem"
            }}>
              <span style={{ color: "var(--color-accent-gold)" }}>🎓</span> Education
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--color-heading)" }}>
                    B.Tech in Computer Science and Engineering
                  </h4>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-body-faint)" }}>
                    2022 - Present
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-accent-gold)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  NITRA Technical Campus, Ghaziabad
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-body-muted)", lineHeight: 1.6 }}>
                  Gaining deep foundations in relational database design, Python software architectures, object-oriented concepts, statistical analyses, and data structures.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

const CertCard = ({ item, i }: { item: Achievement; i: number }) => {
  const [expanded, setExpanded] = useState(false);
  const color = item.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareMaxOpacity={0.1}
        glareColor={color}
        glarePosition="all"
        style={{ transformStyle: "preserve-3d", height: "100%" }}
      >
        <div
          style={{
            borderRadius: 20,
            background: "var(--color-card)",
            border: `1px solid ${color}28`,
            overflow: "hidden",
            boxShadow: `0 8px 40px ${color}12, 0 2px 8px rgba(0,0,0,0.25)`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${color}55`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 60px ${color}22, 0 4px 16px rgba(0,0,0,0.3)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${color}28`;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${color}12, 0 2px 8px rgba(0,0,0,0.25)`;
          }}
        >
          <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}44)`, flexShrink: 0 }} />

          <div style={{ padding: "1.4rem 1.5rem 1.2rem", display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>{item.badge}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "flex-end" }}>
                {item.position && (
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700,
                    color, background: `${color}14`, border: `1px solid ${color}35`,
                    borderRadius: 9999, padding: "0.15rem 0.6rem",
                    textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap",
                  }}>
                    {item.position}
                  </span>
                )}
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.65rem",
                  color: "var(--color-body-faint)", whiteSpace: "nowrap", paddingTop: "0.1rem",
                }}>
                  {item.date}
                </span>
              </div>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: `${color}10`, border: `1px solid ${color}25`,
              borderRadius: 9999, padding: "0.12rem 0.65rem", marginBottom: "0.8rem",
              alignSelf: "flex-start",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}` }} />
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700,
                color, textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                {TYPE_LABEL[item.type]}
              </span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "1rem", color: "var(--color-heading)",
              marginBottom: "0.3rem", lineHeight: 1.3,
            }}>
              {item.title}
            </h3>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.72rem",
              color, fontWeight: 600, marginBottom: "0.9rem", opacity: 0.9,
            }}>
              {item.org}
            </p>

            <div style={{ width: "100%", height: 1, background: `${color}18`, marginBottom: "0.9rem", flexShrink: 0 }} />

            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.82rem",
                color: "var(--color-body-muted)", lineHeight: 1.8,
                ...(expanded ? {} : {
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }),
              }}>
                {item.story}
              </p>

              <button
                onClick={() => setExpanded((e) => !e)}
                style={{
                  marginTop: "0.55rem",
                  fontFamily: "var(--font-body)", fontSize: "0.73rem", fontWeight: 600,
                  color, background: "none", border: "none", cursor: "pointer",
                  padding: 0, display: "flex", alignItems: "center", gap: "0.3rem",
                  opacity: 0.9, transition: "opacity 0.2s",
                }}
              >
                {expanded ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
                    Show less
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                    Read more
                  </>
                )}
              </button>
            </div>

            {item.verifyLink || item.certificatePdf ? (
              <div style={{
                marginTop: "1rem",
                display: "flex",
                gap: "0.75rem",
                alignItems: "center"
              }}>
                {item.verifyLink && (
                  <a
                    href={item.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.45rem 0.85rem",
                      borderRadius: 10,
                      background: `${color}14`,
                      border: `1px solid ${color}35`,
                      fontFamily: "var(--font-body)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: color,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${color}25`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${color}14`; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Verify Credential
                  </a>
                )}
                {item.certificatePdf && (
                  <a
                    href={item.certificatePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.45rem 0.85rem",
                      borderRadius: 10,
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--color-body)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "var(--color-heading)";
                      el.style.borderColor = "var(--color-border-strong)";
                      el.style.background = "var(--color-border-faint)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = "var(--color-body)";
                      el.style.borderColor = "var(--color-border)";
                      el.style.background = "var(--color-card)";
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    View Certificate
                  </a>
                )}
              </div>
            ) : item.type === "education" ? null : (
              <div style={{
                marginTop: "1rem",
                padding: "0.6rem 0.85rem",
                borderRadius: 10,
                background: `${color}08`,
                border: `1px dashed ${color}22`,
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)" }}>
                  Verified via resume.pdf
                </span>
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

// The main Journey page component
const Journey = () => {
  // Tracks which filter tab is active
  const [filter, setFilter] = useState("All");

  // Filters the achievements list based on the active tab, and sorts them by their `sortKey`
  const filtered = (filter === "All"
    ? [...ACHIEVEMENTS]
    : ACHIEVEMENTS.filter((a) => TYPE_LABEL[a.type] === filter)
  ).sort((a, b) => b.sortKey - a.sortKey);

  const totalCerts  = ACHIEVEMENTS.filter((a) => a.type === "cert").length;
  const totalEd = ACHIEVEMENTS.filter((a) => a.type === "education").length;

  return (
    <main className="page-content" id="page-journey">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "5%", right: 0, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, var(--color-orb-violet) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,69,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <section style={{ padding: "5rem 0 7rem", position: "relative", zIndex: 1 }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Every step has a story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "1rem" }}>
            Journey &amp; <span className="saffron-text-gradient">Achievements</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-muted)", maxWidth: 560, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Key milestones that have shaped my technical capability and analytical mindset.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            {[
              { n: `${ACHIEVEMENTS.length}`, label: "Total Milestones" },
              { n: `${totalEd}`,             label: "Education Tracks" },
              { n: `${totalCerts}`,          label: "Certifications" },
            ].map((s) => (
              <div key={s.label} className="glass-card"
                style={{ padding: "0.85rem 1.4rem", borderRadius: 14, textAlign: "center", minWidth: 110 }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "var(--color-accent-gold)", marginBottom: "0.1rem" }}>{s.n}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                id={`journey-filter-${f.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  padding: "0.38rem 1rem", borderRadius: 9999,
                  fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500,
                  cursor: "pointer", transition: "all 0.22s ease",
                  border: filter === f ? "1px solid var(--color-accent-gold)55" : "1px solid var(--color-border)",
                  background: filter === f ? "rgba(232,160,69,0.12)" : "var(--color-card)",
                  color: filter === f ? "var(--color-accent-gold)" : "var(--color-body-muted)",
                  boxShadow: filter === f ? "0 0 14px rgba(232,160,69,0.2)" : "none",
                }}>
                {f}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* If the user clicks the "Resume" filter tab, we show the ResumeSection component instead of the grid */}
            {filter === "Resume" ? (
              <ResumeSection key="resume" />
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1.5rem",
                  alignItems: "start",
                }}
              >
                {filtered.map((item, i) => (
                  <CertCard key={item.title} item={item} i={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length === 0 && filter !== "Resume" && (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--color-body-faint)", textAlign: "center", padding: "3rem 0" }}>
              No items in this category yet.
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: "5rem", textAlign: "center" }}
          >
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "var(--color-heading)", maxWidth: 680, margin: "0 auto", lineHeight: 1.55 }}>
              "Every stage was small. Every habit it built — was not."
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-gold)", marginTop: "0.75rem" }}>
              — Umang Pandey
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Journey;
