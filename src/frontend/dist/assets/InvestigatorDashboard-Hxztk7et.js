import { w as useLang, O as useActor, h as reactExports, P as useQuery, o as jsxRuntimeExports, q as motion, Q as Input, W as Button } from "./index-dk1lR00N.js";
import { B as Badge } from "./badge-BSrtMNOE.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BZhNfEXK.js";
import { P as PageAnimBG } from "./PageAnimBG-BM6ITZ56.js";
import { M as MOCK_CASES, a as MOCK_EVIDENCE } from "./mockData-Daz8u9K8.js";
import { R as ResponsiveContainer, P as PieChart, E as Pie, F as Cell, T as Tooltip, B as BarChart, X as XAxis, Y as YAxis, z as Bar } from "./PieChart-DGE3c-A3.js";
function useCounter(target, delay = 0) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (target === 0) return;
    const timeout = setTimeout(() => {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        setCount(current);
        if (current >= target) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return count;
}
function StatCard({
  label,
  value,
  color
}) {
  const count = useCounter(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      style: {
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}30`,
        borderRadius: 12,
        padding: "20px 24px",
        textAlign: "center"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 36,
              fontWeight: 800,
              color,
              lineHeight: 1,
              marginBottom: 6
            },
            children: count
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "rgba(240,240,240,0.45)",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            },
            children: label
          }
        )
      ]
    }
  );
}
function InvestigatorDashboard() {
  const { t } = useLang();
  const { actor, isFetching } = useActor();
  const [caseSearch, setCaseSearch] = reactExports.useState("");
  const [evidenceSearch, setEvidenceSearch] = reactExports.useState("");
  const [expandedCase, setExpandedCase] = reactExports.useState(null);
  const { data: cases = [] } = useQuery({
    queryKey: ["allCases"],
    queryFn: async () => {
      const r = actor ? await actor.getAllCases() : [];
      return r.length > 0 ? r : MOCK_CASES;
    },
    enabled: !!actor && !isFetching
  });
  const { data: evidence = [], refetch: refetchEvidence } = useQuery({
    queryKey: ["allEvidence"],
    queryFn: async () => {
      const r = actor ? await actor.getAllEvidence() : [];
      return r.length > 0 ? r : MOCK_EVIDENCE;
    },
    enabled: !!actor && !isFetching
  });
  const openCases = cases.filter(
    (c) => c.status === "open" || c.status.open !== void 0
  );
  const closedCases = cases.filter(
    (c) => c.status !== "open" && c.status.open === void 0
  );
  const filteredCases = openCases.filter(
    (c) => c.title.toLowerCase().includes(caseSearch.toLowerCase())
  );
  const filteredEvidence = evidence.filter(
    (e) => e.fileName.toLowerCase().includes(evidenceSearch.toLowerCase())
  );
  const donutData = [
    { name: "Open", value: openCases.length || 4, color: "#DC2626" },
    { name: "Closed", value: closedCases.length || 3, color: "#16A34A" }
  ];
  const barData = [
    {
      type: "Images",
      count: evidence.filter((e) => {
        var _a;
        return (_a = e.fileType) == null ? void 0 : _a.startsWith("image");
      }).length || 5
    },
    {
      type: "Videos",
      count: evidence.filter((e) => {
        var _a;
        return (_a = e.fileType) == null ? void 0 : _a.startsWith("video");
      }).length || 2
    },
    {
      type: "Docs",
      count: evidence.filter((e) => {
        var _a;
        return (_a = e.fileType) == null ? void 0 : _a.includes("pdf");
      }).length || 7
    },
    {
      type: "Other",
      count: evidence.filter(
        (e) => {
          var _a, _b, _c;
          return !((_a = e.fileType) == null ? void 0 : _a.startsWith("image")) && !((_b = e.fileType) == null ? void 0 : _b.startsWith("video")) && !((_c = e.fileType) == null ? void 0 : _c.includes("pdf"));
        }
      ).length || 3
    }
  ];
  const handleSealCase = async (caseId) => {
    if (!actor) return;
    await actor.sealCase(caseId);
    refetchEvidence();
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .glitch {
          position: relative;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          overflow: hidden;
        }
        .glitch::before {
          animation: glitch-top 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
          text-shadow: -2px 0 #DC2626;
          opacity: 0.7;
        }
        .glitch::after {
          animation: glitch-bot 3s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
          text-shadow: 2px 0 #16A34A;
          opacity: 0.7;
        }
        @keyframes glitch-top {
          0%,95% { transform: translate(0); }
          96% { transform: translate(-2px, -1px); }
          97% { transform: translate(2px, 1px); }
          98% { transform: translate(-1px, 0); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-bot {
          0%,92% { transform: translate(0); }
          93% { transform: translate(2px, 2px); }
          95% { transform: translate(-2px, -1px); }
          100% { transform: translate(0); }
        }
      ` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, -25, 0], x: [0, 12, 0] },
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              style: {
                position: "absolute",
                top: "20%",
                right: "5%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    style: { marginBottom: 32 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                                className: "glitch",
                                "data-text": t("investigatorPortal"),
                                style: {
                                  fontFamily: "'Bricolage Grotesque', sans-serif",
                                  fontSize: "clamp(24px, 4vw, 42px)",
                                  fontWeight: 900,
                                  color: "#f0f0f0",
                                  letterSpacing: "0.04em",
                                  margin: 0
                                },
                                children: t("investigatorPortal").toUpperCase()
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
                                  background: "rgba(220,38,38,0.15)",
                                  border: "1px solid rgba(220,38,38,0.4)",
                                  color: "#DC2626"
                                },
                                children: t("restrictedAccess").toUpperCase()
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "rgba(240,240,240,0.4)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 12,
                            marginTop: 8
                          },
                          children: t("loggedInInvestigator")
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: 16,
                      marginBottom: 32
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StatCard,
                        {
                          label: t("activeCases"),
                          value: cases.length || 7,
                          color: "#f0f0f0"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StatCard,
                        {
                          label: t("activeCases"),
                          value: openCases.length || 4,
                          color: "#DC2626"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StatCard,
                        {
                          label: t("evidenceItems"),
                          value: evidence.length || 17,
                          color: "#16A34A"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StatCard,
                        {
                          label: t("chainEntries"),
                          value: closedCases.length || 3,
                          color: "#D97706"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "cases", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsList,
                    {
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        marginBottom: 24
                      },
                      children: ["cases", "evidence", "custody", "analytics"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: tab,
                          "data-ocid": "investigator.tab",
                          style: {
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                          },
                          children: tab === "cases" ? t("caseFiles") : tab === "evidence" ? t("evidenceReview") : tab === "custody" ? t("chainOfCustody") : t("analytics")
                        },
                        tab
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "cases", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: caseSearch,
                        onChange: (e) => setCaseSearch(e.target.value),
                        placeholder: t("searchCases"),
                        "data-ocid": "investigator.search_input",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#f0f0f0",
                          maxWidth: 340
                        }
                      }
                    ) }),
                    filteredCases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CaseCard,
                      {
                        caseItem: {
                          caseId: BigInt(1),
                          title: "Operation CyberShield",
                          description: "Phishing attack targeting banking users across 5 states.",
                          status: "open",
                          createdAt: BigInt(Date.now()),
                          createdBy: "",
                          evidenceIds: [BigInt(1), BigInt(2)]
                        },
                        expanded: expandedCase === "1",
                        onToggle: () => setExpandedCase(expandedCase === "1" ? null : "1"),
                        onSeal: () => handleSealCase(BigInt(1)),
                        index: 0
                      },
                      "mock"
                    ) : filteredCases.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CaseCard,
                      {
                        caseItem: c,
                        expanded: expandedCase === String(c.caseId),
                        onToggle: () => setExpandedCase(
                          expandedCase === String(c.caseId) ? null : String(c.caseId)
                        ),
                        onSeal: () => handleSealCase(c.caseId),
                        index: i
                      },
                      String(c.caseId)
                    ))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "evidence", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: evidenceSearch,
                        onChange: (e) => setEvidenceSearch(e.target.value),
                        placeholder: t("searchEvidence"),
                        "data-ocid": "investigator.search_input",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#f0f0f0",
                          maxWidth: 340
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                        t("fileName"),
                        t("fileType"),
                        t("sha256Hash"),
                        t("status"),
                        t("timestamp")
                      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          style: {
                            padding: "10px 14px",
                            textAlign: "left",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: "rgba(240,240,240,0.4)",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                            letterSpacing: "0.1em"
                          },
                          children: h
                        },
                        h
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (filteredEvidence.length === 0 ? mockEvidence : filteredEvidence).map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.tr,
                        {
                          initial: { opacity: 0, x: -20 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: i * 0.06 },
                          style: {
                            borderBottom: "1px solid rgba(255,255,255,0.04)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "12px 14px",
                                  color: "#f0f0f0",
                                  fontSize: 13,
                                  fontFamily: "'General Sans', sans-serif"
                                },
                                children: "fileName" in e ? e.fileName : e.name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "12px 14px",
                                  color: "rgba(240,240,240,0.5)",
                                  fontSize: 12
                                },
                                children: "fileType" in e ? e.fileType : e.type
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "td",
                              {
                                style: {
                                  padding: "12px 14px",
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: 10,
                                  color: "#16A34A"
                                },
                                children: [
                                  ("sha256Hash" in e ? e.sha256Hash : e.hash).slice(0, 16),
                                  "..."
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "12px 14px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  padding: "2px 10px",
                                  borderRadius: 20,
                                  fontSize: 10,
                                  fontFamily: "'JetBrains Mono', monospace",
                                  background: "rgba(22,163,74,0.15)",
                                  border: "1px solid rgba(22,163,74,0.3)",
                                  color: "#16A34A"
                                },
                                children: t("active").toUpperCase()
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                style: {
                                  padding: "12px 14px",
                                  color: "rgba(240,240,240,0.4)",
                                  fontSize: 11,
                                  fontFamily: "'JetBrains Mono', monospace"
                                },
                                children: new Date(
                                  Number(
                                    "timestamp" in e ? e.timestamp : BigInt(Date.now())
                                  ) / 1e6
                                ).toLocaleDateString()
                              }
                            )
                          ]
                        },
                        "fileName" in e ? e.fileName : e.name
                      )) })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "custody", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", paddingLeft: 40 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          left: 14,
                          top: 0,
                          bottom: 0,
                          width: 2,
                          background: "linear-gradient(to bottom, #DC2626, rgba(220,38,38,0.1))"
                        }
                      }
                    ),
                    (cases.length > 0 ? cases : mockCases).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: -30 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: i * 0.1 },
                        style: { position: "relative", marginBottom: 28 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: -33,
                                top: 8,
                                width: 14,
                                height: 14,
                                borderRadius: "50%",
                                background: i % 2 === 0 ? "#DC2626" : "#16A34A",
                                border: "2px solid #0a0a0f",
                                boxShadow: `0 0 8px ${i % 2 === 0 ? "#DC2626" : "#16A34A"}`
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 10,
                                padding: "14px 18px"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
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
                                            fontFamily: "'General Sans', sans-serif",
                                            fontSize: 14
                                          },
                                          children: "title" in c ? c.title : c.title
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                        "p",
                                        {
                                          style: {
                                            margin: "4px 0 0",
                                            color: "rgba(240,240,240,0.4)",
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: 10
                                          },
                                          children: [
                                            "Case #",
                                            i + 1,
                                            " ·",
                                            " ",
                                            "evidenceIds" in c ? c.evidenceIds.length : 2,
                                            " ",
                                            t("evidenceItemsText")
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
                                          background: i % 2 === 0 ? "rgba(220,38,38,0.15)" : "rgba(22,163,74,0.15)",
                                          border: `1px solid ${i % 2 === 0 ? "rgba(220,38,38,0.4)" : "rgba(22,163,74,0.4)"}`,
                                          color: i % 2 === 0 ? "#DC2626" : "#16A34A"
                                        },
                                        children: i % 2 === 0 ? t("open").toUpperCase() : t("closed").toUpperCase()
                                      }
                                    )
                                  ]
                                }
                              )
                            }
                          )
                        ]
                      },
                      "title" in c ? c.title : String(i)
                    ))
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 24
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              borderRadius: 12,
                              padding: 24
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 11,
                                    color: "rgba(240,240,240,0.5)",
                                    marginBottom: 16,
                                    letterSpacing: "0.1em"
                                  },
                                  children: t("caseStatusChart").toUpperCase()
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Pie,
                                  {
                                    data: donutData,
                                    cx: "50%",
                                    cy: "50%",
                                    innerRadius: 60,
                                    outerRadius: 80,
                                    dataKey: "value",
                                    children: donutData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Tooltip,
                                  {
                                    contentStyle: {
                                      background: "#13131a",
                                      border: "1px solid rgba(220,38,38,0.3)",
                                      color: "#f0f0f0"
                                    }
                                  }
                                )
                              ] }) })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              borderRadius: 12,
                              padding: 24
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 11,
                                    color: "rgba(240,240,240,0.5)",
                                    marginBottom: 16,
                                    letterSpacing: "0.1em"
                                  },
                                  children: t("evidenceByType").toUpperCase()
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: barData, children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  XAxis,
                                  {
                                    dataKey: "type",
                                    tick: { fill: "rgba(240,240,240,0.4)", fontSize: 10 }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  YAxis,
                                  {
                                    tick: { fill: "rgba(240,240,240,0.4)", fontSize: 10 }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Tooltip,
                                  {
                                    contentStyle: {
                                      background: "#13131a",
                                      border: "1px solid rgba(220,38,38,0.3)",
                                      color: "#f0f0f0"
                                    }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Bar,
                                  {
                                    dataKey: "count",
                                    fill: "#DC2626",
                                    radius: [4, 4, 0, 0]
                                  }
                                )
                              ] }) })
                            ]
                          }
                        )
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
const mockEvidence = [
  {
    fileName: "screenshot_fraud.png",
    fileType: "image/png",
    sha256Hash: "a3f9d8e1b2c4f7a9d3e5b8c2f1a4d7e9b3c6",
    timestamp: BigInt(Date.now() * 1e6)
  },
  {
    fileName: "transaction_log.pdf",
    fileType: "application/pdf",
    sha256Hash: "b7e2a1c5f8d4b9e3a6c2f5d8b1e4a7c3f6d9",
    timestamp: BigInt(Date.now() * 1e6)
  },
  {
    fileName: "network_capture.pcap",
    fileType: "application/octet-stream",
    sha256Hash: "c1d4e7b9f2a5c8e1d4b7f3a6c9e2b5d8f1a4",
    timestamp: BigInt(Date.now() * 1e6)
  }
];
const mockCases = [
  {
    title: "Operation CyberShield",
    status: "open",
    evidenceIds: [BigInt(1), BigInt(2)]
  },
  { title: "Financial Fraud Ring", status: "closed", evidenceIds: [BigInt(3)] },
  {
    title: "Identity Theft Ring",
    status: "open",
    evidenceIds: [BigInt(4), BigInt(5), BigInt(6)]
  },
  {
    title: "Phishing Campaign Delta",
    status: "closed",
    evidenceIds: [BigInt(7)]
  }
];
function CaseCard({
  caseItem,
  expanded,
  onToggle,
  onSeal,
  index
}) {
  const { t } = useLang();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -24 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.08 },
      style: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        marginBottom: 12,
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            style: {
              width: "100%",
              background: "none",
              border: "none",
              padding: "16px 20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left"
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
                    children: caseItem.title
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
                      "Case #",
                      String(caseItem.caseId),
                      " · ",
                      caseItem.evidenceIds.length,
                      " ",
                      t("evidenceItemsText")
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    style: {
                      background: "rgba(220,38,38,0.15)",
                      border: "1px solid rgba(220,38,38,0.3)",
                      color: "#DC2626",
                      fontSize: 9,
                      fontFamily: "'JetBrains Mono', monospace"
                    },
                    children: t("open").toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(240,240,240,0.4)", fontSize: 16 }, children: expanded ? "▲" : "▼" })
              ] })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            style: {
              padding: "0 20px 16px",
              borderTop: "1px solid rgba(255,255,255,0.05)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    color: "rgba(240,240,240,0.6)",
                    fontSize: 13,
                    fontFamily: "'General Sans', sans-serif",
                    marginTop: 12
                  },
                  children: caseItem.description
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },
                  children: caseItem.evidenceIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "rgba(22,163,74,0.12)",
                        border: "1px solid rgba(22,163,74,0.3)",
                        color: "#16A34A",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10
                      },
                      children: [
                        "EV#",
                        String(id)
                      ]
                    },
                    String(id)
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: onSeal,
                  "data-ocid": "investigator.delete_button.1",
                  size: "sm",
                  style: {
                    marginTop: 14,
                    background: "rgba(220,38,38,0.15)",
                    border: "1px solid rgba(220,38,38,0.4)",
                    color: "#DC2626"
                  },
                  children: t("sealCase")
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  InvestigatorDashboard as default
};
