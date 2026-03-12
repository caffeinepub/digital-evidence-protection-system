import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CaseRecord, CaseStatus, EvidenceRecord } from "../backend";
import CyberBackground from "../components/CyberBackground";
import { MOCK_CASES, MOCK_EVIDENCE } from "../data/mockData";
import { useActor } from "../hooks/useActor";

function useCounter(target: number, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
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
  color,
}: { label: string; value: number; color: string }) {
  const count = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}30`,
        borderRadius: 12,
        padding: "20px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 36,
          fontWeight: 800,
          color,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {count}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "rgba(240,240,240,0.45)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function InvestigatorDashboard() {
  const { actor, isFetching } = useActor();
  const [caseSearch, setCaseSearch] = useState("");
  const [evidenceSearch, setEvidenceSearch] = useState("");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const { data: cases = [] } = useQuery<CaseRecord[]>({
    queryKey: ["allCases"],
    queryFn: async () => {
      const r = actor ? await actor.getAllCases() : [];
      return r.length > 0 ? r : MOCK_CASES;
    },
    enabled: !!actor && !isFetching,
  });

  const { data: evidence = [], refetch: refetchEvidence } = useQuery<
    EvidenceRecord[]
  >({
    queryKey: ["allEvidence"],
    queryFn: async () => {
      const r = actor ? await actor.getAllEvidence() : [];
      return r.length > 0 ? r : MOCK_EVIDENCE;
    },
    enabled: !!actor && !isFetching,
  });

  const openCases = cases.filter(
    (c) =>
      c.status === "open" ||
      (c.status as unknown as { open?: unknown }).open !== undefined,
  );
  const closedCases = cases.filter(
    (c) =>
      c.status !== "open" &&
      (c.status as unknown as { open?: unknown }).open === undefined,
  );

  const filteredCases = openCases.filter((c) =>
    c.title.toLowerCase().includes(caseSearch.toLowerCase()),
  );
  const filteredEvidence = evidence.filter((e) =>
    e.fileName.toLowerCase().includes(evidenceSearch.toLowerCase()),
  );

  const donutData = [
    { name: "Open", value: openCases.length || 4, color: "#DC2626" },
    { name: "Closed", value: closedCases.length || 3, color: "#16A34A" },
  ];
  const barData = [
    {
      type: "Images",
      count:
        evidence.filter((e) => e.fileType?.startsWith("image")).length || 5,
    },
    {
      type: "Videos",
      count:
        evidence.filter((e) => e.fileType?.startsWith("video")).length || 2,
    },
    {
      type: "Docs",
      count: evidence.filter((e) => e.fileType?.includes("pdf")).length || 7,
    },
    {
      type: "Other",
      count:
        evidence.filter(
          (e) =>
            !e.fileType?.startsWith("image") &&
            !e.fileType?.startsWith("video") &&
            !e.fileType?.includes("pdf"),
        ).length || 3,
    },
  ];

  const handleSealCase = async (caseId: bigint) => {
    if (!actor) return;
    await actor.sealCase(caseId);
    refetchEvidence();
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0a0a0f",
        overflow: "hidden",
      }}
    >
      <style>{`
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
      `}</style>

      <CyberBackground />

      {/* Red floating orb */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px 24px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <h1
              className="glitch"
              data-text="INVESTIGATOR PORTAL"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(24px, 4vw, 42px)",
                fontWeight: 900,
                color: "#f0f0f0",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              INVESTIGATOR PORTAL
            </h1>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                letterSpacing: "0.15em",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.4)",
                color: "#DC2626",
              }}
            >
              RESTRICTED ACCESS
            </motion.span>
          </div>
          <p
            style={{
              color: "rgba(240,240,240,0.4)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              marginTop: 8,
            }}
          >
            Logged in as Investigator · Full privileges active
          </p>
        </motion.div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <StatCard
            label="Total Cases"
            value={cases.length || 7}
            color="#f0f0f0"
          />
          <StatCard
            label="Open Cases"
            value={openCases.length || 4}
            color="#DC2626"
          />
          <StatCard
            label="Total Evidence"
            value={evidence.length || 17}
            color="#16A34A"
          />
          <StatCard
            label="Sealed Cases"
            value={closedCases.length || 3}
            color="#D97706"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cases">
          <TabsList
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 24,
            }}
          >
            {["cases", "evidence", "custody", "analytics"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-ocid="investigator.tab"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {tab === "cases"
                  ? "Active Cases"
                  : tab === "evidence"
                    ? "Evidence Review"
                    : tab === "custody"
                      ? "Chain of Custody"
                      : "Analytics"}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Active Cases */}
          <TabsContent value="cases">
            <div style={{ marginBottom: 16 }}>
              <Input
                value={caseSearch}
                onChange={(e) => setCaseSearch(e.target.value)}
                placeholder="Search cases..."
                data-ocid="investigator.search_input"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f0f0f0",
                  maxWidth: 340,
                }}
              />
            </div>
            {filteredCases.length === 0 ? (
              <CaseCard
                key="mock"
                caseItem={{
                  caseId: BigInt(1),
                  title: "Operation CyberShield",
                  description:
                    "Phishing attack targeting banking users across 5 states.",
                  status: "open" as unknown as CaseStatus,
                  createdAt: BigInt(Date.now()),
                  createdBy: "" as unknown as Principal,
                  evidenceIds: [BigInt(1), BigInt(2)],
                }}
                expanded={expandedCase === "1"}
                onToggle={() =>
                  setExpandedCase(expandedCase === "1" ? null : "1")
                }
                onSeal={() => handleSealCase(BigInt(1))}
                index={0}
              />
            ) : (
              filteredCases.map((c, i) => (
                <CaseCard
                  key={String(c.caseId)}
                  caseItem={c}
                  expanded={expandedCase === String(c.caseId)}
                  onToggle={() =>
                    setExpandedCase(
                      expandedCase === String(c.caseId)
                        ? null
                        : String(c.caseId),
                    )
                  }
                  onSeal={() => handleSealCase(c.caseId)}
                  index={i}
                />
              ))
            )}
          </TabsContent>

          {/* Evidence Review */}
          <TabsContent value="evidence">
            <div style={{ marginBottom: 16 }}>
              <Input
                value={evidenceSearch}
                onChange={(e) => setEvidenceSearch(e.target.value)}
                placeholder="Search evidence..."
                data-ocid="investigator.search_input"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#f0f0f0",
                  maxWidth: 340,
                }}
              />
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {[
                      "File Name",
                      "Type",
                      "SHA-256 Hash",
                      "Status",
                      "Timestamp",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: "rgba(240,240,240,0.4)",
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(filteredEvidence.length === 0
                    ? mockEvidence
                    : filteredEvidence
                  ).map((e, i) => (
                    <motion.tr
                      key={
                        "fileName" in e
                          ? e.fileName
                          : (e as { name: string }).name
                      }
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 14px",
                          color: "#f0f0f0",
                          fontSize: 13,
                          fontFamily: "'General Sans', sans-serif",
                        }}
                      >
                        {"fileName" in e
                          ? e.fileName
                          : (e as { name: string }).name}
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          color: "rgba(240,240,240,0.5)",
                          fontSize: 12,
                        }}
                      >
                        {"fileType" in e
                          ? e.fileType
                          : (e as { type: string }).type}
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: "#16A34A",
                        }}
                      >
                        {("sha256Hash" in e
                          ? e.sha256Hash
                          : (e as { hash: string }).hash
                        ).slice(0, 16)}
                        ...
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            padding: "2px 10px",
                            borderRadius: 20,
                            fontSize: 10,
                            fontFamily: "'JetBrains Mono', monospace",
                            background: "rgba(22,163,74,0.15)",
                            border: "1px solid rgba(22,163,74,0.3)",
                            color: "#16A34A",
                          }}
                        >
                          ACTIVE
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          color: "rgba(240,240,240,0.4)",
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {new Date(
                          Number(
                            "timestamp" in e ? e.timestamp : BigInt(Date.now()),
                          ) / 1_000_000,
                        ).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Chain of Custody */}
          <TabsContent value="custody">
            <div style={{ position: "relative", paddingLeft: 40 }}>
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background:
                    "linear-gradient(to bottom, #DC2626, rgba(220,38,38,0.1))",
                }}
              />
              {(cases.length > 0 ? cases : mockCases).map((c, i) => (
                <motion.div
                  key={"title" in c ? c.title : String(i)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ position: "relative", marginBottom: 28 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -33,
                      top: 8,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: i % 2 === 0 ? "#DC2626" : "#16A34A",
                      border: "2px solid #0a0a0f",
                      boxShadow: `0 0 8px ${i % 2 === 0 ? "#DC2626" : "#16A34A"}`,
                    }}
                  />
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10,
                      padding: "14px 18px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            color: "#f0f0f0",
                            fontWeight: 600,
                            fontFamily: "'General Sans', sans-serif",
                            fontSize: 14,
                          }}
                        >
                          {"title" in c
                            ? c.title
                            : (c as { title: string }).title}
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            color: "rgba(240,240,240,0.4)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                          }}
                        >
                          Case #{i + 1} ·{" "}
                          {"evidenceIds" in c ? c.evidenceIds.length : 2}{" "}
                          evidence items
                        </p>
                      </div>
                      <span
                        style={{
                          padding: "2px 10px",
                          borderRadius: 20,
                          fontSize: 9,
                          fontFamily: "'JetBrains Mono', monospace",
                          background:
                            i % 2 === 0
                              ? "rgba(220,38,38,0.15)"
                              : "rgba(22,163,74,0.15)",
                          border: `1px solid ${i % 2 === 0 ? "rgba(220,38,38,0.4)" : "rgba(22,163,74,0.4)"}`,
                          color: i % 2 === 0 ? "#DC2626" : "#16A34A",
                        }}
                      >
                        {i % 2 === 0 ? "OPEN" : "SEALED"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "rgba(240,240,240,0.5)",
                    marginBottom: 16,
                    letterSpacing: "0.1em",
                  }}
                >
                  CASE STATUS
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {donutData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#13131a",
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#f0f0f0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "rgba(240,240,240,0.5)",
                    marginBottom: 16,
                    letterSpacing: "0.1em",
                  }}
                >
                  EVIDENCE BY TYPE
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <XAxis
                      dataKey="type"
                      tick={{ fill: "rgba(240,240,240,0.4)", fontSize: 10 }}
                    />
                    <YAxis
                      tick={{ fill: "rgba(240,240,240,0.4)", fontSize: 10 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#13131a",
                        border: "1px solid rgba(220,38,38,0.3)",
                        color: "#f0f0f0",
                      }}
                    />
                    <Bar dataKey="count" fill="#DC2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const mockEvidence = [
  {
    fileName: "screenshot_fraud.png",
    fileType: "image/png",
    sha256Hash: "a3f9d8e1b2c4f7a9d3e5b8c2f1a4d7e9b3c6",
    timestamp: BigInt(Date.now() * 1_000_000),
  },
  {
    fileName: "transaction_log.pdf",
    fileType: "application/pdf",
    sha256Hash: "b7e2a1c5f8d4b9e3a6c2f5d8b1e4a7c3f6d9",
    timestamp: BigInt(Date.now() * 1_000_000),
  },
  {
    fileName: "network_capture.pcap",
    fileType: "application/octet-stream",
    sha256Hash: "c1d4e7b9f2a5c8e1d4b7f3a6c9e2b5d8f1a4",
    timestamp: BigInt(Date.now() * 1_000_000),
  },
];

const mockCases = [
  {
    title: "Operation CyberShield",
    status: "open",
    evidenceIds: [BigInt(1), BigInt(2)],
  },
  { title: "Financial Fraud Ring", status: "closed", evidenceIds: [BigInt(3)] },
  {
    title: "Identity Theft Ring",
    status: "open",
    evidenceIds: [BigInt(4), BigInt(5), BigInt(6)],
  },
  {
    title: "Phishing Campaign Delta",
    status: "closed",
    evidenceIds: [BigInt(7)],
  },
];

function CaseCard({
  caseItem,
  expanded,
  onToggle,
  onSeal,
  index,
}: {
  caseItem:
    | CaseRecord
    | {
        caseId: bigint;
        title: string;
        description: string;
        status: import("../backend.d").CaseStatus;
        createdAt: bigint;
        createdBy: import("@icp-sdk/core/principal").Principal;
        evidenceIds: bigint[];
      };
  expanded: boolean;
  onToggle: () => void;
  onSeal: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        marginBottom: 12,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#f0f0f0",
              fontWeight: 600,
              fontFamily: "'General Sans', sans-serif",
            }}
          >
            {caseItem.title}
          </p>
          <p
            style={{
              margin: "3px 0 0",
              color: "rgba(240,240,240,0.4)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
            }}
          >
            Case #{String(caseItem.caseId)} · {caseItem.evidenceIds.length}{" "}
            evidence items
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Badge
            style={{
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.3)",
              color: "#DC2626",
              fontSize: 9,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            OPEN
          </Badge>
          <span style={{ color: "rgba(240,240,240,0.4)", fontSize: 16 }}>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            padding: "0 20px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p
            style={{
              color: "rgba(240,240,240,0.6)",
              fontSize: 13,
              fontFamily: "'General Sans', sans-serif",
              marginTop: 12,
            }}
          >
            {caseItem.description}
          </p>
          <div
            style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}
          >
            {caseItem.evidenceIds.map((id) => (
              <span
                key={String(id)}
                style={{
                  padding: "2px 8px",
                  borderRadius: 6,
                  background: "rgba(22,163,74,0.12)",
                  border: "1px solid rgba(22,163,74,0.3)",
                  color: "#16A34A",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                }}
              >
                EV#{String(id)}
              </span>
            ))}
          </div>
          <Button
            onClick={onSeal}
            data-ocid="investigator.delete_button.1"
            size="sm"
            style={{
              marginTop: 14,
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.4)",
              color: "#DC2626",
            }}
          >
            Seal Case
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
