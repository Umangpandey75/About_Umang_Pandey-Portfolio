import { NavLink } from "react-router-dom";

// We store our links in an array. This is a common React pattern!
// It allows us to use `.map()` later to generate HTML for each link without repeating code.
const FOOTER_LINKS = [
  { label: "Home",     path: "/" },
  { label: "About",    path: "/about" },
  { label: "Skills",   path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Blog",     path: "/blog" },
  { label: "Resume",   path: "/resume" },
  { label: "Journey",  path: "/journey" },
  { label: "Contact",  path: "/contact" },
];

// Same here for our social media links. The `icon` property holds the actual SVG HTML code.
const SOCIAL_LINKS = [
  {
    id:    "footer-github",
    label: "GitHub",
    href:  "https://github.com/Umangpandey75",
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id:    "footer-linkedin",
    label: "LinkedIn",
    href:  "https://linkedin.com/in/umang-pandey-01b486273",
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id:    "footer-medium",
    label: "Medium",
    href:  "https://medium.com/", // Add your Medium link here
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zm2.81 0c0 3.14-.54 5.68-1.21 5.68-.66 0-1.2-.25-1.2-5.68 0-3.14.54-5.68 1.2-5.68.67 0 1.21 2.54 1.21 5.68z" />
      </svg>
    ),
  },
  {
    id:    "footer-devto",
    label: "Dev.to",
    href:  "https://dev.to/", // Add your Dev.to link here
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-1.52.02v1.73h2.55v1.28H9.36V8.53h4.29v1.3zM19.3 8.53l-2.07 5.17c-1.14 2.83-2.07 5.17-2.09 5.2-.02.02-.15-.22-.29-.53L12.56 8.53h1.61l1.6 3.97 1.62-3.97h1.91z"/>
      </svg>
    ),
  },
  {
    id:    "footer-kaggle",
    label: "Kaggle",
    href:  "https://kaggle.com/", // Add your Kaggle link here
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.34-.246.526-.246h3.256c.141 0 .234.05.281.152.047.106.016.203-.094.293l-5.26 5.035 5.564 6.953c.094.07.117.152.07.248z" />
      </svg>
    ),
  },
  {
    id:    "footer-leetcode",
    label: "LeetCode",
    href:  "https://leetcode.com/", // Add your LeetCode link here
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114l2.102-2.311 2.585-2.844.02-.021c1.325-1.448 2.836-1.523 3.428-1.523.593 0 1.458.106 2.606 1.15.524.478 1.332.447 1.815-.07.483-.518.45-1.325-.074-1.802-1.637-1.493-3.149-1.921-4.42-1.921A5.02 5.02 0 0 0 13.483 0zm-8.85 10.706a1.376 1.376 0 0 0-1.376 1.376 1.376 1.376 0 0 0 1.376 1.376h12.571a1.376 1.376 0 0 0 1.376-1.376 1.376 1.376 0 0 0-1.376-1.376H4.632z"/>
      </svg>
    ),
  },
  {
    id:    "footer-hackerrank",
    label: "HackerRank",
    href:  "https://hackerrank.com/", // Add your HackerRank link here
    icon:  (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.996 0c6.627 0 12.004 5.377 12.004 12.004 0 6.626-5.377 11.996-12.004 11.996-6.626 0-11.996-5.37-11.996-11.996C0 5.377 5.37 0 11.996 0zm-3.66 6.302h-3.63v11.396h3.63v-4.57h7.243v4.57h3.63V6.302h-3.63v4.205H8.336V6.302zm3.626 6.944c-1.348 0-2.443-1.094-2.443-2.44 0-1.348 1.095-2.442 2.443-2.442 1.347 0 2.44 1.094 2.44 2.442 0 1.346-1.093 2.44-2.44 2.44z"/>
      </svg>
    ),
  },
];

