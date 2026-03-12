import { x as useLang, h as reactExports, o as jsxRuntimeExports, R as RedRotation3DBG, L as Link } from "./index-BTordXxQ.js";
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
    redirectTo: "/investigator"
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
    redirectTo: "/officer"
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
    redirectTo: "/user-portal"
  }
};
function MyPortal() {
  const { lang } = useLang();
  const [selectedRole, setSelectedRole] = reactExports.useState(null);
  const [userId, setUserId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loggedIn, setLoggedIn] = reactExports.useState(null);
  const [fadeIn, setFadeIn] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setTimeout(() => setFadeIn(true), 80);
  }, []);
  function handleLogin(e) {
    e.preventDefault();
    if (!selectedRole) return;
    const trimmedId = userId.trim();
    if (!trimmedId || !password) {
      setError(
        lang === "hi" ? "कृपया आईडी और पासवर्ड दर्ज करें।" : "Please enter ID and password."
      );
      return;
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "#0a0a0f",
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RedRotation3DBG, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "relative",
              zIndex: 1,
              maxWidth: 900,
              margin: "0 auto",
              padding: "60px 16px 80px",
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 0.6s ease"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "inline-block",
                      background: "rgba(220,38,38,0.12)",
                      border: "1px solid rgba(220,38,38,0.4)",
                      color: "#DC2626",
                      fontFamily: "monospace",
                      fontSize: 11,
                      letterSpacing: 4,
                      padding: "4px 16px",
                      borderRadius: 4,
                      marginBottom: 18
                    },
                    children: lang === "hi" ? "पोर्टल एक्सेस" : "PORTAL ACCESS"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    style: {
                      fontSize: "clamp(2rem, 5vw, 3.2rem)",
                      fontWeight: 800,
                      color: "#f0f0f0",
                      letterSpacing: "-1px",
                      marginBottom: 12,
                      lineHeight: 1.15
                    },
                    children: lang === "hi" ? "मेरा पोर्टल" : "My Portal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "rgba(240,240,240,0.55)",
                      fontSize: 15,
                      maxWidth: 480,
                      margin: "0 auto"
                    },
                    children: lang === "hi" ? "अपनी भूमिका चुनें और अपनी आईडी से लॉगिन करें" : "Select your role and login with your credentials"
                  }
                )
              ] }),
              !selectedRole && !loggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 20
                  },
                  children: Object.keys(ROLE_CONFIG).map(
                    (role) => {
                      const rc = ROLE_CONFIG[role];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `portal.${role}.card`,
                          onClick: () => setSelectedRole(role),
                          style: {
                            background: rc.bg,
                            border: `1.5px solid ${rc.border}`,
                            borderRadius: 16,
                            padding: "32px 24px",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "all 0.25s",
                            backdropFilter: "blur(10px)",
                            boxShadow: `0 0 0 0 ${rc.glow}`
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                            e.currentTarget.style.boxShadow = `0 0 28px 4px ${rc.glow}`;
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.transform = "";
                            e.currentTarget.style.boxShadow = `0 0 0 0 ${rc.glow}`;
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 42, marginBottom: 14 }, children: rc.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontWeight: 700,
                                  fontSize: 20,
                                  color: rc.color,
                                  marginBottom: 8,
                                  letterSpacing: 0.5
                                },
                                children: lang === "hi" ? rc.label_hi : rc.label_en
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  color: "rgba(240,240,240,0.6)",
                                  fontSize: 13,
                                  lineHeight: 1.5
                                },
                                children: lang === "hi" ? rc.desc_hi : rc.desc_en
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  marginTop: 20,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  color: rc.color,
                                  fontSize: 12,
                                  fontFamily: "monospace",
                                  fontWeight: 600
                                },
                                children: lang === "hi" ? "लॉगिन करें →" : "LOGIN →"
                              }
                            )
                          ]
                        },
                        role
                      );
                    }
                  )
                }
              ),
              selectedRole && !loggedIn && cfg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    maxWidth: 440,
                    margin: "0 auto",
                    background: cfg.bg,
                    border: `1.5px solid ${cfg.border}`,
                    borderRadius: 20,
                    padding: "36px 32px",
                    backdropFilter: "blur(16px)",
                    boxShadow: `0 0 40px ${cfg.glow}`,
                    animation: "fadeSlideUp 0.4s ease"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: "@keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:none; } }" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 28
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 32 }, children: cfg.icon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: { fontWeight: 700, fontSize: 18, color: cfg.color },
                                children: lang === "hi" ? cfg.label_hi : cfg.label_en
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontSize: 12,
                                  color: "rgba(240,240,240,0.5)",
                                  fontFamily: "monospace"
                                },
                                children: lang === "hi" ? "लॉगिन" : "SECURE LOGIN"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "block", marginBottom: 16 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontSize: 12,
                              color: "rgba(240,240,240,0.6)",
                              fontFamily: "monospace",
                              letterSpacing: 1
                            },
                            children: lang === "hi" ? cfg.idLabel_hi : cfg.idLabel_en
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "text",
                            value: userId,
                            onChange: (e) => setUserId(e.target.value),
                            placeholder: cfg.idPlaceholder,
                            required: true,
                            "data-ocid": "portal.login.input",
                            style: {
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
                              outline: "none"
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "block", marginBottom: 20 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontSize: 12,
                              color: "rgba(240,240,240,0.6)",
                              fontFamily: "monospace",
                              letterSpacing: 1
                            },
                            children: lang === "hi" ? "पासवर्ड" : "PASSWORD"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: lang === "hi" ? "पासवर्ड डालें" : "Enter password",
                            required: true,
                            "data-ocid": "portal.password.input",
                            style: {
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
                              outline: "none"
                            }
                          }
                        )
                      ] }),
                      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "data-ocid": "portal.login.error_state",
                          style: {
                            background: "rgba(220,38,38,0.1)",
                            border: "1px solid rgba(220,38,38,0.4)",
                            color: "#f87171",
                            padding: "10px 14px",
                            borderRadius: 8,
                            fontSize: 13,
                            marginBottom: 16
                          },
                          children: error
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          "data-ocid": "portal.login.submit_button",
                          style: {
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
                            transition: "opacity 0.2s"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.opacity = "0.85";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.opacity = "1";
                          },
                          children: lang === "hi" ? "लॉगिन करें" : "LOGIN"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "portal.back.button",
                        onClick: handleBack,
                        style: {
                          marginTop: 20,
                          background: "transparent",
                          border: "none",
                          color: "rgba(240,240,240,0.4)",
                          cursor: "pointer",
                          fontSize: 12,
                          fontFamily: "monospace",
                          width: "100%",
                          textAlign: "center"
                        },
                        children: [
                          "← ",
                          lang === "hi" ? "वापस जाएं" : "Back to role selection"
                        ]
                      }
                    )
                  ]
                }
              ),
              loggedIn && cfg && selectedRole && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { animation: "fadeSlideUp 0.5s ease" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: "@keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:none; } }" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
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
                      gap: 16
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 40 }, children: cfg.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontSize: 13,
                              color: "rgba(240,240,240,0.5)",
                              fontFamily: "monospace",
                              marginBottom: 4
                            },
                            children: lang === "hi" ? "स्वागत है" : "WELCOME"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: { fontSize: 20, fontWeight: 700, color: "#f0f0f0" },
                            children: loggedIn.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              fontSize: 12,
                              color: cfg.color,
                              fontFamily: "monospace",
                              marginTop: 2
                            },
                            children: [
                              loggedIn.id,
                              " · ",
                              lang === "hi" ? cfg.label_hi : cfg.label_en
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            background: cfg.color,
                            color: "#000",
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 20,
                            fontFamily: "monospace",
                            letterSpacing: 1,
                            animation: "pulse 2s infinite"
                          },
                          children: lang === "hi" ? "सक्रिय" : "ACTIVE"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardPreview, { role: selectedRole, lang, cfg }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginTop: 36 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: cfg.redirectTo,
                      "data-ocid": "portal.dashboard.link",
                      style: {
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
                        transition: "opacity 0.2s"
                      },
                      children: lang === "hi" ? "पूरा डैशबोर्ड खोलें →" : "OPEN FULL DASHBOARD →"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "portal.logout.button",
                      onClick: handleBack,
                      style: {
                        background: "transparent",
                        border: "none",
                        color: "rgba(240,240,240,0.4)",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "monospace"
                      },
                      children: lang === "hi" ? "लॉगआउट करें" : "Logout"
                    }
                  ) })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function RoleDashboardPreview({
  role,
  lang,
  cfg
}) {
  if (role === "investigator") {
    const cases = [
      {
        id: "DEPS-2024-0051",
        title: lang === "hi" ? "फिशिंग अटैक - बैंक फ्रॉड" : "Phishing Attack - Bank Fraud",
        status: lang === "hi" ? "सक्रिय" : "ACTIVE",
        priority: lang === "hi" ? "उच्च" : "HIGH",
        evidence: 4,
        date: "12 Jan 2025"
      },
      {
        id: "DEPS-2024-0048",
        title: lang === "hi" ? "पहचान चोरी - सोशल मीडिया" : "Identity Theft - Social Media",
        status: lang === "hi" ? "समीक्षाधीन" : "REVIEW",
        priority: lang === "hi" ? "मध्यम" : "MED",
        evidence: 7,
        date: "09 Jan 2025"
      },
      {
        id: "DEPS-2024-0044",
        title: lang === "hi" ? "रैनसमवेयर - कॉर्पोरेट" : "Ransomware - Corporate",
        status: lang === "hi" ? "लंबित" : "PENDING",
        priority: lang === "hi" ? "उच्च" : "HIGH",
        evidence: 12,
        date: "05 Jan 2025"
      }
    ];
    const stats2 = [
      { label: lang === "hi" ? "सक्रिय मामले" : "Active Cases", value: "7" },
      { label: lang === "hi" ? "साक्ष्य आइटम" : "Evidence Items", value: "34" },
      { label: lang === "hi" ? "समीक्षा लंबित" : "Pending Review", value: "3" },
      { label: lang === "hi" ? "हल किए" : "Resolved", value: "21" }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 760, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatGrid, { stats: stats2, color: cfg.color }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionTitle,
        {
          color: cfg.color,
          title: lang === "hi" ? "मेरे असाइन केस" : "MY ASSIGNED CASES"
        }
      ),
      cases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `portal.case.item.${i + 1}`,
          style: {
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${cfg.border}`,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 14
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 14, color: "#f0f0f0" }, children: c.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontSize: 11,
                    color: "rgba(240,240,240,0.45)",
                    fontFamily: "monospace",
                    marginTop: 4
                  },
                  children: [
                    c.id,
                    " · ",
                    c.date
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                label: c.priority,
                color: c.priority === (lang === "hi" ? "उच्च" : "HIGH") ? "#DC2626" : "#f59e0b"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: c.status, color: cfg.color }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  fontSize: 11,
                  color: "rgba(240,240,240,0.45)",
                  textAlign: "right",
                  minWidth: 60
                },
                children: [
                  c.evidence,
                  " ",
                  lang === "hi" ? "साक्ष्य" : "evidence"
                ]
              }
            )
          ]
        },
        c.id
      ))
    ] });
  }
  if (role === "officer") {
    const submissions = [
      {
        id: "EV-2024-0219",
        type: lang === "hi" ? "स्क्रीनशॉट" : "Screenshot",
        case: "DEPS-2024-0051",
        status: lang === "hi" ? "सत्यापित" : "VERIFIED",
        date: "11 Jan 2025"
      },
      {
        id: "EV-2024-0215",
        type: lang === "hi" ? "ऑडियो रिकॉर्डिंग" : "Audio Recording",
        case: "DEPS-2024-0049",
        status: lang === "hi" ? "समीक्षाधीन" : "REVIEW",
        date: "08 Jan 2025"
      },
      {
        id: "EV-2024-0208",
        type: lang === "hi" ? "दस्तावेज़" : "Document",
        case: "DEPS-2024-0044",
        status: lang === "hi" ? "लंबित" : "PENDING",
        date: "05 Jan 2025"
      }
    ];
    const assignedCases = [
      {
        id: "DEPS-2024-0051",
        area: lang === "hi" ? "साइबर क्राइम यूनिट, दिल्ली" : "Cyber Crime Unit, Delhi",
        status: lang === "hi" ? "सक्रिय" : "ACTIVE",
        due: "20 Jan"
      },
      {
        id: "DEPS-2024-0049",
        area: lang === "hi" ? "फ्रॉड विभाग, मुंबई" : "Fraud Dept, Mumbai",
        status: lang === "hi" ? "जाँच जारी" : "INVESTIGATING",
        due: "18 Jan"
      }
    ];
    const stats2 = [
      { label: lang === "hi" ? "मेरे सबमिशन" : "My Submissions", value: "12" },
      { label: lang === "hi" ? "असाइन केस" : "Assigned Cases", value: "5" },
      { label: lang === "hi" ? "समीक्षा लंबित" : "Pending Review", value: "2" },
      { label: lang === "hi" ? "पूर्ण" : "Completed", value: "8" }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 760, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatGrid, { stats: stats2, color: cfg.color }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionTitle,
        {
          color: cfg.color,
          title: lang === "hi" ? "मेरे साक्ष्य सबमिशन" : "MY EVIDENCE SUBMISSIONS"
        }
      ),
      submissions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `portal.submission.item.${i + 1}`,
          style: {
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${cfg.border}`,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 14
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 14, color: "#f0f0f0" }, children: s.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontSize: 11,
                    color: "rgba(240,240,240,0.45)",
                    fontFamily: "monospace",
                    marginTop: 4
                  },
                  children: [
                    s.id,
                    " · ",
                    s.case,
                    " · ",
                    s.date
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                label: s.status,
                color: s.status === (lang === "hi" ? "सत्यापित" : "VERIFIED") ? "#10b981" : s.status === (lang === "hi" ? "लंबित" : "PENDING") ? "#f59e0b" : cfg.color
              }
            )
          ]
        },
        s.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionTitle,
        {
          color: cfg.color,
          title: lang === "hi" ? "असाइन किए गए केस" : "ASSIGNED CASES"
        }
      ),
      assignedCases.map((ac, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `portal.assigned.item.${i + 1}`,
          style: {
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${cfg.border}`,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 14
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 14, color: "#f0f0f0" }, children: ac.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 11,
                    color: "rgba(240,240,240,0.45)",
                    fontFamily: "monospace",
                    marginTop: 4
                  },
                  children: ac.area
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  fontSize: 12,
                  color: "rgba(240,240,240,0.4)",
                  fontFamily: "monospace"
                },
                children: [
                  lang === "hi" ? "देय" : "Due",
                  ": ",
                  ac.due
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { label: ac.status, color: cfg.color })
          ]
        },
        ac.id
      ))
    ] });
  }
  const complaints = [
    {
      id: "DEPS-2025-0003",
      type: lang === "hi" ? "ऑनलाइन शॉपिंग स्कैम" : "Online Shopping Scam",
      status: lang === "hi" ? "जाँच जारी" : "INVESTIGATING",
      officer: "S. Kumar",
      date: "10 Jan 2025"
    },
    {
      id: "DEPS-2024-0089",
      type: lang === "hi" ? "वित्तीय धोखाधड़ी" : "Financial Fraud",
      status: lang === "hi" ? "हल हुआ" : "RESOLVED",
      officer: "P. Sharma",
      date: "20 Nov 2024"
    }
  ];
  const stats = [
    { label: lang === "hi" ? "दर्ज शिकायतें" : "Complaints Filed", value: "2" },
    { label: lang === "hi" ? "जाँच जारी" : "Under Investigation", value: "1" },
    { label: lang === "hi" ? "हल हुए" : "Resolved", value: "1" },
    { label: lang === "hi" ? "साक्ष्य जमा" : "Evidence Submitted", value: "3" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 760, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatGrid, { stats, color: cfg.color }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionTitle,
      {
        color: cfg.color,
        title: lang === "hi" ? "मेरी शिकायतें" : "MY COMPLAINTS"
      }
    ),
    complaints.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `portal.complaint.item.${i + 1}`,
        style: {
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${cfg.border}`,
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 14
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 14, color: "#f0f0f0" }, children: c.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  fontSize: 11,
                  color: "rgba(240,240,240,0.45)",
                  fontFamily: "monospace",
                  marginTop: 4
                },
                children: [
                  c.id,
                  " · ",
                  lang === "hi" ? "अधिकारी" : "Officer",
                  ": ",
                  c.officer,
                  " ·",
                  " ",
                  c.date
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              label: c.status,
              color: c.status === (lang === "hi" ? "हल हुआ" : "RESOLVED") ? "#10b981" : cfg.color
            }
          )
        ]
      },
      c.id
    ))
  ] });
}
function StatGrid({
  stats,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 12,
        marginBottom: 28
      },
      children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "16px 14px",
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontSize: 28,
                  fontWeight: 800,
                  color,
                  fontFamily: "monospace"
                },
                children: s.value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontSize: 11,
                  color: "rgba(240,240,240,0.5)",
                  marginTop: 4
                },
                children: s.label
              }
            )
          ]
        },
        s.label
      ))
    }
  );
}
function SectionTitle({ title, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        fontSize: 11,
        fontFamily: "monospace",
        letterSpacing: 2,
        color,
        marginBottom: 12,
        paddingLeft: 2
      },
      children: title
    }
  );
}
function Badge({ label, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      style: {
        background: `${color}22`,
        border: `1px solid ${color}55`,
        color,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        fontFamily: "monospace",
        letterSpacing: 0.5,
        whiteSpace: "nowrap"
      },
      children: label
    }
  );
}
export {
  MyPortal as default
};
