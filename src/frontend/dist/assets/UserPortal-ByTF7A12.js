import { c as createLucideIcon, x as useLang, h as reactExports, o as jsxRuntimeExports, q as motion, V as Button, Q as Input, a7 as Select, a8 as SelectTrigger, a9 as SelectValue, aa as SelectContent, ab as SelectItem, Z as Textarea, L as Link } from "./index-BTordXxQ.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BnTu0WVt.js";
import { P as PageAnimBG } from "./PageAnimBG-CZRaRpHQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const scamTypes = [
  "Phishing",
  "Financial Fraud",
  "Identity Theft",
  "Online Shopping Scam",
  "Investment Scam",
  "Job Fraud",
  "Lottery Scam",
  "Romance Scam",
  "Cyber Bullying",
  "Ransomware",
  "Other"
];
const steps = [
  { n: 1, labelKey: "fileComplaint" },
  { n: 2, labelKey: "caseAssigned" },
  { n: 3, labelKey: "investigation" },
  { n: 4, labelKey: "resolution" }
];
function TypewriterText({ text }) {
  const [displayed, setDisplayed] = reactExports.useState("");
  reactExports.useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    displayed,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: { animation: "blink 1s step-end infinite", color: "#3B82F6" },
        children: "|"
      }
    )
  ] });
}
function UserPortal() {
  const { t } = useLang();
  const [form, setForm] = reactExports.useState({
    name: "",
    contact: "",
    scamType: "",
    date: "",
    description: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [caseId, setCaseId] = reactExports.useState("");
  const [caseResult, setCaseResult] = reactExports.useState(false);
  const handleSubmit = () => {
    if (!form.name || !form.contact || !form.scamType || !form.description)
      return;
    setSubmitted(true);
  };
  const handleTrack = () => {
    if (!caseId.trim()) return;
    setCaseResult(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        position: "relative",
        minHeight: "100vh",
        background: "#0a0a0f",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageAnimBG, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: "@keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, -28, 0], x: [0, 16, 0] },
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              style: {
                position: "absolute",
                top: "12%",
                left: "5%",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, 22, 0], x: [0, -14, 0] },
              transition: {
                duration: 11,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              style: {
                position: "absolute",
                bottom: "8%",
                right: "6%",
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 70%)",
                filter: "blur(50px)",
                pointerEvents: "none",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                position: "relative",
                zIndex: 10,
                padding: "40px 24px",
                maxWidth: 860,
                margin: "0 auto"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    style: { marginBottom: 36, textAlign: "center" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            color: "rgba(59,130,246,0.7)",
                            letterSpacing: "0.2em",
                            marginBottom: 12
                          },
                          children: t("publicAccess")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h1",
                        {
                          style: {
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontSize: "clamp(22px, 4vw, 40px)",
                            fontWeight: 900,
                            color: "#f0f0f0",
                            letterSpacing: "0.04em",
                            margin: "0 0 10px"
                          },
                          children: "CITIZEN COMPLAINT PORTAL"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 14,
                            color: "rgba(59,130,246,0.8)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypewriterText, { text: t("submitTrackVerify") })
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 40,
                      flexWrap: "wrap",
                      gap: 0
                    },
                    children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: { display: "flex", alignItems: "center" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 8
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  motion.div,
                                  {
                                    initial: { scale: 0 },
                                    animate: { scale: 1 },
                                    transition: { delay: 0.4 + i * 0.15, type: "spring" },
                                    style: {
                                      width: 40,
                                      height: 40,
                                      borderRadius: "50%",
                                      background: i === 0 ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.05)",
                                      border: `2px solid ${i === 0 ? "#3B82F6" : "rgba(255,255,255,0.15)"}`,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontFamily: "'JetBrains Mono', monospace",
                                      fontSize: 14,
                                      fontWeight: 700,
                                      color: i === 0 ? "#3B82F6" : "rgba(240,240,240,0.4)"
                                    },
                                    children: step.n
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      fontFamily: "'JetBrains Mono', monospace",
                                      fontSize: 9,
                                      color: i === 0 ? "#3B82F6" : "rgba(240,240,240,0.35)",
                                      letterSpacing: "0.08em",
                                      textAlign: "center",
                                      whiteSpace: "nowrap"
                                    },
                                    children: t(step.labelKey)
                                  }
                                )
                              ]
                            }
                          ),
                          i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { width: 0 },
                              animate: { width: 60 },
                              transition: { delay: 0.6 + i * 0.1, duration: 0.5 },
                              style: {
                                height: 2,
                                background: "rgba(59,130,246,0.25)",
                                margin: "0 8px",
                                marginBottom: 24,
                                flexShrink: 0
                              }
                            }
                          )
                        ]
                      },
                      step.n
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "complaint", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsList,
                    {
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        marginBottom: 24,
                        width: "100%"
                      },
                      children: ["complaint", "track", "verify"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: tab,
                          "data-ocid": "user.tab",
                          style: {
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            flex: 1
                          },
                          children: tab === "complaint" ? t("fileComplaintTab") : tab === "track" ? t("trackCase") : t("verifyEvidenceTab")
                        },
                        tab
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "complaint", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95 },
                      animate: { opacity: 1, scale: 1 },
                      style: {
                        textAlign: "center",
                        padding: "48px 24px",
                        background: "rgba(22,163,74,0.06)",
                        border: "1px solid rgba(22,163,74,0.3)",
                        borderRadius: 16
                      },
                      "data-ocid": "user.success_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            style: {
                              width: 52,
                              height: 52,
                              color: "#16A34A",
                              margin: "0 auto 16px"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            style: {
                              fontFamily: "'Bricolage Grotesque', sans-serif",
                              fontSize: 22,
                              fontWeight: 700,
                              color: "#f0f0f0",
                              marginBottom: 8
                            },
                            children: "Complaint Filed Successfully"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              color: "rgba(240,240,240,0.55)",
                              fontSize: 14,
                              fontFamily: "'General Sans', sans-serif"
                            },
                            children: "Your complaint has been registered. You will receive a Case ID within 24 hours."
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            onClick: () => setSubmitted(false),
                            style: {
                              marginTop: 20,
                              background: "rgba(22,163,74,0.15)",
                              border: "1px solid rgba(22,163,74,0.4)",
                              color: "#16A34A"
                            },
                            children: "File Another"
                          }
                        )
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: 16 }, children: [
                    [
                      {
                        label: t("fullName"),
                        key: "name",
                        type: "text",
                        placeholder: "Enter your full name"
                      },
                      {
                        label: t("contactEmail"),
                        key: "contact",
                        type: "email",
                        placeholder: "Enter your email or phone"
                      },
                      {
                        label: t("incidentDate"),
                        key: "date",
                        type: "date",
                        placeholder: ""
                      }
                    ].map(({ label, key, type, placeholder }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: i * 0.08 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: `field-${key}`,
                              style: {
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 11,
                                color: "rgba(240,240,240,0.5)",
                                letterSpacing: "0.1em",
                                display: "block",
                                marginBottom: 6
                              },
                              children: label.toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: `field-${key}`,
                              type,
                              value: form[key],
                              onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                              placeholder,
                              "data-ocid": "user.input",
                              style: {
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#f0f0f0"
                              }
                            }
                          )
                        ]
                      },
                      key
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.24 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "scam-type-select",
                              style: {
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 11,
                                color: "rgba(240,240,240,0.5)",
                                letterSpacing: "0.1em",
                                display: "block",
                                marginBottom: 6
                              },
                              children: t("scamTypeLabel").toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Select,
                            {
                              onValueChange: (v) => setForm((f) => ({ ...f, scamType: v })),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectTrigger,
                                  {
                                    "data-ocid": "user.select",
                                    style: {
                                      background: "rgba(255,255,255,0.04)",
                                      border: "1px solid rgba(255,255,255,0.1)",
                                      color: form.scamType ? "#f0f0f0" : "rgba(240,240,240,0.35)"
                                    },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select scam type" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectContent,
                                  {
                                    style: {
                                      background: "#13131a",
                                      border: "1px solid rgba(255,255,255,0.1)"
                                    },
                                    children: scamTypes.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      SelectItem,
                                      {
                                        value: t2,
                                        style: { color: "#f0f0f0" },
                                        children: t2
                                      },
                                      t2
                                    ))
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: 0.32 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "incident-description",
                              style: {
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 11,
                                color: "rgba(240,240,240,0.5)",
                                letterSpacing: "0.1em",
                                display: "block",
                                marginBottom: 6
                              },
                              children: t("incidentDescription").toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Textarea,
                            {
                              value: form.description,
                              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                              placeholder: t("incidentDescPlaceholder"),
                              style: {
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#f0f0f0",
                                minHeight: 100
                              }
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        style: {
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: "rgba(59,130,246,0.7)",
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: "rgba(59,130,246,0.07)",
                          border: "1px solid rgba(59,130,246,0.2)"
                        },
                        children: [
                          "💡 To attach evidence files, use the",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/upload",
                              style: { color: "#3B82F6", textDecoration: "underline" },
                              children: "Evidence Upload"
                            }
                          ),
                          " ",
                          "page."
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: handleSubmit,
                        "data-ocid": "user.submit_button",
                        style: {
                          background: "rgba(59,130,246,0.2)",
                          border: "1px solid rgba(59,130,246,0.4)",
                          color: "#3B82F6",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          letterSpacing: "0.08em",
                          padding: "12px 0"
                        },
                        children: "SUBMIT COMPLAINT"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "track", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 500, margin: "0 auto" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "case-id-input",
                        style: {
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: "rgba(240,240,240,0.5)",
                          letterSpacing: "0.1em",
                          display: "block",
                          marginBottom: 8
                        },
                        children: t("enterCaseId")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "case-id-input",
                          value: caseId,
                          onChange: (e) => {
                            setCaseId(e.target.value);
                            setCaseResult(false);
                          },
                          placeholder: t("caseIdPlaceholder"),
                          "data-ocid": "user.search_input",
                          style: {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#f0f0f0"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          onClick: handleTrack,
                          style: {
                            background: "rgba(59,130,246,0.2)",
                            border: "1px solid rgba(59,130,246,0.4)",
                            color: "#3B82F6",
                            whiteSpace: "nowrap"
                          },
                          children: "TRACK"
                        }
                      )
                    ] }),
                    caseResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0 },
                        style: {
                          marginTop: 24,
                          background: "rgba(59,130,246,0.07)",
                          border: "1px solid rgba(59,130,246,0.25)",
                          borderRadius: 12,
                          padding: "20px 22px"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 12,
                                flexWrap: "wrap",
                                gap: 8
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "p",
                                  {
                                    style: {
                                      margin: 0,
                                      fontFamily: "'Bricolage Grotesque', sans-serif",
                                      fontSize: 17,
                                      fontWeight: 700,
                                      color: "#f0f0f0"
                                    },
                                    children: [
                                      "Case #",
                                      caseId
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      padding: "3px 10px",
                                      borderRadius: 20,
                                      fontSize: 10,
                                      fontFamily: "'JetBrains Mono', monospace",
                                      background: "rgba(217,119,6,0.15)",
                                      border: "1px solid rgba(217,119,6,0.35)",
                                      color: "#D97706"
                                    },
                                    children: "UNDER INVESTIGATION"
                                  }
                                )
                              ]
                            }
                          ),
                          [
                            ["Status", "Under Investigation"],
                            ["Last Updated", (/* @__PURE__ */ new Date()).toLocaleDateString()],
                            ["Assigned Officer", "Inspector Sharma"],
                            ["Department", "Cyber Crime Unit"]
                          ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: { display: "flex", gap: 12, marginBottom: 8 },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      fontFamily: "'JetBrains Mono', monospace",
                                      fontSize: 10,
                                      color: "rgba(240,240,240,0.4)",
                                      minWidth: 120
                                    },
                                    children: k
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      fontFamily: "'General Sans', sans-serif",
                                      fontSize: 13,
                                      color: "rgba(240,240,240,0.75)"
                                    },
                                    children: v
                                  }
                                )
                              ]
                            },
                            k
                          ))
                        ]
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "verify", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { maxWidth: 560, margin: "0 auto", textAlign: "center" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0 },
                            style: {
                              background: "rgba(59,130,246,0.06)",
                              border: "1px solid rgba(59,130,246,0.2)",
                              borderRadius: 14,
                              padding: "32px 28px",
                              marginBottom: 20
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 12,
                                    color: "rgba(59,130,246,0.8)",
                                    marginBottom: 14,
                                    letterSpacing: "0.1em"
                                  },
                                  children: "EVIDENCE VERIFICATION"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    color: "rgba(240,240,240,0.65)",
                                    fontFamily: "'General Sans', sans-serif",
                                    fontSize: 14,
                                    lineHeight: 1.7
                                  },
                                  children: t("evidenceVerificationDesc")
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/verify", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            style: {
                              background: "rgba(59,130,246,0.2)",
                              border: "1px solid rgba(59,130,246,0.4)",
                              color: "#3B82F6",
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 12,
                              letterSpacing: "0.08em",
                              padding: "12px 32px"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
                              " GO TO VERIFICATION PAGE"
                            ]
                          }
                        ) })
                      ]
                    }
                  ) })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  UserPortal as default
};
