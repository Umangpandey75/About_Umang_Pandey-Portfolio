import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "/about" },
  { label: "Skills",   path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Journey",  path: "/journey" },
  { label: "Contact",  path: "/contact" },
];

/* ── Creative geometric diamond logo ──────────────── */
const LogoMark = () => (
  <svg viewBox="0 0 58 58" fill="none" aria-hidden="true" className="nav-logo-svg" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="navLg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent-gold)" />
        <stop offset="100%" stopColor="var(--color-accent-violet)" />
      </linearGradient>
      <linearGradient id="navLg2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--color-accent-violet)" />
        <stop offset="100%" stopColor="var(--color-accent-gold)" />
      </linearGradient>
    </defs>
    {/* Outer diamond */}
    <path d="M29 3 L55 29 L29 55 L3 29 Z" stroke="url(#navLg1)" strokeWidth="2" fill="rgba(232,160,69,0.05)" />
    {/* Inner diamond */}
    <path d="M29 13 L45 29 L29 45 L13 29 Z" stroke="url(#navLg2)" strokeWidth="1.5" fill="rgba(107,72,255,0.08)" />
    {/* Centre dot */}
    <circle cx="29" cy="29" r="3.5" fill="url(#navLg1)" />
    {/* Corner dots */}
    <circle cx="29" cy="3"  r="2" fill="var(--color-accent-gold)" opacity="0.9" />
    <circle cx="55" cy="29" r="2" fill="var(--color-accent-violet)" opacity="0.9" />
    <circle cx="29" cy="55" r="2" fill="var(--color-accent-gold)" opacity="0.9" />
    <circle cx="3"  cy="29" r="2" fill="var(--color-accent-violet)" opacity="0.9" />
    {/* UP text */}
    <text
      x="29" y="34"
      textAnchor="middle"
      fontFamily="Poppins, sans-serif"
      fontWeight="900"
      fontSize="14"
      fill="url(#navLg1)"
      letterSpacing="0.5"
    >
      UP
    </text>
  </svg>
);

/* ── Sun icon for light mode ── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/* ── Moon icon for dark mode ── */
const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ── Theme Toggle Button ── */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      id="theme-toggle"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "1px solid var(--color-border-strong)",
        background: "var(--color-card)",
        color: isLight ? "var(--color-accent-gold)" : "var(--color-accent-violet-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
        flexShrink: 0,
        boxShadow: isLight
          ? "0 2px 8px rgba(184,98,10,0.12)"
          : "0 2px 8px rgba(107,72,255,0.18)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isLight ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

/* ── Mobile hamburger ── */
const Hamburger = ({ open, onClick }: { open: boolean; onClick: () => void }) => (
  <button
    id="mobile-menu-btn"
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    onClick={onClick}
    style={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "1px solid var(--color-border-strong)",
      background: "var(--color-card)",
      color: "var(--color-body)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      cursor: "pointer",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s ease",
    }}
  >
    <span style={{
      width: 20, height: 2, background: open ? "var(--color-accent-gold)" : "var(--color-body)",
      borderRadius: 2, transition: "all 0.3s",
      transform: open ? "rotate(45deg) translateY(7px)" : "none",
    }} />
    <span style={{
      width: 20, height: 2, background: open ? "transparent" : "var(--color-body)",
      borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1,
    }} />
    <span style={{
      width: 20, height: 2, background: open ? "var(--color-accent-gold)" : "var(--color-body)",
      borderRadius: 2, transition: "all 0.3s",
      transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
    }} />
  </button>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location]);

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="navbar"
      style={{
        position:     "fixed",
        top:          0,
        left:         0,
        right:        0,
        zIndex:       50,
        height:       "var(--navbar-height)",
        transition:   "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
        background:   scrolled ? "var(--color-nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid var(--color-border)` : "1px solid transparent",
      }}
    >
      <div
        className="section-wrapper navbar-wrapper"
        style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
      >
        {/* ── Logo ── */}
        <NavLink
          to="/"
          id="nav-logo"
          style={{ display: "flex", alignItems: "center", gap: "clamp(0.4rem, 2vw, 0.75rem)", textDecoration: "none" }}
        >
          <motion.div whileHover={{ rotate: 45, scale: 1.08 }} transition={{ duration: 0.4 }} className="nav-logo-container">
            <LogoMark />
          </motion.div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "clamp(1.1rem, 4.5vw, 1.35rem)",
                  color: "var(--color-heading)",
                  letterSpacing: "-0.02em",
                }}
              >
                Umang
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "clamp(1.1rem, 4.5vw, 1.35rem)",
                  background: "linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-gold-bright))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pandey
              </span>
            </div>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              color: "var(--color-body-faint)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>Portfolio</span>
          </div>
        </NavLink>

        {/* ── Desktop Nav (hidden on mobile) ── */}
        <nav
          id="desktop-nav"
          style={{ gap: "0.25rem" }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              id={`nav-link-${link.label.toLowerCase()}`}
              end={link.path === "/"}
              style={({ isActive }) => ({
                padding:        "0.45rem 1.1rem",
                borderRadius:   "9999px",
                fontFamily:     "var(--font-body)",
                fontWeight:     500,
                fontSize:       "0.875rem",
                color:          isActive ? "var(--color-accent-gold)" : "var(--color-body)",
                background:     isActive ? `rgba(232,160,69,${theme === "light" ? "0.12" : "0.10"})` : "transparent",
                border:         isActive ? "1px solid rgba(232,160,69,0.28)" : "1px solid transparent",
                transition:     "all 0.22s ease",
                textDecoration: "none",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                if (!el.getAttribute("aria-current")) el.style.color = "var(--color-heading)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                if (!el.getAttribute("aria-current")) el.style.color = "var(--color-body)";
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right controls (theme toggle + CTA + hamburger) ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Theme toggle — always visible */}
          <ThemeToggle />

          {/* CTA button — desktop only */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=umangpandey.co@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-button"
            id="nav-cta"
            style={{
              padding:        "0.5rem 1.4rem",
              borderRadius:   "9999px",
              fontFamily:     "var(--font-body)",
              fontWeight:     600,
              fontSize:       "0.82rem",
              color:          "#fff",
              background:     "linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-gold))",
              textDecoration: "none",
              transition:     "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            Hire Me
          </a>

          {/* Hamburger — mobile only */}
          <div className="nav-mobile-toggle">
            <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            style={{
              position:   "absolute",
              top:        "var(--navbar-height)",
              left:       0,
              right:      0,
              background: "var(--color-nav-bg-mobile)",
              backdropFilter: "blur(24px)",
              borderBottom: `1px solid var(--color-border)`,
              padding:    "1rem 1.5rem 1.5rem",
              display:    "flex",
              flexDirection: "column",
              gap:        "0.5rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                style={({ isActive }) => ({
                  padding:    "0.7rem 1.25rem",
                  borderRadius: 10,
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize:   "0.9rem",
                  color:      isActive ? "var(--color-accent-gold)" : "var(--color-body)",
                  background: isActive ? "rgba(232,160,69,0.08)" : "transparent",
                  border:     isActive ? "1px solid rgba(232,160,69,0.2)" : "1px solid transparent",
                  textDecoration: "none",
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://mail.google.com/mail/?view=cm&to=umangpandey.co@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-gold))",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
