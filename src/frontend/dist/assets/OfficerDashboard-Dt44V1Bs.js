import { c as createLucideIcon, w as useLang, O as useActor, h as reactExports, P as useQuery, o as jsxRuntimeExports, q as motion, L as Link, W as Button, z as Upload, Q as Input, _ as Textarea } from "./index-Bl3e9hkw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-EJuX0v77.js";
import { P as PageAnimBG } from "./PageAnimBG-Kghwey8L.js";
import { M as MOCK_CASES, a as MOCK_EVIDENCE } from "./mockData-Daz8u9K8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function useCounter(target) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (target === 0) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [target]);
  return count;
}
function OfficerDashboard() {
  const { t } = useLang();
  const { actor, isFetching } = useActor();
  const [caseSearch, setCaseSearch] = reactExports.useState("");
  const [noteText, setNoteText] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState([
    {
      id: 1,
      text: "Suspect identified at ATM near sector 4. Camera footage secured.",
      time: "10:32 AM"
    },
    {
      id: 2,
      text: "Victim callback confirmed — additional transaction logs obtained.",
      time: "2:15 PM"
    }
  ]);
  const { data: cases = [] } = useQuery({
    queryKey: ["allCasesOfficer"],
    queryFn: async () => {
      const r = actor ? await actor.getAllCases() : [];
      return r.length > 0 ? r : MOCK_CASES;
    },
    enabled: !!actor && !isFetching
  });
  const { data: evidence = [] } = useQuery({
    queryKey: ["allEvidenceOfficer"],
    queryFn: async () => {
      const r = actor ? await actor.getAllEvidence() : [];
      return r.length > 0 ? r : MOCK_EVIDENCE;
    },
    enabled: !!actor && !isFetching
  });
  const filteredCases = cases.filter(
    (c) => c.title.toLowerCase().includes(caseSearch.toLowerCase())
  );
  const submissions = useCounter(evidence.length || 8);
  const assigned = useCounter(cases.length || 5);
  const pending = useCounter(3);
  const completed = useCounter(2);
  const saveNote = () => {
    if (!noteText.trim()) return;
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: noteText.trim(),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]);
    setNoteText("");
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, -25, 0], x: [0, 14, 0] },
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              style: {
                position: "absolute",
                top: "15%",
                left: "3%",
                width: 260,
                height: 260,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)",
                filter: "blur(50px)",
                pointerEvents: "none",
                zIndex: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, 20, 0], x: [0, -10, 0] },
              transition: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              style: {
                position: "absolute",
                bottom: "10%",
                right: "4%",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%)",
                filter: "blur(40px)",
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
                maxWidth: 1100,
                margin: "0 auto"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    style: { marginBottom: 32 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          flexWrap: "wrap"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h1",
                            {
                              style: {
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontSize: "clamp(22px, 4vw, 38px)",
                                fontWeight: 900,
                                color: "#f0f0f0",
                                letterSpacing: "0.04em",
                                margin: 0
                              },
                              children: t("officerFieldPortal").toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.span,
                            {
                              animate: { scale: [1, 1.05, 1] },
                              transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                              style: {
                                padding: "4px 12px",
                                borderRadius: 20,
                                fontSize: 10,
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                background: "rgba(22,163,74,0.15)",
                                border: "1px solid rgba(22,163,74,0.4)",
                                color: "#16A34A"
                              },
                              children: t("fieldAccess").toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.span,
                            {
                              animate: { opacity: [1, 0.4, 1] },
                              transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 12,
                                fontFamily: "'JetBrains Mono', monospace",
                                color: "#16A34A"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      width: 8,
                                      height: 8,
                                      borderRadius: "50%",
                                      background: "#16A34A",
                                      display: "inline-block"
                                    }
                                  }
                                ),
                                t("activeDuty").toUpperCase()
                              ]
                            }
                          )
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 12,
                      marginBottom: 28,
                      flexWrap: "wrap"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          "data-ocid": "officer.upload_button",
                          style: {
                            background: "rgba(22,163,74,0.15)",
                            border: "1px solid rgba(22,163,74,0.4)",
                            color: "#16A34A",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.08em"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                            " ",
                            t("uploadEvidence2").toUpperCase()
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/verify", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          style: {
                            background: "rgba(59,130,246,0.12)",
                            border: "1px solid rgba(59,130,246,0.35)",
                            color: "#3B82F6",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.08em"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 mr-2" }),
                            " ",
                            t("verifyEvidence2").toUpperCase()
                          ]
                        }
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: 16,
                      marginBottom: 32
                    },
                    children: [
                      {
                        label: t("mySubmissions"),
                        value: submissions,
                        color: "#f0f0f0"
                      },
                      { label: t("assignedCases"), value: assigned, color: "#16A34A" },
                      {
                        label: t("pendingReviewStat"),
                        value: pending,
                        color: "#D97706"
                      },
                      { label: t("completed"), value: completed, color: "#3B82F6" }
                    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        style: {
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${color}30`,
                          borderRadius: 12,
                          padding: "20px",
                          textAlign: "center"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontSize: 34,
                                fontWeight: 800,
                                color,
                                lineHeight: 1,
                                marginBottom: 6
                              },
                              children: value
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 9,
                                color: "rgba(240,240,240,0.4)",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase"
                              },
                              children: label
                            }
                          )
                        ]
                      },
                      label
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "evidence", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsList,
                    {
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        marginBottom: 24
                      },
                      children: ["evidence", "cases", "notes"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: tab,
                          "data-ocid": "officer.tab",
                          style: {
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                          },
                          children: tab === "evidence" ? t("myEvidence") : tab === "cases" ? t("assignedCases") : t("fieldNotes")
                        },
                        tab
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "evidence", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: 12 }, children: (evidence.length === 0 ? mockEvidence : evidence).map(
                    (e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 16 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: i * 0.07 },
                        style: {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 10,
                          padding: "14px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 10
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                style: {
                                  margin: 0,
                                  color: "#f0f0f0",
                                  fontWeight: 600,
                                  fontSize: 14,
                                  fontFamily: "'General Sans', sans-serif"
                                },
                                children: "fileName" in e ? e.fileName : e.name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                style: {
                                  margin: "3px 0 0",
                                  color: "rgba(240,240,240,0.4)",
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: 10
                                },
                                children: [
                                  "fileType" in e ? e.fileType : e.type,
                                  " ",
                                  "· Hash:",
                                  " ",
                                  ("sha256Hash" in e ? e.sha256Hash : e.hash).slice(0, 12),
                                  "..."
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                padding: "3px 10px",
                                borderRadius: 20,
                                fontSize: 9,
                                fontFamily: "'JetBrains Mono', monospace",
                                background: "rgba(22,163,74,0.15)",
                                border: "1px solid rgba(22,163,74,0.35)",
                                color: "#16A34A"
                              },
                              children: t("active").toUpperCase()
                            }
                          )
                        ]
                      },
                      "fileName" in e ? e.fileName : e.name
                    )
                  ) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "cases", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: caseSearch,
                        onChange: (e) => setCaseSearch(e.target.value),
                        placeholder: t("searchAssignedCases"),
                        "data-ocid": "officer.search_input",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#f0f0f0",
                          maxWidth: 340
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: 12 }, children: (filteredCases.length === 0 ? mockCases : filteredCases).map(
                      (c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, x: -20 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: i * 0.08 },
                          style: {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 10,
                            padding: "16px 20px"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 8
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "p",
                                    {
                                      style: {
                                        margin: 0,
                                        color: "#f0f0f0",
                                        fontWeight: 600,
                                        fontFamily: "'General Sans', sans-serif"
                                      },
                                      children: "title" in c ? c.title : c.title
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "p",
                                    {
                                      style: {
                                        margin: "3px 0 0",
                                        color: "rgba(240,240,240,0.4)",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: 10
                                      },
                                      children: [
                                        t("evidenceCount"),
                                        ":",
                                        " ",
                                        "evidenceIds" in c ? c.evidenceIds.length : 2
                                      ]
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      padding: "2px 10px",
                                      borderRadius: 20,
                                      fontSize: 9,
                                      fontFamily: "'JetBrains Mono', monospace",
                                      background: "rgba(220,38,38,0.15)",
                                      border: "1px solid rgba(220,38,38,0.35)",
                                      color: "#DC2626"
                                    },
                                    children: t("assigned").toUpperCase()
                                  }
                                )
                              ]
                            }
                          )
                        },
                        "title" in c ? c.title : String(i)
                      )
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "notes", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          value: noteText,
                          onChange: (e) => setNoteText(e.target.value),
                          placeholder: t("writeFieldNote"),
                          style: {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#f0f0f0",
                            minHeight: 100,
                            marginBottom: 10
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          onClick: saveNote,
                          "data-ocid": "officer.submit_button",
                          style: {
                            background: "rgba(22,163,74,0.15)",
                            border: "1px solid rgba(22,163,74,0.4)",
                            color: "#16A34A",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.08em"
                          },
                          children: t("saveNote").toUpperCase()
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: 12 }, children: notes.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: i * 0.06 },
                        style: {
                          background: "rgba(22,163,74,0.05)",
                          border: "1px solid rgba(22,163,74,0.2)",
                          borderRadius: 10,
                          padding: "14px 18px"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                margin: "0 0 6px",
                                color: "rgba(240,240,240,0.65)",
                                fontSize: 13,
                                fontFamily: "'General Sans', sans-serif"
                              },
                              children: note.text
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                margin: 0,
                                color: "rgba(22,163,74,0.6)",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 10
                              },
                              children: note.time
                            }
                          )
                        ]
                      },
                      note.id
                    )) })
                  ] })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const mockEvidence = [
  {
    name: "fraud_screenshot.png",
    type: "image/png",
    hash: "a3f9d8e1b2c4f7a9d3e5b8c2f1a4d7e9"
  },
  {
    name: "bank_statement.pdf",
    type: "application/pdf",
    hash: "b7e2a1c5f8d4b9e3a6c2f5d8b1e4a7c3"
  },
  {
    name: "sms_evidence.txt",
    type: "text/plain",
    hash: "c1d4e7b9f2a5c8e1d4b7f3a6c9e2b5d8"
  }
];
const mockCases = [
  { title: "Operation CyberShield", evidenceIds: [BigInt(1), BigInt(2)] },
  { title: "Phishing Case #0047", evidenceIds: [BigInt(3)] },
  {
    title: "Financial Fraud Investigation",
    evidenceIds: [BigInt(4), BigInt(5)]
  }
];
export {
  OfficerDashboard as default
};
