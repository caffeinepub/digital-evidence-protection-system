import { Hash, Link2, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLang } from "../contexts/LanguageContext";

interface Panel {
  id: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  title: string;
  subtitle: string;
  desc: string;
  glowColor: string;
  textColor: string;
  bgGlow: string;
}

export default function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { lang } = useLang();

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const panels: Panel[] = [
    {
      id: "panel-1",
      icon: Shield,
      title: lang === "hi" ? "साक्ष्य" : "Evidence",
      subtitle: lang === "hi" ? "सुरक्षित" : "SECURED",
      desc:
        lang === "hi"
          ? "हर डिजिटल साक्ष्य को एन्क्रिप्ट, टाइमस्टैम्प और अपरिवर्तनीय क्रिप्टोग्राफिक प्रमाण से सील किया जाता है। कोई छेड़छाड़ नहीं। कोई संदेह नहीं। सदा के लिए सुरक्षित।"
          : "Every digital artifact is encrypted, timestamped, and sealed with immutable cryptographic proof. No tampering. No doubt. Forever preserved on-chain.",
      glowColor: "rgba(220,38,38,0.6)",
      textColor: "#DC2626",
      bgGlow:
        "radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, transparent 70%)",
    },
    {
      id: "panel-2",
      icon: Hash,
      title: lang === "hi" ? "हैश" : "Hash",
      subtitle: lang === "hi" ? "सत्यापित" : "VERIFIED",
      desc:
        lang === "hi"
          ? "SHA-256 फिंगरप्रिंट क्लाइंट-साइड पर कंप्यूट किए जाते हैं और स्थायी रूप से लॉक होते हैं। कोई भी बाइट-स्तरीय बदलाव तुरंत पकड़ा जाता है — अखंडता जो न्यायिक जांच में भी खरी उतरती है।"
          : "SHA-256 fingerprints computed client-side and locked permanently. Any byte-level modification is instantly detectable — integrity that withstands judicial scrutiny.",
      glowColor: "rgba(22,163,74,0.6)",
      textColor: "#16A34A",
      bgGlow:
        "radial-gradient(ellipse at center, rgba(22,163,74,0.12) 0%, transparent 70%)",
    },
    {
      id: "panel-3",
      icon: Link2,
      title: lang === "hi" ? "श्रृंखला" : "Chain",
      subtitle: lang === "hi" ? "लॉक्ड" : "LOCKED",
      desc:
        lang === "hi"
          ? "अटूट अभिरक्षा श्रृंखला। हर ट्रांसफर, एक्सेस और बदलाव — कब, किसने और क्यों — सब दर्ज। साक्ष्य संग्रह से कोर्टरूम तक पूर्ण ऑडिट ट्रेल।"
          : "An unbreakable chain of custody. Every transfer, access, and modification recorded with who, when, and why. Complete audit trail from evidence collection to courtroom.",
      glowColor: "rgba(59,130,246,0.6)",
      textColor: "#3B82F6",
      bgGlow:
        "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)",
    },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "300vh",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#06060b",
        }}
      >
        {/* Parallax background */}
        <motion.div
          style={{
            position: "absolute",
            inset: "-20% 0",
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(22,163,74,0.04) 0%, transparent 50%)",
            translateY: parallaxY,
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        {/* Section label */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "rgba(220,38,38,0.6)",
            zIndex: 20,
          }}
        >
          {lang === "hi"
            ? "▶ डिजिटल साक्ष्य जीवनचक्र"
            : "▶ SCROLLYTELLING — DIGITAL EVIDENCE LIFECYCLE"}
        </div>

        {/* Progress beam */}
        <ScrollProgressBeam scrollYProgress={scrollYProgress} />

        {/* Panels */}
        <ScrollPanels scrollYProgress={scrollYProgress} panels={panels} />
      </div>
    </div>
  );
}

function ScrollProgressBeam({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      style={{
        position: "absolute",
        right: 40,
        top: 0,
        bottom: 0,
        width: 2,
        background: "rgba(240,240,240,0.05)",
        zIndex: 10,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, #DC2626, #16A34A, #3B82F6)",
          scaleY,
          transformOrigin: "top",
          filter: "blur(1px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: dotTop,
          x: "-50%",
          y: "-50%",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#DC2626",
          boxShadow:
            "0 0 12px rgba(220,38,38,0.8), 0 0 24px rgba(220,38,38,0.4)",
        }}
      />
    </div>
  );
}

function ScrollPanels({
  scrollYProgress,
  panels,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  panels: Panel[];
}) {
  const p1Opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.28, 0.33],
    [1, 1, 1, 0],
  );
  const p1Y = useTransform(scrollYProgress, [0.28, 0.4], ["0%", "-15%"]);
  const p1Scale = useTransform(scrollYProgress, [0.28, 0.4], [1, 0.93]);

  const p2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.61, 0.68],
    [0, 1, 1, 0],
  );
  const p2Y = useTransform(
    scrollYProgress,
    [0.28, 0.38, 0.61, 0.68],
    ["15%", "0%", "0%", "-15%"],
  );

  const p3Opacity = useTransform(scrollYProgress, [0.61, 0.72, 1], [0, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.61, 0.72], ["15%", "0%"]);

  const panelMotions = [
    { panel: panels[0], opacity: p1Opacity, y: p1Y, scale: p1Scale },
    { panel: panels[1], opacity: p2Opacity, y: p2Y, scale: undefined },
    { panel: panels[2], opacity: p3Opacity, y: p3Y, scale: undefined },
  ];

  return (
    <>
      {panelMotions.map(({ panel, opacity, y, scale }) => {
        const PIcon = panel.icon;
        const colorR =
          panel.textColor === "#DC2626"
            ? "220,38,38"
            : panel.textColor === "#16A34A"
              ? "22,163,74"
              : "59,130,246";
        return (
          <motion.div
            key={panel.id}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity,
              y,
              scale,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: panel.bgGlow,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                maxWidth: 700,
                padding: "0 2rem",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: `rgba(${colorR}, 0.12)`,
                  border: `2px solid ${panel.glowColor}`,
                  boxShadow: `0 0 40px ${panel.glowColor}, 0 0 80px ${panel.glowColor.replace("0.6", "0.2")}`,
                  marginBottom: 32,
                }}
              >
                <PIcon
                  className="w-12 h-12"
                  style={{
                    color: panel.textColor,
                    filter: `drop-shadow(0 0 12px ${panel.glowColor})`,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#f0f0f0",
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                {panel.title}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(1rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: panel.textColor,
                  letterSpacing: "0.25em",
                  marginBottom: 24,
                  textShadow: `0 0 20px ${panel.glowColor}`,
                }}
              >
                {panel.subtitle}
              </div>
              <p
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                  color: "rgba(240,240,240,0.65)",
                  lineHeight: 1.8,
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                {panel.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 40,
                }}
              >
                {panels.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      width: p.id === panel.id ? 32 : 8,
                      height: 8,
                      borderRadius: 4,
                      background:
                        p.id === panel.id
                          ? panel.textColor
                          : "rgba(240,240,240,0.2)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
