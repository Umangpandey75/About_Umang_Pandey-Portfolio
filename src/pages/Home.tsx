import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ── Typewriter hook ──────────────────── */
const useTypewriter = (words: string[], speed = 75, pause = 2000) => {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const word = words[wordIdx];
    if (typing) {
      if (display.length < word.length) {
        const t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }
  }, [display, typing, wordIdx, words, speed, pause]);
  return display;
};

/* ── Neural-network particle canvas ──── */
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.4,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.4 + 0.1,
      gold: Math.random() > 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x = (p.x + p.dx + canvas.width) % canvas.width;
        p.y = (p.y + p.dy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(232,160,69,${p.alpha})` : `rgba(107,72,255,${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(107,72,255,${0.07 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
};

/* ── Live Clock ───────────────────────── */
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours();
  const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const emoji = h < 12 ? "🌅" : h < 17 ? "☀️" : h < 21 ? "🌆" : "🌙";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span>{emoji}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)" }}>
        {greeting} · {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST
      </span>
    </div>
  );
};

/* ── Countdown to graduation ─────────── */
const useCountdown = (target: Date) => {
  const [left, setLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000) / 60000),
        secs:  Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);
  return left;
};

/* ── Blink cursor span ────────────────── */
const Cursor = () => (
  <span style={{ display: "inline-block", width: 9, height: "1em", background: "#00FF41", verticalAlign: "text-bottom", animation: "glowPulse 1s step-end infinite", marginLeft: 2 }} />
);

/* ── Terminal typewriter line ─────────── */
const TermLine = ({ text, delay, color = "#00FF41" }: { text: string; delay: number; color?: string }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return visible ? (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(0.72rem, 2.2vw, 0.82rem)", color, lineHeight: 1.9 }}>
      {text}
    </div>
  ) : null;
};

/* ── Stats ──────────────────────────── */
const STATS = [
  { value: "B.Tech", label: "CSE Degree" },
  { value: "4+",     label: "Projects" },
  { value: "2+",     label: "Tata Trainee Roles" },
  { value: "2026",   label: "Graduating" },
];

const ROLES = ["Data Analyst", "Python Developer", "Power BI Builder", "SQL Server Specialist"];

/* ── Featured project strip ──────────── */
const FEATURED = [
  { name: "Employee Performance Dashboard", url: "https://github.com/Umangpandey75", lang: "Power BI / DAX", year: "2025" },
  { name: "Heart-IQ Predictive System",    url: "https://github.com/Umangpandey75/Heart-IQ", lang: "Python / Streamlit", year: "2026" },
  { name: "Bug Tracking System",           url: "https://github.com/Umangpandey75", lang: "HTML / CSS / SQL", year: "2024" },
];

/* ── Currently data ───────────────────── */
const CURRENTLY = [
  { label: "Building",  value: "This 3D Portfolio v2.0 + Heart-IQ model adjustments", icon: "🔨", color: "#6B48FF" },
  { label: "Learning",  value: "Advanced SQL stored procedures + Machine Learning algorithms", icon: "📖", color: "#E8A045" },
  { label: "Analyzing", value: "Customer datasets to build interactive dashboards", icon: "📊", color: "#00CEA8" },
  { label: "Reading",   value: "Python for Data Analysis by Wes McKinney", icon: "📚", color: "#F472B6" },
  { label: "Fuelled by", value: "Curiosity and structured datasets", icon: "☕", color: "#E8A045" },
  { label: "Goal",      value: "Land a great Data Analyst internship in 2026", icon: "🎯", color: "#22C55E" },
];

/* ── Fun facts ───────────────────────── */
const BENTO = [
  { icon: "📝", title: "First Code Written In", value: "IDLE Python, 2021", wide: false, color: "#6B48FF" },
  { icon: "🐛", title: "Bugs Fixed This Year", value: "~180+", wide: false, color: "#E8A045" },
  { icon: "🌙", title: "Favorite Coding Hour", value: "9 PM – Midnight", wide: false, color: "#00CEA8" },
  { icon: "⌨️", title: "Tabs or Spaces?", value: "4 spaces. Always.", wide: true, color: "#F472B6" },
  { icon: "🔋", title: "Debug Mode", value: "Print statements first, Stack Overflow second, coffee third.", wide: true, color: "#6B48FF" },
  { icon: "🌐", title: "Internet Speed", value: "Fast enough to download datasets", wide: false, color: "#22C55E" },
  { icon: "🎯", title: "Typing Speed", value: "~60 WPM and climbing", wide: false, color: "#E8A045" },
  { icon: "💡", title: "Best Idea Comes When", value: "While walking or right before sleep", wide: true, color: "#00CEA8" },
];