// This is a functional React component called Footer.
const Footer = () => {
  // We use JavaScript's Date object to automatically get the current year.
  // This way, your copyright notice is never out of date!
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        background:   "var(--color-footer-bg)",
        borderTop:    "1px solid var(--color-border)",
        padding:      "3rem 0 1.5rem",
        marginTop:    "auto", // Pushes the footer to the bottom of the page
        transition:   "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="section-wrapper">
        {/* Top row */}
        <div
          style={{
            display:         "flex",
            flexWrap:        "wrap",
            justifyContent:  "space-between",
            alignItems:      "flex-start",
            gap:             "2rem",
            marginBottom:    "2.5rem",
          }}
        >
          {/* Brand block - The logo and small bio */}
          <div style={{ maxWidth: 280 }}>
            <div
              style={{
                display:     "flex",
                alignItems:  "center",
                gap:         "0.6rem",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  width:          36,
                  height:         36,
                  borderRadius:   "50%",
                  background:     "linear-gradient(135deg, #E8A045 0%, #6B48FF 100%)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontFamily:     "var(--font-heading)",
                  fontWeight:     700,
                  fontSize:       "0.875rem",
                  color:          "#fff",
                  flexShrink:     0,
                }}
              >
                UP
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize:   "1rem",
                  color:      "var(--color-heading)",
                }}
              >
                Umang<span style={{ color: "var(--color-accent-gold)" }}> Pandey</span>
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize:   "0.82rem",
                color:      "var(--color-body-muted)",
                lineHeight: 1.65,
              }}
            >
              Computer Science student from Ghaziabad, Uttar Pradesh, India — building data pipelines, dashboards, and software solutions.
            </p>
          </div>

          {/* Nav links block */}
          <nav id="footer-nav" aria-label="Footer navigation">
            <p
              style={{
                fontFamily:   "var(--font-heading)",
                fontWeight:   700,
                fontSize:     "0.75rem",
                color:        "var(--color-accent-gold)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom:  "0.85rem",
              }}
            >
              Pages
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {/* Here we use .map() to loop over our FOOTER_LINKS array.
                  For every link in the array, React creates an <li> and <NavLink>! */}
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    style={({ isActive }) => ({
                      fontFamily:     "var(--font-body)",
                      fontSize:       "0.85rem",
                      color:          isActive ? "var(--color-accent-gold)" : "var(--color-body)",
                      textDecoration: "none",
                      transition:     "color 0.2s",
                    })}
                    // We use inline JavaScript to change the color when the mouse enters or leaves
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-heading)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-body)"; }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links block */}
          <div>
            <p
              style={{
                fontFamily:   "var(--font-heading)",
                fontWeight:   700,
                fontSize:     "0.75rem",
                color:        "#E8A045",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom:  "0.85rem",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {/* Similar to the links, we map over our SOCIAL_LINKS array */}
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width:          40,
                    height:         40,
                    borderRadius:   "50%",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    background:     "var(--color-card)",
                    border:         "1px solid var(--color-border-strong)",
                    color:          "var(--color-body)",
                    transition:     "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background   = "rgba(232,160,69,0.12)";
                    el.style.borderColor  = "rgba(232,160,69,0.5)";
                    el.style.color        = "var(--color-accent-gold)";
                    el.style.transform    = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background   = "var(--color-card)";
                    el.style.borderColor  = "var(--color-border-strong)";
                    el.style.color        = "var(--color-body)";
                    el.style.transform    = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider line above the bottom bar */}
        <div
          style={{
            height:     1,
            background: "var(--color-border)",
            marginBottom: "1.25rem",
          }}
        />

        {/* Bottom bar with Copyright */}
        <div
          style={{
            display:         "flex",
            flexWrap:        "wrap",
            justifyContent:  "space-between",
            alignItems:      "center",
            gap:             "0.75rem",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)" }}>
            &copy; {year} Umang Pandey &mdash; All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)" }}>
            Made by vive coding
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
