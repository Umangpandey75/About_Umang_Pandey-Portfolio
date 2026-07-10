import { motion } from "framer-motion";

const TOPICS = [
  { icon: "📊", title: "Power BI Dashboards", desc: "Building interactive dashboards and business intelligence solutions.", color: "var(--color-accent-gold)" },
  { icon: "🐍", title: "Python for Data Analytics", desc: "Automation, data cleaning, visualization, and practical Python projects.", color: "var(--color-accent-violet-light)" },
  { icon: "🗄️", title: "SQL", desc: "Query optimization, database design, and interview preparation.", color: "var(--color-accent-gold)" },
  { icon: "🤖", title: "Machine Learning", desc: "Predictive models, real-world implementations, and AI applications.", color: "var(--color-accent-violet-light)" },
  { icon: "📈", title: "Data Analytics", desc: "Business insights, KPIs, dashboards, and data storytelling.", color: "var(--color-accent-gold)" },
  { icon: "💼", title: "Career & Interview Tips", desc: "Resume reviews, project ideas, certifications, and job preparation.", color: "var(--color-accent-violet-light)" },
  { icon: "📂", title: "Portfolio & Career", desc: "Resume tips, GitHub optimization, portfolio building, freelancing, interview preparation, and career growth.", color: "var(--color-accent-gold)" },
];

const ARTICLES = [
  { icon: "🚀", title: "Building an HR Analytics Dashboard in Power BI – Step by Step", tag: "Power BI", status: "Publishing Soon", time: "8 min read", level: "Intermediate" },
  { icon: "❤️", title: "Heart Disease Prediction Using Machine Learning & Python", tag: "Machine Learning", status: "Draft", time: "10 min read", level: "Advanced" },
  { icon: "🐍", title: "Top 15 Python Libraries Every Data Analyst Should Master", tag: "Python", status: "In Progress", time: "6 min read", level: "Beginner" },
  { icon: "🗄️", title: "50 SQL Queries Every Data Analyst Should Know", tag: "SQL", status: "Draft", time: "12 min read", level: "Intermediate" },
  { icon: "📊", title: "Data Visualization Best Practices with Power BI", tag: "Data Viz", status: "Publishing Soon", time: "5 min read", level: "Beginner" },
  { icon: "🤖", title: "Machine Learning Roadmap for Beginners (2026)", tag: "Career", status: "In Progress", time: "7 min read", level: "Beginner" },
];

const Blog = () => {
  return (
    <main className="page-content" id="page-blog" style={{ overflowX: "hidden" }}>
      {/* ── Hero Section ── */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: "8rem", paddingBottom: "4rem", textAlign: "center" }}>
        <div className="section-wrapper">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--color-accent-gold)",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 600,
              marginBottom: "1rem",
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
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "var(--color-heading)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              maxWidth: "1000px",
              marginInline: "auto",
            }}
          >
            Exploring Data. Building Solutions. <span className="saffron-text-gradient">Sharing Knowledge.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "var(--color-body-muted)",
              maxWidth: 700,
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            <p>
              I share practical tutorials, project breakdowns, Power BI dashboards, Python automation, SQL techniques, Machine Learning implementations, and lessons learned while building real-world data solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Topics ── */}
      <section style={{ padding: "4rem 0", background: "var(--color-card)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="section-wrapper">
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-heading)",
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            Featured Topics
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {TOPICS.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "var(--color-bg)",
                  padding: "2rem",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{topic.icon}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: topic.color, marginBottom: "0.75rem" }}>
                  {topic.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-muted)", lineHeight: 1.6 }}>
                  {topic.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Articles ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="section-wrapper">
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "var(--color-heading)",
            marginBottom: "1rem"
          }}>
            Upcoming Articles
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--color-body-muted)", marginBottom: "3rem" }}>
            Here is a sneak peek at what I'm currently writing. Stay tuned!
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            {ARTICLES.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="hover-card"
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "2rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
              >
                {/* Status Badge */}
                <div style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px dashed var(--color-border)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  color: "var(--color-accent-gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  {article.status}
                </div>

                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{article.icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--color-heading)",
                  lineHeight: 1.4,
                  paddingRight: "6rem" // leave space for badge
                }}>
                  {article.title}
                </h3>
                
                {/* Metadata */}
                <div style={{ marginTop: "auto", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "var(--color-body-muted)", fontFamily: "var(--font-body)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      📅 July 2026
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      ⏱ {article.time}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      🎓 {article.level}
                    </span>
                  </div>
                  
                  <div>
                    <span style={{
                      display: "inline-block",
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      color: "var(--color-body)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500
                    }}>
                      🏷️ {article.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Newsletter Section ── */}
      <section style={{ padding: "2rem 0 6rem", textAlign: "center" }}>
        <div className="section-wrapper">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              padding: "4rem 2rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-heading)", marginBottom: "1rem" }}>
              Stay Updated
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--color-body-muted)", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto 2rem" }}>
              Get notified when I publish new tutorials on Data Analytics, Python, SQL, Power BI, and Machine Learning.
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "2rem" }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  padding: "0.8rem 1.2rem",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                  color: "var(--color-heading)",
                  fontFamily: "var(--font-body)",
                  minWidth: "250px",
                  outline: "none"
                }}
              />
              <button className="btn-primary" style={{ padding: "0.8rem 2rem", border: "none", cursor: "pointer" }}>
                Subscribe
              </button>
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-body-faint)" }}>
              Follow me on <a href="https://github.com/Umangpandey75" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent-gold)", textDecoration: "none" }}>GitHub</a> and <a href="https://linkedin.com/in/umang-pandey-01b486273" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent-violet-light)", textDecoration: "none" }}>LinkedIn</a> for the latest projects and articles.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
