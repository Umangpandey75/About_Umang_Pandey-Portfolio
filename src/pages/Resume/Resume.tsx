import { motion } from "framer-motion";

const Resume = () => {
  return (
    <main className="page-content" id="page-resume" style={{ overflow: "hidden" }}>
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 0", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="section-wrapper" style={{ textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              color: "var(--color-accent-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Professional Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "var(--color-heading)",
              marginBottom: "1.5rem",
            }}
          >
            My <span className="violet-text-gradient">Resume</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", maxWidth: "800px", margin: "3rem auto 0" }}
          >
            {[
              { label: "Python Developer", file: "https://drive.google.com/file/d/1h1YGqukDLmixN22zfls6P2pK8ZcY5WG2/view?usp=sharing", icon: "🐍", color: "var(--color-accent-gold)" },
              { label: "Data Analyst", file: "https://drive.google.com/file/d/1JnD7c6tvSf0UXRTA9nfn9x1iTE4jvhfn/view?usp=sharing", icon: "📊", color: "var(--color-accent-violet-light)" },
              { label: "SEO Specialist", file: "https://drive.google.com/file/d/11YORci4WoyJ7-2A-BlVWuCdu438Z30uZ/view?usp=sharing", icon: "🔍", color: "#4285F4" },
              { label: "Software Engineer", file: "https://drive.google.com/file/d/1sTbq2_eQV5Ri-xc7ehB1NsBiwF2K-I3P/view?usp=sharing", icon: "💻", color: "var(--color-accent-gold)" }
            ].map((resume) => (
              <a
                key={resume.label}
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  padding: "1.5rem", 
                  borderRadius: "16px", 
                  background: "var(--color-card)", 
                  border: "1px solid var(--color-border)", 
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.8rem",
                  transition: "all 0.25s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = resume.color;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 10px 30px ${resume.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: "2rem" }}>{resume.icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-heading)", fontSize: "1.1rem" }}>{resume.label}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: resume.color, fontWeight: 600 }}>Download PDF ➔</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Resume;
