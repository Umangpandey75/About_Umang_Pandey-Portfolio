/**
 * GlobalEffects.tsx
 * ─────────────────
 * Three always-on visual layers that run on every page:
 *   1. Custom glowing cursor + magnetic pull on interactive elements
 *   2. Scroll-progress bar (gold→violet gradient, top of viewport)
 *   3. Page-transition cinematic wipe (AnimatePresence via pathname)
 *   4. CSS 3D floating geometric shapes (pure CSS, zero runtime cost)
 *
 * Mounted once inside <Layout> — touch nothing else.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";

/* ══════════════════════════════════════════════════════════════
   1.  CUSTOM CURSOR
   ══════════════════════════════════════════════════════════════ */
export const CustomCursor = () => {
  const dot   = useRef<HTMLDivElement>(null);
  const ring  = useRef<HTMLDivElement>(null);
  const raf   = useRef<number>(0);
  const pos   = useRef({ x: -200, y: -200 });
  const ring0 = useRef({ x: -200, y: -200 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden,  setHidden]  = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const tick = useCallback(() => {
    // Smooth ring lag — lerp toward dot position
    ring0.current.x += (pos.current.x - ring0.current.x) * 0.14;
    ring0.current.y += (pos.current.y - ring0.current.y) * 0.14;

    if (dot.current) {
      dot.current.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px)`;
    }
    if (ring.current) {
      ring.current.style.transform = `translate(${ring0.current.x}px, ${ring0.current.y}px)`;
    }
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Magnetic effect — detect hoverable elements
    const addMag = () => {
      document.querySelectorAll("a, button, [data-cursor='pointer'], .btn-primary, .btn-secondary").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    addMag();
    raf.current = requestAnimationFrame(tick);
    // Re-scan on DOM changes (SPA navigation)
    const obs = new MutationObserver(addMag);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
    };
  }, [tick]);

  if (typeof window === "undefined" || isTouchDevice) return null;

  const dotSize   = hovered ? 6 : 8;
  const ringSize  = hovered ? 44 : 32;
  const ringOpacity = hidden ? 0 : 1;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: dotSize, height: dotSize,
          marginLeft: -dotSize / 2, marginTop: -dotSize / 2,
          borderRadius: "50%",
          background: hovered ? "#E8A045" : "#ffffff",
          boxShadow: hovered ? "0 0 12px #E8A045" : "0 0 6px rgba(255,255,255,0.6)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: hidden ? 0 : 1,
          transition: "width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s, opacity 0.2s",
          willChange: "transform",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: ringSize, height: ringSize,
          marginLeft: -ringSize / 2, marginTop: -ringSize / 2,
          borderRadius: "50%",
          border: `1.5px solid ${hovered ? "#E8A045" : "rgba(107,72,255,0.7)"}`,
          boxShadow: hovered
            ? "0 0 18px rgba(232,160,69,0.5), inset 0 0 10px rgba(232,160,69,0.1)"
            : "0 0 12px rgba(107,72,255,0.35)",
          background: hovered ? "rgba(232,160,69,0.06)" : "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: ringOpacity,
          transform: clicked ? "scale(0.82)" : "scale(1)",
          transition: "width 0.25s, height 0.25s, border-color 0.25s, box-shadow 0.3s, background 0.25s, opacity 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   2.  SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════════ */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 3,
        transformOrigin: "0%",
        scaleX,
        background: "linear-gradient(90deg, #E8A045, #f5c842, #6B48FF)",
        zIndex: 99997,
        boxShadow: "0 0 12px rgba(232,160,69,0.6), 0 0 6px rgba(107,72,255,0.4)",
        borderRadius: "0 2px 2px 0",
      }}
    />
  );
};

/* ══════════════════════════════════════════════════════════════
   3.  PAGE TRANSITION WIPE
   ══════════════════════════════════════════════════════════════ */
export const PageTransition = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + "-transition"}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], originY: ["0%", "0%", "100%", "100%"] }}
        transition={{ duration: 0.7, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(135deg, #050816 0%, #0d0b1e 50%, #050816 100%)",
          zIndex: 99990,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
          transition={{ duration: 0.7, times: [0, 0.35, 0.65, 1] }}
          style={{
            display: "flex", alignItems: "center", gap: "0.6rem",
            fontFamily: "'Poppins', sans-serif", fontWeight: 900,
            fontSize: "1.2rem",
            background: "linear-gradient(120deg, #E8A045, #f5d080, #6B48FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block", WebkitTextFillColor: "#E8A045", fontSize: "1.4rem" }}
          >
            ✦
          </motion.span>
          AG
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════════════════════
   4.  3D FLOATING GEOMETRIC SHAPES
   Pure CSS 3D — zero runtime overhead, infinite loop
   ══════════════════════════════════════════════════════════════ */
export const FloatingShapes = () => {
  const shapes = [
    /* top-left region */
    { top: "8%",  left: "2%",   size: 80,  dur: 22, delay: 0,   shape: "cube",     opacity: 0.12, color: "#6B48FF" },
    { top: "18%", left: "6%",   size: 40,  dur: 18, delay: 4,   shape: "ring",     opacity: 0.18, color: "#E8A045" },
    /* top-right */
    { top: "5%",  right: "3%",  size: 60,  dur: 26, delay: 2,   shape: "pyramid",  opacity: 0.13, color: "#E8A045" },
    { top: "15%", right: "8%",  size: 30,  dur: 14, delay: 7,   shape: "dot",      opacity: 0.20, color: "#6B48FF" },
    /* middle-left */
    { top: "45%", left: "1%",   size: 50,  dur: 20, delay: 5,   shape: "ring",     opacity: 0.10, color: "#6B48FF" },
    { top: "55%", left: "5%",   size: 24,  dur: 12, delay: 1,   shape: "dot",      opacity: 0.15, color: "#E8A045" },
    /* middle-right */
    { top: "40%", right: "2%",  size: 70,  dur: 24, delay: 3,   shape: "cube",     opacity: 0.10, color: "#E8A045" },
    { top: "52%", right: "6%",  size: 35,  dur: 16, delay: 8,   shape: "pyramid",  opacity: 0.14, color: "#6B48FF" },
    /* bottom */
    { top: "80%", left: "4%",   size: 55,  dur: 19, delay: 6,   shape: "ring",     opacity: 0.12, color: "#E8A045" },
    { top: "85%", right: "5%",  size: 45,  dur: 21, delay: 9,   shape: "cube",     opacity: 0.11, color: "#6B48FF" },
    { top: "90%", left: "50%",  size: 28,  dur: 15, delay: 11,  shape: "dot",      opacity: 0.14, color: "#E8A045" },
  ] as const;

  return (
    <div className="floating-shapes-container" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {shapes.map((s, i) => {
        const stylePos: React.CSSProperties = {
          position: "absolute",
          top:   "top"   in s ? s.top   : undefined,
          left:  "left"  in s ? s.left  : undefined,
          right: "right" in s ? s.right : undefined,
        };

        const baseStyle: React.CSSProperties = {
          ...stylePos,
          width:  s.size,
          height: s.size,
          opacity: s.opacity,
          animationName: `float3d-${i % 3}`,
          animationDuration: `${s.dur}s`,
          animationDelay: `${s.delay}s`,
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
          animationFillMode: "both",
          transformStyle: "preserve-3d",
          willChange: "transform",
        };

        if (s.shape === "cube") {
          return (
            <div key={i} style={baseStyle}>
              <div style={{
                width: "100%", height: "100%",
                border: `1.5px solid ${s.color}`,
                borderRadius: 6,
                transform: "rotateX(35deg) rotateY(45deg)",
                boxShadow: `0 0 ${s.size * 0.4}px ${s.color}44`,
                animation: `spinCube ${s.dur * 1.5}s linear infinite`,
              }} />
            </div>
          );
        }

        if (s.shape === "ring") {
          return (
            <div key={i} style={baseStyle}>
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "50%",
                border: `2px solid ${s.color}`,
                boxShadow: `0 0 ${s.size * 0.35}px ${s.color}44, inset 0 0 ${s.size * 0.2}px ${s.color}22`,
                animation: `spinRing ${s.dur}s linear infinite`,
              }} />
            </div>
          );
        }

        if (s.shape === "pyramid") {
          return (
            <div key={i} style={{ ...baseStyle, width: 0, height: 0,
              borderLeft: `${s.size / 2}px solid transparent`,
              borderRight: `${s.size / 2}px solid transparent`,
              borderBottom: `${s.size}px solid ${s.color}`,
              filter: `drop-shadow(0 0 ${s.size * 0.2}px ${s.color})`,
            }} />
          );
        }

        // dot
        return (
          <div key={i} style={{ ...baseStyle, borderRadius: "50%",
            background: `radial-gradient(circle, ${s.color} 0%, ${s.color}00 70%)`,
            filter: `blur(${s.size * 0.15}px)`,
          }} />
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          .floating-shapes-container {
            display: none !important;
          }
        }
        @keyframes float3d-0 {
          0%,100% { transform: translateY(0px) rotateX(0deg) rotateZ(0deg); }
          33%      { transform: translateY(-18px) rotateX(120deg) rotateZ(60deg); }
          66%      { transform: translateY(10px) rotateX(240deg) rotateZ(120deg); }
        }
        @keyframes float3d-1 {
          0%,100% { transform: translateY(0px) rotateY(0deg) rotateX(0deg); }
          40%      { transform: translateY(-24px) rotateY(180deg) rotateX(45deg); }
          70%      { transform: translateY(14px) rotateY(270deg) rotateX(90deg); }
        }
        @keyframes float3d-2 {
          0%,100% { transform: translateY(0px) translateX(0px) rotateZ(0deg); }
          30%      { transform: translateY(-12px) translateX(8px) rotateZ(90deg); }
          60%      { transform: translateY(16px) translateX(-6px) rotateZ(200deg); }
        }
        @keyframes spinCube {
          0%   { transform: rotateX(35deg) rotateY(0deg); }
          100% { transform: rotateX(35deg) rotateY(360deg); }
        }
        @keyframes spinRing {
          0%   { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   DEFAULT EXPORT — mount all four at once
   ══════════════════════════════════════════════════════════════ */
const GlobalEffects = () => (
  <>
    <CustomCursor />
    <ScrollProgressBar />
    <PageTransition />
    <FloatingShapes />
  </>
);

export default GlobalEffects;
