import { motion } from "motion/react";
import { useEffect, useState } from "react";

const hudData = [
  { label: "HASH", value: "SHA-256" },
  { label: "STATUS", value: "VERIFIED" },
  { label: "NODES", value: "2,847" },
  { label: "INTEGRITY", value: "100%" },
];

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const glitched = text
          .split("")
          .map((c) =>
            Math.random() > 0.7
              ? chars[Math.floor(Math.random() * chars.length)]
              : c,
          )
          .join("");
        setDisplay(glitched);
        setTimeout(() => setDisplay(text), 80);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

function CornerBracket({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const size = 20;
  const thickness = 2;
  const color = "rgba(220,38,38,0.8)";

  const styles: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    ...(position === "tl" && {
      top: 0,
      left: 0,
      borderTop: `${thickness}px solid ${color}`,
      borderLeft: `${thickness}px solid ${color}`,
    }),
    ...(position === "tr" && {
      top: 0,
      right: 0,
      borderTop: `${thickness}px solid ${color}`,
      borderRight: `${thickness}px solid ${color}`,
    }),
    ...(position === "bl" && {
      bottom: 0,
      left: 0,
      borderBottom: `${thickness}px solid ${color}`,
      borderLeft: `${thickness}px solid ${color}`,
    }),
    ...(position === "br" && {
      bottom: 0,
      right: 0,
      borderBottom: `${thickness}px solid ${color}`,
      borderRight: `${thickness}px solid ${color}`,
    }),
  };

  return (
    <motion.div
      style={styles}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay:
          position === "tr"
            ? 0.3
            : position === "bl"
              ? 0.6
              : position === "br"
                ? 0.9
                : 0,
      }}
    />
  );
}

export default function HolographicHUD() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {/* Corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Targeting reticle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          style={{
            width: 40,
            height: 40,
            border: "1px solid rgba(220,38,38,0.5)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.7)",
              boxShadow: "0 0 8px rgba(220,38,38,0.8)",
            }}
          />
        </motion.div>
        {/* Cross hairs */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 60,
            height: 1,
            background: "rgba(220,38,38,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1,
            height: 60,
            background: "rgba(220,38,38,0.2)",
          }}
        />
      </div>

      {/* Data readouts — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {hudData.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: "rgba(220,38,38,0.8)",
              letterSpacing: "0.08em",
            }}
          >
            <span style={{ color: "rgba(240,240,240,0.4)", marginRight: 4 }}>
              {d.label}:
            </span>
            <GlitchText text={d.value} />
          </motion.div>
        ))}
      </div>

      {/* Scanning line */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)",
        }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
