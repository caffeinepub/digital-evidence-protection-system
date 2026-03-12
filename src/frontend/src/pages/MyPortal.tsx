import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import RedRotation3DBG from "../components/RedRotation3DBG";
import { useLang } from "../contexts/LanguageContext";

type Role = "investigator" | "officer" | "citizen" | null;

const ROLE_CONFIG = {
  investigator: {
    icon: "🔍",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.4)",
    border: "rgba(59,130,246,0.5)",
    bg: "rgba(59,130,246,0.08)",
    label_en: "Investigator",
    label_hi: "जाँचकर्ता",
    desc_en: "Access case files, evidence & chain of custody",
    desc_hi: "केस फाइलें, साक्ष्य और अभिरक्षा श्रृंखला",
    idLabel_en: "Investigator ID",
    idLabel_hi: "जाँचकर्ता आईडी",
    idPlaceholder: "e.g. INV-2024-001",
    redirectTo: "/investigator",
  },
  officer: {
    icon: "👮",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    border: "rgba(245,158,11,0.5)",
    bg: "rgba(245,158,11,0.08)",
    label_en: "Field Officer",
    label_hi: "फील्ड अधिकारी",
    desc_en: "Submit evidence, manage assignments & field notes",
    desc_hi: "साक्ष्य जमा करें, असाइनमेंट और फील्ड नोट्स",
    idLabel_en: "Officer ID",
    idLabel_hi: "अधिकारी आईडी",
    idPlaceholder: "e.g. OFF-2024-001",
    redirectTo: "/officer",
  },
  citizen: {
    icon: "🧑‍💼",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    border: "rgba(16,185,129,0.5)",
    bg: "rgba(16,185,129,0.08)",
    label_en: "Citizen",
    label_hi: "नागरिक",
    desc_en: "File complaints, track cases & verify evidence",
    desc_hi: "शिकायत दर्ज करें, केस ट्रैक करें और साक्ष्य सत्यापित करें",
    idLabel_en: "Citizen ID",
    idLabel_hi: "नागरिक आईडी",
    idPlaceholder: "e.g. CIT-2024-001",
    redirectTo: "/user-portal",
  },
};

