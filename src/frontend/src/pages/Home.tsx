import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Hash,
  Link2,
  Lock,
  Search,
  Shield,
  Upload,
  Users,
} from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import CyberBackground from "../components/CyberBackground";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene";
import { useLang } from "../contexts/LanguageContext";

type LucideIconType = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string; style?: React.CSSProperties }
>;

function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

function PulsingStepCircle({ icon: Icon }: { icon: LucideIconType }) {
  return (
    <div className="relative w-16 h-16 mx-auto mb-4">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "2px solid rgba(220,38,38,0.3)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid rgba(220,38,38,0.15)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(220,38,38,0.1)",
          border: "2px solid rgba(220,38,38,0.4)",
        }}
      >
        <Icon className="w-7 h-7" style={{ color: "#DC2626" }} />
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();

  const stats: {
    label: string;
    value: number;
    suffix: string;
    icon: LucideIconType;
  }[] = [
    { label: t("evidenceSecured"), value: 10000, suffix: "+", icon: Shield },
    { label: t("casesSolved"), value: 2400, suffix: "+", icon: CheckCircle },
    { label: t("agencies"), value: 150, suffix: "+", icon: Building2 },
    { label: t("uptime"), value: 99, suffix: ".9%", icon: Lock },
  ];

  const features: { icon: LucideIconType; title: string; desc: string }[] = [
    {
      icon: Shield,
      title: t("secureStorage"),
      desc: "Immutable evidence storage backed by cryptographic proofs and decentralized blockchain technology.",
    },
    {
      icon: Hash,
      title: t("hashIntegrity"),
      desc: "Every file gets a unique SHA-256 fingerprint computed client-side, stored permanently on-chain.",
    },
    {
      icon: Users,
      title: t("roleAccess"),
      desc: "Granular permissions for Admins, Investigators, and Officers. No unauthorized access.",
    },
    {
      icon: Link2,
      title: t("chainCustody"),
      desc: "Every action is timestamped and logged \u2014 creating an unbreakable chain of custody.",
    },
    {
      icon: CheckCircle,
      title: t("realTimeVerify"),
      desc: "Verify evidence integrity instantly by comparing live-computed hashes with stored records.",
    },
    {
      icon: Building2,
      title: t("multiAgency"),
      desc: "Built for law enforcement, forensic labs, and judicial authorities to collaborate securely.",
    },
  ];

  const steps: {
    num: string;
    title: string;
    desc: string;
    icon: LucideIconType;
  }[] = [
    { num: "01", title: t("step1"), desc: t("step1Desc"), icon: Upload },
    { num: "02", title: t("step2"), desc: t("step2Desc"), icon: Hash },
    { num: "03", title: t("step3"), desc: t("step3Desc"), icon: CheckCircle },
  ];

  const titleWords = t("appName").split(" ");
  const redWords = new Set([
    "Digital",
    "Evidence",
    "\u0821\u093f\u091c\u093f\u091f\u0932",
    "\u0938\u093e\u0915\u094d\u0937\u094d\u092f",
  ]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const statsContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const statCard: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const featureHover = {
    scale: 1.02,
    y: -4,
    boxShadow: "0 0 24px rgba(220,38,38,0.18), 0 8px 32px rgba(0,0,0,0.4)",
    borderColor: "rgba(220,38,38,0.45)",
    transition: { duration: 0.2 },
  };

  return (
    <div style={{ background: "#0a0a0f" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.2)",
            zIndex: 0,
          }}
        />
        {/* Parallax floating orbs */}
        <motion.div
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
            zIndex: 0,
            filter: "blur(40px)",
          }}
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "6%",
            width: 240,
            height: 240,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)",
            zIndex: 0,
            filter: "blur(32px)",
          }}
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{
            duration: 11,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            right: "20%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)",
            zIndex: 0,
            filter: "blur(24px)",
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />

        <div
          className="cyber-grid"
          style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5 }}
        />
        <CyberBackground />
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
          }}
        />

        {/* 3D Three.js Scene \u2014 desktop only, right side */}
        <div
          className="hidden lg:block"
          style={{
            position: "absolute",
            right: "3%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 420,
            height: 420,
            zIndex: 2,
            pointerEvents: "none",
            opacity: 0.85,
          }}
        >
          <ThreeScene />
        </div>

        <div
          className="relative text-center px-4 max-w-5xl mx-auto"
          style={{ zIndex: 3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono"
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.35)",
              color: "#DC2626",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
            />
            SYSTEM ONLINE \u2014 SECURE CONNECTION ESTABLISHED
          </motion.div>

          {/* Word-by-word hero title */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-bold mb-6 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#f0f0f0" }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={word + String(i)}
                variants={wordVariants}
                style={{
                  display: "inline-block",
                  marginRight: "0.3em",
                  color: redWords.has(word) ? "#DC2626" : "#f0f0f0",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.35 + titleWords.length * 0.1,
            }}
            className="text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "rgba(240,240,240,0.65)", lineHeight: 1.7 }}
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + titleWords.length * 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/upload">
              <button
                type="button"
                className="btn-primary flex items-center gap-2 text-base px-6 py-3"
                data-ocid="hero.upload_button"
              >
                <Upload className="w-4 h-4" />
                {t("uploadEvidence")}
              </button>
            </Link>
            <Link to="/verify">
              <button
                type="button"
                className="btn-outline flex items-center gap-2 text-base px-6 py-3"
                data-ocid="hero.verify_button"
              >
                <Search className="w-4 h-4" />
                {t("verifyEvidence")}
              </button>
            </Link>
          </motion.div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, #0a0a0f)",
            zIndex: 2,
          }}
        />
      </section>

      {/* Stats with staggered entrance */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={statsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((s) => {
              const StatIcon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={statCard}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 20px rgba(220,38,38,0.15)",
                    transition: { duration: 0.2 },
                  }}
                  className="glass text-center p-6 cursor-default"
                >
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <StatIcon
                      className="mx-auto mb-3 w-7 h-7"
                      style={{ color: "#DC2626" }}
                    />
                  </motion.div>
                  <div
                    className="font-display font-bold text-3xl mb-1"
                    style={{ color: "#f0f0f0" }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(240,240,240,0.5)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 cyber-grid">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="section-heading text-3xl md:text-4xl mb-4"
              style={{ color: "#f0f0f0" }}
            >
              Core <span style={{ color: "#DC2626" }}>Capabilities</span>
            </h2>
            <p style={{ color: "rgba(240,240,240,0.5)" }}>
              Built to meet the rigorous demands of digital forensics and legal
              proceedings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const FIcon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={featureHover}
                  className="glass p-6"
                  style={{ cursor: "default" }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(220,38,38,0.12)" }}
                    whileHover={{ rotate: 6, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FIcon className="w-5 h-5" style={{ color: "#DC2626" }} />
                  </motion.div>
                  <h3
                    className="font-display font-semibold text-base mb-2"
                    style={{ color: "#f0f0f0" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(240,240,240,0.5)" }}
                  >
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="section-heading text-3xl md:text-4xl mb-4"
              style={{ color: "#f0f0f0" }}
            >
              {t("howItWorks")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(220,38,38,0.4), rgba(220,38,38,0.1))",
                    }}
                  />
                )}
                <PulsingStepCircle icon={s.icon} />
                <div
                  className="font-mono text-xs mb-2"
                  style={{ color: "rgba(220,38,38,0.7)" }}
                >
                  STEP {s.num}
                </div>
                <h3
                  className="font-display font-semibold text-lg mb-2"
                  style={{ color: "#f0f0f0" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(240,240,240,0.5)" }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link to="/upload">
              <button
                type="button"
                className="btn-primary flex items-center gap-2 mx-auto text-base px-8 py-3"
              >
                {t("getStarted")} <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
