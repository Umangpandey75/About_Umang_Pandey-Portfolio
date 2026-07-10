import { Suspense, lazy, useEffect } from "react";
// React Router lets us navigate between different pages without reloading the whole browser window (creating a Single Page Application)
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Importing our layout pieces that will be visible on every page
import { Navbar, Footer } from "./components/layout";
// ThemeProvider wraps our app and passes down "dark mode" or "light mode" state to all children
import { ThemeProvider } from "./context/ThemeContext";
// GlobalEffects adds the custom glowing cursor and 3D floating background elements
import GlobalEffects from "./components/GlobalEffects";

// ── Lazy-load pages for code-splitting ──────────────────────────────────────
// lazy() tells React to only download the code for a specific page when the user actually visits it.
// This makes the initial website load much faster!
const Home     = lazy(() => import("./pages/Home/Home"));
const About    = lazy(() => import("./pages/About/About"));
const Skills   = lazy(() => import("./pages/Skills/Skills"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Journey  = lazy(() => import("./pages/Journey/Journey"));
const Contact  = lazy(() => import("./pages/Contact/Contact"));
const Blog     = lazy(() => import("./pages/Blog/Blog"));
const Resume   = lazy(() => import("./pages/Resume/Resume"));

// ── Scroll to top on every route change ─────────────────────────────────────
// A small helper component that listens for URL changes (pathname)
// and forces the browser to scroll back to the top of the page.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // This array means "run this effect every time 'pathname' changes"
  return null; // It doesn't render any visible UI
};

// ── Full-screen loading fallback ─────────────────────────────────────────────
const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-loader-bg)",
    }}
  >
    <div className="canvas-loader" />
  </div>
);

// ── Layout wrapper (Navbar + page content + Footer) ──────────────────────────
// This component acts like a sandwich: Navbar on top, the actual page (children) in the middle, and Footer at the bottom.
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh", // Makes sure the layout takes up at least the full screen height
      background: "var(--color-bg)",
      transition: "background 0.35s ease",
    }}
  >
    {/* ── Global visual effects: cursor, progress bar, page wipe, 3D shapes ── */}
    <GlobalEffects />

    <Navbar />
    {/* flex: 1 pushes the footer to the bottom if the page content is short */}
    <div style={{ flex: 1 }}>
      {/* Suspense is required when using lazy(). It shows the PageLoader while the page's code is downloading */}
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </div>
    <Footer />
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
// This is the main structure of our application.
const App = () => (
  <ThemeProvider>
    {/* BrowserRouter enables the routing system */}
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        {/* Routes is the container for all our page routes */}
        <Routes>
          {/* Each Route maps a specific URL path (like "/about") to a specific Component (like <About />) */}
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/skills"   element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journey"  element={<Journey />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/resume"   element={<Resume />} />
          {/* 404 fallback — The "*" catches any URL that doesn't match the above, redirecting to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
