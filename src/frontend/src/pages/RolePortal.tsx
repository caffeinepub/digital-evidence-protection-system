import { useNavigate } from "@tanstack/react-router";
import { BadgeCheck, User, UserSearch } from "lucide-react";
import { motion } from "motion/react";
import PageAnimBG from "../components/PageAnimBG";
import { useLang } from "../contexts/LanguageContext";

const roles = [
  {
    icon: UserSearch,
    title: "INVESTIGATOR",
    subtitle: "Full Case Management",
    color: "#DC2626",
    glowColor: "rgba(220,38,38,0.4)",
    features: [
      "Full case management & control",
      "Evidence chain-of-custody",
      "Analytics & reporting",
    ],
    to: "/investigator",
    ocid: "role.investigator_button",
    badge: "RESTRICTED",
  },
  {
    icon: BadgeCheck,
    title: "OFFICER",
    subtitle: "Field Operations",
    color: "#D97706",
    glowColor: "rgba(217,119,6,0.4)",
    features: [
      "Field reports & submissions",
      "Assigned cases overview",
      "Mission tracking",
    ],
    to: "/officer",
    ocid: "role.officer_button",
    badge: "FIELD ACCESS",
  },
  {
    icon: User,
    title: "CITIZEN",
    subtitle: "Public Portal",
    color: "#3B82F6",
    glowColor: "rgba(59,130,246,0.4)",
    features: [
      "Submit complaint & evidence",
      "Track your case status",
      "Verify evidence integrity",
    ],
    to: "/user-portal",
    ocid: "role.user_button",
    badge: "PUBLIC",
  },
];

const words = "CHOOSE YOUR PORTAL".split(" ");

export default function RolePortal() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0a0a0f",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      <PageAnimBG />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Scan-line overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -12, 0] }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            bottom: "10%",
            right: "6%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1100,
          }}
        >
          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "rgba(220,38,38,0.7)",
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              {t("myPortal")}
            </motion.p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "clamp(28px, 5vw, 52px)",
                    fontWeight: 900,
                    color: "#f0f0f0",
                    letterSpacing: "0.05em",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                color: "rgba(240,240,240,0.5)",
                fontSize: 15,
                fontFamily: "'General Sans', sans-serif",
              }}
            >
              Select your access level to proceed to the appropriate dashboard
            </motion.p>
          </div>

          {/* Role Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {roles.map((role, i) => (
              <RoleCard
                key={role.title}
                role={role}
                index={i}
                onNavigate={() => navigate({ to: role.to })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  role,
  index,
  onNavigate,
}: {
  role: (typeof roles)[0];
  index: number;
  onNavigate: () => void;
}) {
  const Icon = role.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "36px 28px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
        transition: "box-shadow 0.3s ease",
      }}
      onHoverStart={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 40px ${role.glowColor}, 0 0 80px ${role.glowColor.replace("0.4", "0.15")}`;
        (e.currentTarget as HTMLElement).style.border =
          `1px solid ${role.color}50`;
      }}
      onHoverEnd={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.border =
          "1px solid rgba(255,255,255,0.08)";
      }}
      onClick={onNavigate}
      data-ocid={role.ocid}
    >
      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "3px 10px",
          borderRadius: 20,
          fontSize: 9,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          letterSpacing: "0.15em",
          background: `${role.color}18`,
          border: `1px solid ${role.color}40`,
          color: role.color,
        }}
      >
        {role.badge}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${role.color}15`,
          border: `2px solid ${role.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Icon style={{ color: role.color, width: 30, height: 30 }} />
      </div>

      <h3
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          color: "#f0f0f0",
          marginBottom: 4,
          letterSpacing: "0.04em",
        }}
      >
        {role.title}
      </h3>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: role.color,
          marginBottom: 20,
          letterSpacing: "0.1em",
        }}
      >
        {role.subtitle}
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
        {role.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
              fontSize: 13,
              color: "rgba(240,240,240,0.65)",
              fontFamily: "'General Sans', sans-serif",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: role.color,
                flexShrink: 0,
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: 10,
          background: `${role.color}18`,
          border: `1px solid ${role.color}50`,
          color: role.color,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        ENTER PORTAL →
      </motion.button>
    </motion.div>
  );
}
