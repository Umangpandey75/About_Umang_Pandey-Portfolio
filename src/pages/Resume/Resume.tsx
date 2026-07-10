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
            style={{ marginTop: "2rem" }}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Download PDF Resume
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Resume;