/* ── Manifesto lines ─────────────────── */
const MANIFESTO = [
  { text: "Code is the closest thing to magic",     size: "clamp(2rem, 5vw, 4rem)",   gold: false },
  { text: "that humans have ever invented.",          size: "clamp(2rem, 5vw, 4rem)",   gold: false },
  { text: "Real things. Shipped.",                   size: "clamp(2.5rem, 6vw, 5.5rem)", gold: true },
  { text: "Not just in a README.",                   size: "clamp(1.6rem, 3.5vw, 3rem)", gold: false },
];

/* ── Main ─────────────────────────────── */
const Home = () => {
  const role = useTypewriter(ROLES, 75, 1800);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const graduation = useRef(new Date("2026-06-30T00:00:00+05:30")).current;
  const cd = useCountdown(graduation);
  const [termStarted, setTermStarted] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTermStarted(true); }, { threshold: 0.3 });
    if (termRef.current) obs.observe(termRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="page-content" id="page-home" style={{ overflow: "hidden" }}>

      {/* ── Background orbs ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "8%", left: "2%",
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-orb-violet) 0%, transparent 70%)",
          filter: "blur(70px)",
          transform: `translate(${mouse.x * 0.012}px,${mouse.y * 0.012}px)`,
          transition: "transform 1s ease",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "3%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-orb-gold) 0%, transparent 70%)",
          filter: "blur(70px)",
          transform: `translate(${-mouse.x * 0.009}px,${-mouse.y * 0.009}px)`,
          transition: "transform 1s ease",
        }} />
      </div>
      <ParticleCanvas />

      {/* ── Hero ── */}
      <section className="hero-section" style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>
        <div className="hero-flex-container" style={{ maxWidth: 1200, width: "100%" }}>
          {/* Left text block */}
          <div className="hero-text-block" style={{ maxWidth: 620 }}>
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.55rem",
                padding: "0.4rem 1.2rem", borderRadius: 9999,
                background: "var(--color-tag-gold-bg)", border: "1px solid var(--color-tag-gold-border)",
                marginBottom: "1.75rem",
              }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent-gold)", display: "block", flexShrink: 0, boxShadow: "0 0 8px var(--color-accent-gold)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Available for Internship — 2026
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.9rem, 6.5vw, 5.5rem)", color: "var(--color-heading)", lineHeight: 1.0, marginBottom: "0.2rem" }}>
              Hi, I'm
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.8 }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.9rem, 6.5vw, 5.5rem)", lineHeight: 1.0, marginBottom: "1.75rem",
                background: "var(--grad-name)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Umang Pandey
            </motion.h1>

            <motion.div className="hero-typewriter-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2.4vw, 1.3rem)", color: "var(--color-body)", marginBottom: "1.4rem",
                minHeight: "2.2em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--color-accent-gold)", fontWeight: 700, fontSize: "1.2em", fontFamily: "var(--font-heading)" }}>›</span>
              <span>{role}</span>
              <span style={{ width: 2, height: "1.1em", background: "var(--color-accent-violet)", display: "inline-block", flexShrink: 0, animation: "glowPulse 1.1s ease-in-out infinite" }} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
              className="hero-paragraph"
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "var(--color-body-muted)", maxWidth: 540, lineHeight: 1.85, marginBottom: "2.8rem" }}>
              B.Tech CSE student at NITRA Technical Campus, Ghaziabad — analyzing data and
              visualizing business insights. From{" "}
              <span style={{ color: "var(--color-inline-gold)", fontWeight: 500 }}>Power BI dashboards</span> to{" "}
              <span style={{ color: "var(--color-inline-violet)", fontWeight: 500 }}>predictive models</span>, all live on the internet.
            </motion.p>

            <motion.div className="hero-buttons-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              <Link to="/projects" className="btn-primary" id="home-cta-projects">View Projects →</Link>
              <a href="https://github.com/Umangpandey75" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="home-cta-github">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/umang-pandey-01b486273" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="home-cta-linkedin"
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(10,102,194,0.6)"; el.style.color = "#0A66C2"; el.style.background = "rgba(10,102,194,0.08)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = ""; el.style.color = ""; el.style.background = ""; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a href="https://mail.google.com/mail/?view=cm&to=umangpandey.co@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-secondary" id="home-cta-email">
                Hire Me
              </a>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring", damping: 18 }}
            style={{ flex: "0 0 auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: -4, borderRadius: "50%",
              background: "conic-gradient(from 0deg, var(--color-accent-gold), var(--color-accent-violet), var(--color-accent-gold), var(--color-accent-violet), var(--color-accent-gold))",
              animation: "spinSlow 8s linear infinite", zIndex: 0 }} />
            <div style={{ position: "absolute", inset: -1, borderRadius: "50%", background: "var(--color-bg)", zIndex: 1 }} />
            <div className="relative z-[2] w-[270px] h-[270px] xs:w-[300px] xs:h-[300px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden" style={{ background: "var(--color-photo-bg)" }}>
              <img src="/my.jpeg" alt="Umang Pandey — CS Student & Developer"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "https://avatars.githubusercontent.com/u/269774892?v=4"; }} />
            </div>
            <motion.div className="lg-only-badge" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
              style={{ position: "absolute", top: 20, left: -80, zIndex: 3, background: "var(--color-nav-bg-mobile)", backdropFilter: "blur(12px)",
                border: "1px solid var(--color-border-accent)", borderRadius: 12, padding: "0.55rem 1rem",
                fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-accent-violet-light)",
                whiteSpace: "nowrap", alignItems: "center", gap: "0.45rem" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ghaziabad, India
            </motion.div>
            <motion.div className="lg-only-badge" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0.7 }}
              style={{ position: "absolute", bottom: 20, right: -95, zIndex: 3, background: "var(--color-nav-bg-mobile)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(232,160,69,0.4)", borderRadius: 12, padding: "0.55rem 1rem",
                fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-accent-gold)",
                whiteSpace: "nowrap", alignItems: "center", gap: "0.45rem" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-accent-gold)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Tata Visual Intern
            </motion.div>
            <motion.div className="lg-only-badge" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 1.2 }}
              style={{ position: "absolute", bottom: -10, left: -50, zIndex: 3, background: "var(--color-nav-bg-mobile)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(107,72,255,0.35)", borderRadius: 12, padding: "0.55rem 1rem",
                fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-accent-violet-light)",
                whiteSpace: "nowrap", alignItems: "center", gap: "0.45rem" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-violet-light)" strokeWidth="2.5" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              B.Tech CSE
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}
        style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--color-border)", background: "var(--color-card)", backdropFilter: "blur(10px)", padding: "2.25rem 0" }}>
        <div className="section-wrapper grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.08 }}
              style={{ textAlign: "center", minWidth: 100 }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                background: "var(--grad-stats)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Featured Projects strip ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 0" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Recent Work
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "2.5rem" }}>
            Featured <span className="saffron-text-gradient">Projects</span>
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {FEATURED.map((p, i) => (
              <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 12, scale: 1.01 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 sm:px-8"
                style={{ borderRadius: 16, background: "var(--color-card)", border: "1px solid var(--color-border)", textDecoration: "none",
                  transition: "border-color 0.25s ease, background 0.25s ease" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(232,160,69,0.3)"; el.style.background = "rgba(232,160,69,0.04)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--color-border)"; el.style.background = "var(--color-card)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)", minWidth: 32 }}>0{i + 1}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-heading)" }}>{p.name}</span>
                  <span style={{ padding: "0.2rem 0.7rem", borderRadius: 9999, background: "var(--color-tag-bg)", border: "1px solid var(--color-tag-border)", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-tag-text)" }}>{p.lang}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)" }}>{p.year}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </motion.a>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link to="/projects" className="btn-secondary" id="home-see-all-projects">See All Projects →</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE SECTION 1 — TERMINAL BIO CARD
          A live-typed "terminal" showing who I am in code
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 0" }}>
        <div className="section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Terminal card */}
            <motion.div ref={termRef} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{
                borderRadius: 18, overflow: "hidden", height: "100%",
                border: "1px solid rgba(0,255,65,0.2)",
                boxShadow: "0 0 60px rgba(0,255,65,0.06), 0 8px 40px rgba(0,0,0,0.4)",
                background: "#0a0f0a",
              }}>
                {/* Title bar */}
                <div style={{ padding: "0.75rem 1.2rem", background: "#111611", borderBottom: "1px solid rgba(0,255,65,0.15)", display: "flex", alignItems: "center", gap: "0.55rem" }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840" }} />
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.72rem", color: "rgba(0,255,65,0.4)", marginLeft: "0.75rem" }}>umang@portfolio ~ bash</span>
                </div>
                {/* Terminal body */}
                <div style={{ padding: "1.25rem 1.5rem", minHeight: 360 }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(0.72rem, 2.2vw, 0.82rem)", color: "rgba(0,255,65,0.6)", marginBottom: "0.5rem" }}>
                     $ cat umang.json
                  </div>
                  {termStarted && (
                    <>
                      <TermLine text='{' delay={200} color="rgba(0,255,65,0.5)" />
                      <TermLine text='  "name": "Umang Pandey",' delay={450} color="rgba(0,255,65,0.85)" />
                      <TermLine text='  "role": "CS Student + Data Analyst",' delay={700} color="rgba(0,255,65,0.85)" />
                      <TermLine text='  "location": "Ghaziabad, India 🇮🇳",' delay={950} color="rgba(0,255,65,0.85)" />
                      <TermLine text='  "degree": "B.Tech CSE",' delay={1200} color="rgba(232,160,69,0.9)" />
                      <TermLine text='  "internship": "TATA Data Analyst (Virtual)",' delay={1450} color="rgba(34,197,94,0.9)" />
                      <TermLine text='  "status": "seeking_internship",' delay={1700} color="rgba(232,160,69,0.9)" />
                      <TermLine text='  "superpower": "extracting data insights",' delay={1950} color="rgba(107,72,255,0.9)" />
                      <TermLine text='  "email": "umangpandey.co",' delay={2200} color="rgba(0,255,65,0.85)" />
                      <TermLine text='  "fun_fact": "dashboard enthusiast 📊"' delay={2450} color="rgba(244,114,182,0.9)" />
                      <TermLine text='}' delay={2700} color="rgba(0,255,65,0.5)" />
                      <div style={{ marginTop: "0.6rem", fontFamily: "'Courier New', monospace", fontSize: "0.82rem", color: "rgba(0,255,65,0.6)" }}>
                        {termStarted && <><span>$ </span><Cursor /></>}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Countdown to graduation */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Live status card */}
                <div className="glass-card" style={{ padding: "1.6rem", borderRadius: 18, flex: "0 0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.82rem", color: "var(--color-heading)" }}>Live Status</p>
                    <LiveClock />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", display: "block", flexShrink: 0, boxShadow: "0 0 10px #22C55E", animation: "glowPulse 1.8s ease-in-out infinite" }} />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--color-body-muted)" }}>
                      <span style={{ color: "#22C55E", fontWeight: 700 }}>Online</span> · Open to opportunities
                    </p>
                  </div>
                </div>

                {/* Graduation countdown */}
                <div className="flex-1 rounded-[18px] p-4 sm:p-6 lg:p-8" style={{
                  background: "linear-gradient(135deg, rgba(107,72,255,0.12) 0%, rgba(232,160,69,0.06) 100%)",
                  border: "1px solid rgba(107,72,255,0.22)" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--color-accent-violet-light)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "0.5rem" }}>
                    ⏳ Graduating in
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3">
                    {[
                      { n: cd.days,  l: "Days"  },
                      { n: cd.hours, l: "Hours" },
                      { n: cd.mins,  l: "Mins"  },
                      { n: cd.secs,  l: "Secs"  },
                    ].map((u) => (
                      <div key={u.l} style={{ textAlign: "center", background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: "0.75rem 0.3rem" }}>
                        <AnimatePresence mode="wait">
                          <motion.p key={u.n} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ duration: 0.2 }}
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "var(--color-heading)", lineHeight: 1 }}>
                            {String(u.n).padStart(2, "0")}
                          </motion.p>
                        </AnimatePresence>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{u.l}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)" }}>B.Tech (CSE) · NITRA Tech Campus · Class of 2026</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE SECTION 2 — BIG MANIFESTO TYPOGRAPHY
          Giant cinematic words — the kind that hit hard
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0", overflow: "hidden",
        borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        {/* Massive blurred gold blob behind text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(232,160,69,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="section-wrapper">
          <div style={{ textAlign: "center" }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "2rem" }}>
              — what I believe —
            </motion.p>
            {MANIFESTO.map((line, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 900,
                  fontSize: line.size, lineHeight: 1.15, marginBottom: "0.2rem",
                  ...(line.gold
                    ? { background: "var(--grad-name)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                    : { color: "var(--color-heading)" }
                  ),
                }}>
                {line.text}
              </motion.p>
            ))}
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", marginTop: "1.5rem", letterSpacing: "0.05em" }}>
              — every project I build, every competition I enter, every night I stay up coding.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE SECTION 3 — "CURRENTLY" STATUS WIDGET
          What I'm doing right now — like a Notion widget
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "6rem 0" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Updated · May 2026
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
            What I'm <span className="violet-text-gradient">Currently</span> Doing
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRENTLY.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div style={{
                  padding: "1.4rem 1.6rem", borderRadius: 16, height: "100%",
                  background: "var(--color-card)", border: `1px solid ${item.color}22`,
                  boxShadow: `0 4px 20px ${item.color}08`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}44`; el.style.boxShadow = `0 12px 40px ${item.color}14`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}22`; el.style.boxShadow = `0 4px 20px ${item.color}08`; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>{item.label}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--color-body-muted)", lineHeight: 1.6 }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ✦ CREATIVE SECTION 4 — FUN FACTS BENTO GRID
          Personal, quirky, human — not on any other page
          ════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 0 7rem",
        borderTop: "1px solid var(--color-border)" }}>
        <div className="section-wrapper">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            The Human Behind The Code
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-heading)", marginBottom: "3rem" }}>
            Fun <span className="saffron-text-gradient">Facts</span>
          </motion.h2>

          {/* Bento grid — wide cards span 2 cols */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {BENTO.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={item.wide ? "col-span-1 xs:col-span-2" : "col-span-1"}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                <div style={{
                  padding: "1.5rem", borderRadius: 16, height: "100%",
                  background: "var(--color-card)", border: `1px solid ${item.color}20`,
                  transition: "border-color 0.3s, box-shadow 0.3s", cursor: "default",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}45`; el.style.boxShadow = `0 8px 30px ${item.color}12`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${item.color}20`; el.style.boxShadow = "none"; }}>
                  <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "0.75rem" }}>{item.icon}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>{item.title}</p>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: item.wide ? "1.05rem" : "0.95rem", color: "var(--color-heading)", lineHeight: 1.4 }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing quote */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            style={{ marginTop: "4rem", textAlign: "center" }}>
            <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-violet))", borderRadius: 2, margin: "0 auto 1.5rem" }} />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "var(--color-heading)", maxWidth: 680, margin: "0 auto", lineHeight: 1.55 }}>
              "Every stage was small. Every habit it built — was not."
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-gold)", marginTop: "0.75rem" }}>— Umang Pandey</p>
          </motion.div>
        </div>
      </section>

      {/* Scroll caret */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.9 }}
        style={{ position: "absolute", bottom: "calc(100vh - 95vh)", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--color-body-faint)", textTransform: "uppercase", letterSpacing: "0.18em" }}>Scroll</span>
        <div style={{ width: 22, height: 22, borderRight: "2px solid var(--color-accent-gold)", borderBottom: "2px solid var(--color-accent-gold)", transform: "rotate(45deg)", opacity: 0.5 }} />
      </motion.div>

      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
};

export default Home;
