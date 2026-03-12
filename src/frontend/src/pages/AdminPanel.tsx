import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  BarChart2,
  FolderOpen,
  Loader2,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CaseRecord, EvidenceRecord } from "../backend";
import Footer from "../components/Footer";
import { useLang } from "../contexts/LanguageContext";
import { MOCK_CASES, MOCK_EVIDENCE } from "../data/mockData";
import { useActor } from "../hooks/useActor";
import { formatFileSize, formatTimestamp, truncateHash } from "../utils/crypto";

const CHART_TEXT = "rgba(240,240,240,0.6)";
const CHART_GRID = "rgba(255,255,255,0.05)";
const CHART_RED = "#DC2626";
const CHART_GREEN = "#16A34A";

function ChartCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(220,38,38,0.15)",
      }}
    >
      <h3
        className="text-sm font-mono uppercase tracking-wider mb-5"
        style={{ color: CHART_TEXT }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

const CUSTOM_TOOLTIP_STYLE = {
  background: "rgba(10,10,15,0.95)",
  border: "1px solid rgba(220,38,38,0.3)",
  borderRadius: 6,
  color: "#f0f0f0",
  fontSize: 12,
  fontFamily: "JetBrains Mono, monospace",
};

export default function AdminPanel() {
  const { t } = useLang();
  const { actor, isFetching } = useActor();
  const [evidenceSearch, setEvidenceSearch] = useState("");
  const [caseSearch, setCaseSearch] = useState("");

  const { data: allEvidence = [], isLoading: evLoading } = useQuery<
    EvidenceRecord[]
  >({
    queryKey: ["adminEvidence"],
    queryFn: async () => {
      const r = actor ? await actor.getAllEvidence() : [];
      return r.length > 0 ? r : MOCK_EVIDENCE;
    },
    enabled: !!actor && !isFetching,
  });

  const { data: allCases = [], isLoading: caseLoading } = useQuery<
    CaseRecord[]
  >({
    queryKey: ["adminCases"],
    queryFn: async () => {
      const r = actor ? await actor.getAllCases() : [];
      return r.length > 0 ? r : MOCK_CASES;
    },
    enabled: !!actor && !isFetching,
  });

  const filteredEvidence = allEvidence.filter(
    (e) =>
      !evidenceSearch ||
      e.fileName.toLowerCase().includes(evidenceSearch.toLowerCase()) ||
      e.evidenceId.toString().includes(evidenceSearch) ||
      e.sha256Hash.includes(evidenceSearch),
  );

  const filteredCases = allCases.filter(
    (c) =>
      !caseSearch ||
      c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
      c.caseId.toString().includes(caseSearch),
  );

  // --- Analytics data ---
  const openCount = allCases.filter((c) => c.status === "open").length;
  const closedCount = allCases.filter((c) => c.status !== "open").length;
  const caseStatusData = [
    { name: "Open", value: openCount || 1, fill: CHART_GREEN },
    { name: "Closed", value: closedCount || 1, fill: CHART_RED },
  ];

  // Evidence by file type
  const fileTypeMap: Record<string, number> = {};
  for (const e of allEvidence) {
    const ft =
      e.fileType?.split("/")[1]?.toUpperCase() || e.fileType || "Other";
    fileTypeMap[ft] = (fileTypeMap[ft] || 0) + 1;
  }
  const fileTypeData =
    Object.entries(fileTypeMap).length > 0
      ? Object.entries(fileTypeMap).map(([name, count]) => ({ name, count }))
      : [
          { name: "PDF", count: 4 },
          { name: "PNG", count: 7 },
          { name: "MP4", count: 3 },
          { name: "ZIP", count: 2 },
          { name: "DOCX", count: 5 },
        ];

  // Upload timeline — 7-day mock
  const timelineData = [
    { day: "Mon", uploads: 2 },
    { day: "Tue", uploads: 5 },
    { day: "Wed", uploads: 3 },
    { day: "Thu", uploads: 8 },
    { day: "Fri", uploads: 4 },
    { day: "Sat", uploads: 6 },
    { day: "Sun", uploads: 9 },
  ];

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-mono"
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#DC2626",
              }}
            >
              <Shield className="w-3.5 h-3.5" /> ADMIN ACCESS
            </div>
            <h1
              className="section-heading text-3xl md:text-4xl"
              style={{ color: "#f0f0f0" }}
            >
              {t("admin")}
            </h1>
          </motion.div>

          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                label: t("totalEvidence"),
                value: allEvidence.length,
                icon: Shield,
                color: "#DC2626",
              },
              {
                label: t("allCases"),
                value: allCases.length,
                icon: FolderOpen,
                color: "#DC2626",
              },
              {
                label: t("openCases"),
                value: allCases.filter((c) => c.status === "open").length,
                icon: Activity,
                color: "#16A34A",
              },
              {
                label: "Verified",
                value: allEvidence.filter((e) => e.status === "active").length,
                icon: Shield,
                color: "#16A34A",
              },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                className="glass p-5 text-center"
              >
                <s.icon
                  className="mx-auto mb-2 w-6 h-6"
                  style={{ color: s.color }}
                />
                <div
                  className="font-display font-bold text-2xl"
                  style={{ color: "#f0f0f0" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(240,240,240,0.45)" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="evidence">
            <TabsList
              className="mb-6 flex-wrap h-auto"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(220,38,38,0.2)",
              }}
            >
              <TabsTrigger
                value="evidence"
                data-ocid="admin.tab"
                style={{ color: "rgba(240,240,240,0.7)" }}
              >
                <Shield className="w-3.5 h-3.5 mr-1.5" /> {t("evidence")}
              </TabsTrigger>
              <TabsTrigger
                value="cases"
                data-ocid="admin.tab"
                style={{ color: "rgba(240,240,240,0.7)" }}
              >
                <FolderOpen className="w-3.5 h-3.5 mr-1.5" /> {t("cases")}
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                data-ocid="admin.tab"
                style={{ color: "rgba(240,240,240,0.7)" }}
              >
                <Activity className="w-3.5 h-3.5 mr-1.5" /> {t("logs")}
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                data-ocid="admin.tab"
                style={{ color: "rgba(240,240,240,0.7)" }}
              >
                <BarChart2 className="w-3.5 h-3.5 mr-1.5" /> Analytics
              </TabsTrigger>
              <TabsTrigger
                value="users"
                data-ocid="admin.tab"
                style={{ color: "rgba(240,240,240,0.7)" }}
              >
                <Users className="w-3.5 h-3.5 mr-1.5" /> {t("users")}
              </TabsTrigger>
            </TabsList>

            {/* Evidence tab */}
            <TabsContent value="evidence">
              <div className="mb-4 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "rgba(220,38,38,0.6)" }}
                />
                <Input
                  data-ocid="admin.search_input"
                  value={evidenceSearch}
                  onChange={(e) => setEvidenceSearch(e.target.value)}
                  placeholder="Search by filename, ID, or hash..."
                  className="pl-9"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    color: "#f0f0f0",
                  }}
                />
              </div>

              {evLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2
                    className="w-8 h-8 animate-spin"
                    style={{ color: "#DC2626" }}
                  />
                </div>
              ) : filteredEvidence.length === 0 ? (
                <div
                  className="glass text-center py-12"
                  data-ocid="admin.empty_state"
                >
                  <p style={{ color: "rgba(240,240,240,0.45)" }}>
                    No evidence records found.
                  </p>
                </div>
              ) : (
                <div className="glass overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid rgba(220,38,38,0.15)",
                          }}
                        >
                          {[
                            "ID",
                            t("fileName"),
                            t("fileType"),
                            t("fileSize"),
                            "SHA-256",
                            t("status"),
                            t("timestamp"),
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider"
                              style={{ color: "rgba(220,38,38,0.7)" }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvidence.map((ev) => (
                          <tr
                            key={ev.evidenceId.toString()}
                            data-ocid="admin.row"
                            style={{
                              borderBottom: "1px solid rgba(240,240,240,0.05)",
                            }}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td
                              className="px-4 py-3 font-mono text-xs"
                              style={{ color: "#DC2626" }}
                            >
                              #{ev.evidenceId.toString()}
                            </td>
                            <td
                              className="px-4 py-3 max-w-[160px] truncate"
                              style={{ color: "#f0f0f0" }}
                            >
                              {ev.fileName}
                            </td>
                            <td
                              className="px-4 py-3 text-xs"
                              style={{ color: "rgba(240,240,240,0.6)" }}
                            >
                              {ev.fileType}
                            </td>
                            <td
                              className="px-4 py-3 text-xs font-mono"
                              style={{ color: "rgba(240,240,240,0.6)" }}
                            >
                              {formatFileSize(ev.fileSize)}
                            </td>
                            <td
                              className="px-4 py-3 font-mono text-xs"
                              style={{ color: "rgba(240,240,240,0.45)" }}
                            >
                              {truncateHash(ev.sha256Hash, 8)}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                style={{
                                  background:
                                    ev.status === "active"
                                      ? "rgba(22,163,74,0.15)"
                                      : "rgba(220,38,38,0.15)",
                                  color:
                                    ev.status === "active"
                                      ? "#16A34A"
                                      : "#DC2626",
                                  border: `1px solid ${
                                    ev.status === "active"
                                      ? "rgba(22,163,74,0.3)"
                                      : "rgba(220,38,38,0.3)"
                                  }`,
                                }}
                              >
                                {ev.status}
                              </Badge>
                            </td>
                            <td
                              className="px-4 py-3 text-xs font-mono"
                              style={{ color: "rgba(240,240,240,0.35)" }}
                            >
                              {formatTimestamp(ev.timestamp)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Cases tab */}
            <TabsContent value="cases">
              <div className="mb-4 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "rgba(220,38,38,0.6)" }}
                />
                <Input
                  value={caseSearch}
                  onChange={(e) => setCaseSearch(e.target.value)}
                  placeholder="Search cases..."
                  className="pl-9"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    color: "#f0f0f0",
                  }}
                />
              </div>

              {caseLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2
                    className="w-8 h-8 animate-spin"
                    style={{ color: "#DC2626" }}
                  />
                </div>
              ) : (
                <div className="glass overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid rgba(220,38,38,0.15)",
                          }}
                        >
                          {[
                            t("caseId"),
                            "Title",
                            t("status"),
                            "Evidence Count",
                            t("timestamp"),
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-xs font-mono uppercase"
                              style={{ color: "rgba(220,38,38,0.7)" }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCases.map((c) => (
                          <tr
                            key={c.caseId.toString()}
                            data-ocid="admin.row"
                            style={{
                              borderBottom: "1px solid rgba(240,240,240,0.05)",
                            }}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td
                              className="px-4 py-3 font-mono text-xs"
                              style={{ color: "#DC2626" }}
                            >
                              #{c.caseId.toString()}
                            </td>
                            <td
                              className="px-4 py-3"
                              style={{ color: "#f0f0f0" }}
                            >
                              {c.title}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                style={{
                                  background:
                                    c.status === "open"
                                      ? "rgba(22,163,74,0.15)"
                                      : "rgba(220,38,38,0.15)",
                                  color:
                                    c.status === "open" ? "#16A34A" : "#DC2626",
                                  border: `1px solid ${
                                    c.status === "open"
                                      ? "rgba(22,163,74,0.3)"
                                      : "rgba(220,38,38,0.3)"
                                  }`,
                                }}
                              >
                                {c.status}
                              </Badge>
                            </td>
                            <td
                              className="px-4 py-3 font-mono text-sm"
                              style={{ color: "rgba(240,240,240,0.6)" }}
                            >
                              {c.evidenceIds.length}
                            </td>
                            <td
                              className="px-4 py-3 font-mono text-xs"
                              style={{ color: "rgba(240,240,240,0.35)" }}
                            >
                              {formatTimestamp(c.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Logs tab */}
            <TabsContent value="logs">
              <div className="glass p-6">
                <h3 className="font-semibold mb-4" style={{ color: "#DC2626" }}>
                  Audit Trail
                </h3>
                <div className="space-y-2">
                  {[...allEvidence].slice(0, 30).map((ev) => (
                    <div
                      key={ev.evidenceId.toString()}
                      className="flex items-center gap-3 py-2"
                      style={{
                        borderBottom: "1px solid rgba(240,240,240,0.05)",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "#16A34A" }}
                      />
                      <span
                        className="text-sm flex-1"
                        style={{ color: "rgba(240,240,240,0.7)" }}
                      >
                        Evidence{" "}
                        <span
                          className="font-mono text-xs"
                          style={{ color: "#DC2626" }}
                        >
                          #{ev.evidenceId.toString()}
                        </span>{" "}
                        "{ev.fileName}" uploaded
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: "rgba(240,240,240,0.3)" }}
                      >
                        {formatTimestamp(ev.timestamp)}
                      </span>
                    </div>
                  ))}
                  {allEvidence.length === 0 && (
                    <p
                      className="text-sm"
                      style={{ color: "rgba(240,240,240,0.35)" }}
                    >
                      No audit entries.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Analytics tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Chart 1: Case Status Donut */}
                <ChartCard title="Case Status Overview">
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width={180} height={180}>
                      <PieChart>
                        <Pie
                          data={caseStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                          strokeWidth={0}
                          isAnimationActive
                          animationBegin={0}
                          animationDuration={900}
                        >
                          {caseStatusData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={CUSTOM_TOOLTIP_STYLE}
                          cursor={false}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div
                          className="text-3xl font-display font-bold"
                          style={{ color: "#f0f0f0" }}
                        >
                          {allCases.length || 2}
                        </div>
                        <div
                          className="text-xs font-mono"
                          style={{ color: CHART_TEXT }}
                        >
                          Total Cases
                        </div>
                      </div>
                      <div className="space-y-2">
                        {caseStatusData.map((d) => (
                          <div key={d.name} className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: d.fill }}
                            />
                            <span
                              className="text-xs"
                              style={{ color: CHART_TEXT }}
                            >
                              {d.name}
                            </span>
                            <span
                              className="text-xs font-mono ml-auto"
                              style={{ color: "#f0f0f0" }}
                            >
                              {d.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ChartCard>

                {/* Chart 2: Evidence by File Type */}
                <ChartCard title="Evidence by File Type">
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart
                      data={fileTypeData}
                      margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="barRedGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={CHART_RED}
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={CHART_RED}
                            stopOpacity={0.35}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={CHART_GRID}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: CHART_TEXT, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: CHART_TEXT, fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={CUSTOM_TOOLTIP_STYLE}
                        cursor={{ fill: "rgba(220,38,38,0.06)" }}
                      />
                      <Bar
                        dataKey="count"
                        fill="url(#barRedGrad)"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive
                        animationBegin={0}
                        animationDuration={900}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* Chart 3: Upload Timeline */}
              <ChartCard title="Upload Activity (7 Days)">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={timelineData}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="areaRedFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={CHART_RED}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor={CHART_RED}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={CHART_GRID}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: CHART_TEXT, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: CHART_TEXT, fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={CUSTOM_TOOLTIP_STYLE}
                      cursor={{ stroke: "rgba(220,38,38,0.3)", strokeWidth: 1 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="uploads"
                      stroke={CHART_RED}
                      strokeWidth={2}
                      fill="url(#areaRedFill)"
                      dot={{
                        fill: CHART_RED,
                        strokeWidth: 0,
                        r: 4,
                      }}
                      activeDot={{ r: 6, fill: CHART_RED }}
                      isAnimationActive
                      animationBegin={0}
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </TabsContent>

            {/* Users tab */}
            <TabsContent value="users">
              <div className="glass p-8 text-center">
                <Users
                  className="mx-auto mb-4 w-12 h-12"
                  style={{ color: "rgba(220,38,38,0.4)" }}
                />
                <h3
                  className="font-display font-semibold text-lg mb-2"
                  style={{ color: "#f0f0f0" }}
                >
                  User Management
                </h3>
                <p style={{ color: "rgba(240,240,240,0.45)" }}>
                  User management is handled via Internet Identity and on-chain
                  role assignments. Assign roles to principals via the canister
                  interface.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: t("admins"), color: "#DC2626" },
                    { label: t("investigators"), color: "#DC2626" },
                    { label: t("officers"), color: "#16A34A" },
                  ].map((r) => (
                    <div key={r.label} className="glass p-4 text-center">
                      <div
                        className="font-display font-bold text-2xl mb-1"
                        style={{ color: r.color }}
                      >
                        —
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(240,240,240,0.45)" }}
                      >
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
}