export default function MyPortal() {
  const { lang } = useLang();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState<{
    role: Role;
    name: string;
    id: string;
  } | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 80);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) return;
    const trimmedId = userId.trim();
    if (!trimmedId || !password) {
      setError(
        lang === "hi"
          ? "कृपया आईडी और पासवर्ड दर्ज करें।"
          : "Please enter ID and password.",
      );
      return;
    }
    // Accept any ID and password — use entered ID as display name
    setError("");
    setLoggedIn({ role: selectedRole, name: trimmedId, id: trimmedId });
  }

  function handleBack() {
    setSelectedRole(null);
    setUserId("");
    setPassword("");
    setError("");
    setLoggedIn(null);
  }

  const cfg = selectedRole ? ROLE_CONFIG[selectedRole] : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        position: "relative",
      }}
    >
      <RedRotation3DBG />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          margin: "0 auto",
          padding: "60px 16px 80px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(220,38,38,0.12)",
              border: "1px solid rgba(220,38,38,0.4)",
              color: "#DC2626",
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: 4,
              padding: "4px 16px",
              borderRadius: 4,
              marginBottom: 18,
            }}
          >
            {lang === "hi" ? "पोर्टल एक्सेस" : "PORTAL ACCESS"}
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-1px",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            {lang === "hi" ? "मेरा पोर्टल" : "My Portal"}
          </h1>
          <p
            style={{
              color: "rgba(240,240,240,0.55)",
              fontSize: 15,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            {lang === "hi"
              ? "अपनी भूमिका चुनें और अपनी आईडी से लॉगिन करें"
              : "Select your role and login with your credentials"}
          </p>
        </div>

        {/* Step 1: Role Selection */}
        {!selectedRole && !loggedIn && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {(Object.keys(ROLE_CONFIG) as Array<keyof typeof ROLE_CONFIG>).map(
              (role) => {
                const rc = ROLE_CONFIG[role];
                return (
                  <button
                    key={role}
                    type="button"
                    data-ocid={`portal.${role}.card`}
                    onClick={() => setSelectedRole(role)}
                    style={{
                      background: rc.bg,
                      border: `1.5px solid ${rc.border}`,
                      borderRadius: 16,
                      padding: "32px 24px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.25s",
                      backdropFilter: "blur(10px)",
                      boxShadow: `0 0 0 0 ${rc.glow}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-4px) scale(1.02)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        `0 0 28px 4px ${rc.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        `0 0 0 0 ${rc.glow}`;
                    }}
                  >
                    <div style={{ fontSize: 42, marginBottom: 14 }}>
                      {rc.icon}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 20,
                        color: rc.color,
                        marginBottom: 8,
                        letterSpacing: 0.5,
                      }}
                    >
                      {lang === "hi" ? rc.label_hi : rc.label_en}
                    </div>
                    <div
                      style={{
                        color: "rgba(240,240,240,0.6)",
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {lang === "hi" ? rc.desc_hi : rc.desc_en}
                    </div>
                    <div
                      style={{
                        marginTop: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: rc.color,
                        fontSize: 12,
                        fontFamily: "monospace",
                        fontWeight: 600,
                      }}
                    >
                      {lang === "hi" ? "लॉगिन करें →" : "LOGIN →"}
                    </div>
                  </button>
                );
              },
            )}
          </div>
        )}

        {/* Step 2: Login Form */}
        {selectedRole && !loggedIn && cfg && (
          <div
            style={{
              maxWidth: 440,
              margin: "0 auto",
              background: cfg.bg,
              border: `1.5px solid ${cfg.border}`,
              borderRadius: 20,
              padding: "36px 32px",
              backdropFilter: "blur(16px)",
              boxShadow: `0 0 40px ${cfg.glow}`,
              animation: "fadeSlideUp 0.4s ease",
            }}
          >
            <style>
              {
                "@keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:none; } }"
              }
            </style>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <span style={{ fontSize: 32 }}>{cfg.icon}</span>
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: 18, color: cfg.color }}
                >
                  {lang === "hi" ? cfg.label_hi : cfg.label_en}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(240,240,240,0.5)",
                    fontFamily: "monospace",
                  }}
                >
                  {lang === "hi" ? "लॉगिन" : "SECURE LOGIN"}
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <label style={{ display: "block", marginBottom: 16 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(240,240,240,0.6)",
                    fontFamily: "monospace",
                    letterSpacing: 1,
                  }}
                >
                  {lang === "hi" ? cfg.idLabel_hi : cfg.idLabel_en}
                </span>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder={cfg.idPlaceholder}
                  required
                  data-ocid="portal.login.input"
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 6,
                    padding: "10px 14px",
                    background: "rgba(0,0,0,0.4)",
                    border: `1px solid ${cfg.border}`,
                    borderRadius: 8,
                    color: "#f0f0f0",
                    fontSize: 14,
                    fontFamily: "monospace",
                    outline: "none",
                  }}
                />
              </label>
              <label style={{ display: "block", marginBottom: 20 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(240,240,240,0.6)",
                    fontFamily: "monospace",
                    letterSpacing: 1,
                  }}
                >
                  {lang === "hi" ? "पासवर्ड" : "PASSWORD"}
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={lang === "hi" ? "पासवर्ड डालें" : "Enter password"}
                  required
                  data-ocid="portal.password.input"
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 6,
                    padding: "10px 14px",
                    background: "rgba(0,0,0,0.4)",
                    border: `1px solid ${cfg.border}`,
                    borderRadius: 8,
                    color: "#f0f0f0",
                    fontSize: 14,
                    fontFamily: "monospace",
                    outline: "none",
                  }}
                />
              </label>

              {error && (
                <div
                  data-ocid="portal.login.error_state"
                  style={{
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.4)",
                    color: "#f87171",
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                data-ocid="portal.login.submit_button"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: cfg.color,
                  color: "#000",
                  fontWeight: 700,
                  fontSize: 14,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  letterSpacing: 1,
                  fontFamily: "monospace",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                {lang === "hi" ? "लॉगिन करें" : "LOGIN"}
              </button>
            </form>

            <button
              type="button"
              data-ocid="portal.back.button"
              onClick={handleBack}
              style={{
                marginTop: 20,
                background: "transparent",
                border: "none",
                color: "rgba(240,240,240,0.4)",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "monospace",
                width: "100%",
                textAlign: "center",
              }}
            >
              ← {lang === "hi" ? "वापस जाएं" : "Back to role selection"}
            </button>
          </div>
        )}

        {/* Step 3: Logged In — Show role-specific data */}
        {loggedIn && cfg && selectedRole && (
          <div style={{ animation: "fadeSlideUp 0.5s ease" }}>
            <style>
              {
                "@keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:none; } }"
              }
            </style>
            {/* Welcome banner */}
            <div
              style={{
                maxWidth: 640,
                margin: "0 auto 36px",
                background: cfg.bg,
                border: `1.5px solid ${cfg.border}`,
                borderRadius: 16,
                padding: "24px 28px",
                backdropFilter: "blur(12px)",
                boxShadow: `0 0 30px ${cfg.glow}`,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 40 }}>{cfg.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(240,240,240,0.5)",
                    fontFamily: "monospace",
                    marginBottom: 4,
                  }}
                >
                  {lang === "hi" ? "स्वागत है" : "WELCOME"}
                </div>
                <div
                  style={{ fontSize: 20, fontWeight: 700, color: "#f0f0f0" }}
                >
                  {loggedIn.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: cfg.color,
                    fontFamily: "monospace",
                    marginTop: 2,
                  }}
                >
                  {loggedIn.id} · {lang === "hi" ? cfg.label_hi : cfg.label_en}
                </div>
              </div>
              <div
                style={{
                  background: cfg.color,
                  color: "#000",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  animation: "pulse 2s infinite",
                }}
              >
                {lang === "hi" ? "सक्रिय" : "ACTIVE"}
              </div>
            </div>

            {/* Role-specific data */}
            <RoleDashboardPreview role={selectedRole} lang={lang} cfg={cfg} />

            {/* CTA to full dashboard */}
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Link
                to={
                  cfg.redirectTo as
                    | "/investigator"
                    | "/officer"
                    | "/user-portal"
                }
                data-ocid="portal.dashboard.link"
                style={{
                  display: "inline-block",
                  background: cfg.color,
                  color: "#000",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "13px 36px",
                  borderRadius: 8,
                  textDecoration: "none",
                  letterSpacing: 1,
                  fontFamily: "monospace",
                  boxShadow: `0 0 20px ${cfg.glow}`,
                  transition: "opacity 0.2s",
                }}
              >
                {lang === "hi" ? "पूरा डैशबोर्ड खोलें →" : "OPEN FULL DASHBOARD →"}
              </Link>
              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  data-ocid="portal.logout.button"
                  onClick={handleBack}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(240,240,240,0.4)",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "monospace",
                  }}
                >
                  {lang === "hi" ? "लॉगआउट करें" : "Logout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Role-specific preview data component
function RoleDashboardPreview({
  role,
  lang,
  cfg,
}: {
  role: NonNullable<Role>;
  lang: string;
  cfg: (typeof ROLE_CONFIG)[keyof typeof ROLE_CONFIG];
}) {
  if (role === "investigator") {
    const cases = [
      {
        id: "DEPS-2024-0051",
        title:
          lang === "hi"
            ? "फिशिंग अटैक - बैंक फ्रॉड"
            : "Phishing Attack - Bank Fraud",
        status: lang === "hi" ? "सक्रिय" : "ACTIVE",
        priority: lang === "hi" ? "उच्च" : "HIGH",
        evidence: 4,
        date: "12 Jan 2025",
      },
      {
        id: "DEPS-2024-0048",
        title:
          lang === "hi"
            ? "पहचान चोरी - सोशल मीडिया"
            : "Identity Theft - Social Media",
        status: lang === "hi" ? "समीक्षाधीन" : "REVIEW",
        priority: lang === "hi" ? "मध्यम" : "MED",
        evidence: 7,
        date: "09 Jan 2025",
      },
      {
        id: "DEPS-2024-0044",
        title: lang === "hi" ? "रैनसमवेयर - कॉर्पोरेट" : "Ransomware - Corporate",
        status: lang === "hi" ? "लंबित" : "PENDING",
        priority: lang === "hi" ? "उच्च" : "HIGH",
        evidence: 12,
        date: "05 Jan 2025",
      },
    ];
    const stats = [
      { label: lang === "hi" ? "सक्रिय मामले" : "Active Cases", value: "7" },
      { label: lang === "hi" ? "साक्ष्य आइटम" : "Evidence Items", value: "34" },
      { label: lang === "hi" ? "समीक्षा लंबित" : "Pending Review", value: "3" },
      { label: lang === "hi" ? "हल किए" : "Resolved", value: "21" },
    ];
    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <StatGrid stats={stats} color={cfg.color} />
        <SectionTitle
          color={cfg.color}
          title={lang === "hi" ? "मेरे असाइन केस" : "MY ASSIGNED CASES"}
        />
        {cases.map((c, i) => (
          <div
            key={c.id}
            data-ocid={`portal.case.item.${i + 1}`}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${cfg.border}`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f0f0" }}>
                {c.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(240,240,240,0.45)",
                  fontFamily: "monospace",
                  marginTop: 4,
                }}
              >
                {c.id} · {c.date}
              </div>
            </div>
            <Badge
              label={c.priority}
              color={
                c.priority === (lang === "hi" ? "उच्च" : "HIGH")
                  ? "#DC2626"
                  : "#f59e0b"
              }
            />
            <Badge label={c.status} color={cfg.color} />
            <div
              style={{
                fontSize: 11,
                color: "rgba(240,240,240,0.45)",
                textAlign: "right",
                minWidth: 60,
              }}
            >
              {c.evidence} {lang === "hi" ? "साक्ष्य" : "evidence"}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (role === "officer") {
    const submissions = [
      {
        id: "EV-2024-0219",
        type: lang === "hi" ? "स्क्रीनशॉट" : "Screenshot",
        case: "DEPS-2024-0051",
        status: lang === "hi" ? "सत्यापित" : "VERIFIED",
        date: "11 Jan 2025",
      },
      {
        id: "EV-2024-0215",
        type: lang === "hi" ? "ऑडियो रिकॉर्डिंग" : "Audio Recording",
        case: "DEPS-2024-0049",
        status: lang === "hi" ? "समीक्षाधीन" : "REVIEW",
        date: "08 Jan 2025",
      },
      {
        id: "EV-2024-0208",
        type: lang === "hi" ? "दस्तावेज़" : "Document",
        case: "DEPS-2024-0044",
        status: lang === "hi" ? "लंबित" : "PENDING",
        date: "05 Jan 2025",
      },
    ];
    const assignedCases = [
      {
        id: "DEPS-2024-0051",
        area:
          lang === "hi" ? "साइबर क्राइम यूनिट, दिल्ली" : "Cyber Crime Unit, Delhi",
        status: lang === "hi" ? "सक्रिय" : "ACTIVE",
        due: "20 Jan",
      },
      {
        id: "DEPS-2024-0049",
        area: lang === "hi" ? "फ्रॉड विभाग, मुंबई" : "Fraud Dept, Mumbai",
        status: lang === "hi" ? "जाँच जारी" : "INVESTIGATING",
        due: "18 Jan",
      },
    ];
    const stats = [
      { label: lang === "hi" ? "मेरे सबमिशन" : "My Submissions", value: "12" },
      { label: lang === "hi" ? "असाइन केस" : "Assigned Cases", value: "5" },
      { label: lang === "hi" ? "समीक्षा लंबित" : "Pending Review", value: "2" },
      { label: lang === "hi" ? "पूर्ण" : "Completed", value: "8" },
    ];
    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <StatGrid stats={stats} color={cfg.color} />
        <SectionTitle
          color={cfg.color}
          title={lang === "hi" ? "मेरे साक्ष्य सबमिशन" : "MY EVIDENCE SUBMISSIONS"}
        />
        {submissions.map((s, i) => (
          <div
            key={s.id}
            data-ocid={`portal.submission.item.${i + 1}`}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${cfg.border}`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f0f0" }}>
                {s.type}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(240,240,240,0.45)",
                  fontFamily: "monospace",
                  marginTop: 4,
                }}
              >
                {s.id} · {s.case} · {s.date}
              </div>
            </div>
            <Badge
              label={s.status}
              color={
                s.status === (lang === "hi" ? "सत्यापित" : "VERIFIED")
                  ? "#10b981"
                  : s.status === (lang === "hi" ? "लंबित" : "PENDING")
                    ? "#f59e0b"
                    : cfg.color
              }
            />
          </div>
        ))}
        <SectionTitle
          color={cfg.color}
          title={lang === "hi" ? "असाइन किए गए केस" : "ASSIGNED CASES"}
        />
        {assignedCases.map((ac, i) => (
          <div
            key={ac.id}
            data-ocid={`portal.assigned.item.${i + 1}`}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${cfg.border}`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f0f0" }}>
                {ac.id}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(240,240,240,0.45)",
                  fontFamily: "monospace",
                  marginTop: 4,
                }}
              >
                {ac.area}
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(240,240,240,0.4)",
                fontFamily: "monospace",
              }}
            >
              {lang === "hi" ? "देय" : "Due"}: {ac.due}
            </div>
            <Badge label={ac.status} color={cfg.color} />
          </div>
        ))}
      </div>
    );
  }

  // Citizen
  const complaints = [
    {
      id: "DEPS-2025-0003",
      type: lang === "hi" ? "ऑनलाइन शॉपिंग स्कैम" : "Online Shopping Scam",
      status: lang === "hi" ? "जाँच जारी" : "INVESTIGATING",
      officer: "S. Kumar",
      date: "10 Jan 2025",
    },
    {
      id: "DEPS-2024-0089",
      type: lang === "hi" ? "वित्तीय धोखाधड़ी" : "Financial Fraud",
      status: lang === "hi" ? "हल हुआ" : "RESOLVED",
      officer: "P. Sharma",
      date: "20 Nov 2024",
    },
  ];
  const stats = [
    { label: lang === "hi" ? "दर्ज शिकायतें" : "Complaints Filed", value: "2" },
    { label: lang === "hi" ? "जाँच जारी" : "Under Investigation", value: "1" },
    { label: lang === "hi" ? "हल हुए" : "Resolved", value: "1" },
    { label: lang === "hi" ? "साक्ष्य जमा" : "Evidence Submitted", value: "3" },
  ];
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <StatGrid stats={stats} color={cfg.color} />
      <SectionTitle
        color={cfg.color}
        title={lang === "hi" ? "मेरी शिकायतें" : "MY COMPLAINTS"}
      />
      {complaints.map((c, i) => (
        <div
          key={c.id}
          data-ocid={`portal.complaint.item.${i + 1}`}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${cfg.border}`,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f0f0" }}>
              {c.type}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(240,240,240,0.45)",
                fontFamily: "monospace",
                marginTop: 4,
              }}
            >
              {c.id} · {lang === "hi" ? "अधिकारी" : "Officer"}: {c.officer} ·{" "}
              {c.date}
            </div>
          </div>
          <Badge
            label={c.status}
            color={
              c.status === (lang === "hi" ? "हल हुआ" : "RESOLVED")
                ? "#10b981"
                : cfg.color
            }
          />
        </div>
      ))}
    </div>
  );
}

function StatGrid({
  stats,
  color,
}: { stats: { label: string; value: string }[]; color: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 12,
        marginBottom: 28,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "16px 14px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color,
              fontFamily: "monospace",
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(240,240,240,0.5)",
              marginTop: 4,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontFamily: "monospace",
        letterSpacing: 2,
        color,
        marginBottom: 12,
        paddingLeft: 2,
      }}
    >
      {title}
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        background: `${color}22`,
        border: `1px solid ${color}55`,
        color,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        fontFamily: "monospace",
        letterSpacing: 0.5,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
