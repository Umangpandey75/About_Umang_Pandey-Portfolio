import { motion } from "framer-motion";

const Blog = () => {
  return (
    <main className="page-content" id="page-blog" style={{ overflow: "hidden" }}>
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
            Insights & Articles
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
            My <span className="saffron-text-gradient">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--color-body-muted)",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Coming soon. I'll be sharing my thoughts on Data Analytics, Python development, Power BI dashboards, and Machine Learning here.
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default Blog;
