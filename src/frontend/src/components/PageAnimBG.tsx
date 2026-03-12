import { motion } from "motion/react";

/**
 * Reusable animated background for all pages.
 * Includes: floating glowing orbs, 3D rotating background, scan line.
 * Usage: Place as first child inside a `position: relative, overflow: hidden` wrapper.
 * Wrap your actual page content in `<div style={{ position: 'relative', zIndex: 1 }}>`.
 */
export default function PageAnimBG() {
  return (
    <>
      {/* 3D rotating wireframe shapes */}

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)",
          animation: "scanLine 6s linear infinite",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Floating orb 1 — red top-left */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)",
          zIndex: 0,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating orb 2 — green bottom-right */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)",
          zIndex: 0,
          filter: "blur(36px)",
          pointerEvents: "none",
        }}
        animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
        transition={{
          duration: 11,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Floating orb 3 — red mid-right */}
      <motion.div
        style={{
          position: "absolute",
          top: "45%",
          right: "18%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)",
          zIndex: 0,
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
    </>
  );
}
