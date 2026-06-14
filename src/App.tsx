import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Navbar, Footer } from "./components/layout";
import { ThemeProvider } from "./context/ThemeContext";
import GlobalEffects from "./components/GlobalEffects";

// ── Lazy-load pages for code-splitting ──────────────────────────────────────
const Home     = lazy(() => import("./pages/Home"));
const About    = lazy(() => import("./pages/About"));
const Skills   = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Journey  = lazy(() => import("./pages/Journey"));
const Contact  = lazy(() => import("./pages/Contact"));

// ── Scroll to top on every route change ─────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
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
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "var(--color-bg)",
      transition: "background 0.35s ease",
    }}
  >
    {/* ── Global visual effects: cursor, progress bar, page wipe, 3D shapes ── */}
    <GlobalEffects />

    <Navbar />
    <div style={{ flex: 1 }}>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </div>
    <Footer />
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/skills"   element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/journey"  element={<Journey />} />
          <Route path="/contact"  element={<Contact />} />
          {/* 404 fallback — redirect home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
