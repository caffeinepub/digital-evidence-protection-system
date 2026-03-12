import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
import Footer from "../components/Footer";
import ThreeBackground3D from "../components/ThreeBackground3D";
import { useLang } from "../contexts/LanguageContext";

const CHART_TEXT = "rgba(240,240,240,0.6)";
const CHART_GRID = "rgba(255,255,255,0.05)";
const CHART_RED = "#DC2626";
const TOOLTIP_STYLE = {
  background: "rgba(10,10,15,0.95)",
  border: "1px solid rgba(220,38,38,0.3)",
  borderRadius: 6,
  color: "#f0f0f0",
  fontSize: 12,
  fontFamily: "JetBrains Mono, monospace",
};

type RecordStatus =
  | "In Progress"
  | "Pending"
  | "Verified"
  | "Under Review"
  | "Closed";

interface CaseRecord {
  id: string;
  title: string;
  status: RecordStatus;
  type: string;
  date: string;
  officer: string;
}

const FAKE_RECORDS: CaseRecord[] = [
  {
    id: "DEPS-2024-0091",
    title: "Rajesh Kumar Phishing Case",
    status: "In Progress",
    type: "Phishing",
    date: "2024-01-15",
    officer: "SI Vikram Singh",
  },
  {
    id: "DEPS-2024-0092",
    title: "Meena Sharma Financial Fraud",
    status: "Pending",
    type: "Financial Fraud",
    date: "2024-01-17",
    officer: "ASI Priya Yadav",
  },
  {
    id: "DEPS-2024-0093",
    title: "Arun Patel Identity Theft",
    status: "Verified",
    type: "Identity Theft",
    date: "2024-01-18",
    officer: "SI Deepak Tiwari",
  },
  {
    id: "DEPS-2024-0094",
    title: "Sunita Devi Online Scam",
    status: "Under Review",
    type: "Online Shopping Scam",
    date: "2024-01-20",
    officer: "ASI Nisha Gupta",
  },
  {
    id: "DEPS-2024-0095",
    title: "Amit Joshi Investment Fraud",
    status: "In Progress",
    type: "Investment Scam",
    date: "2024-01-22",
    officer: "SI Rahul Mehra",
  },
  {
    id: "DEPS-2024-0096",
    title: "Kavita Singh Lottery Scam",
    status: "Pending",
    type: "Lottery Scam",
    date: "2024-01-24",
    officer: "ASI Suresh Kumar",
  },
  {
    id: "DEPS-2024-0097",
    title: "Rohit Verma Ransomware",
    status: "Closed",
    type: "Ransomware",
    date: "2024-01-25",
    officer: "SI Anjali Sharma",
  },
  {
    id: "DEPS-2024-0098",
    title: "Priya Mishra Job Fraud",
    status: "In Progress",
    type: "Job Fraud",
    date: "2024-01-27",
    officer: "ASI Mohit Pandey",
  },
  {
    id: "DEPS-2024-0099",
    title: "Suresh Nair Cyber Bullying",
    status: "Under Review",
    type: "Cyber Bullying",
    date: "2024-01-28",
    officer: "SI Rekha Iyer",
  },
  {
    id: "DEPS-2024-0100",
    title: "Anita Khanna Romance Scam",
    status: "Verified",
    type: "Romance Scam",
    date: "2024-01-30",
    officer: "ASI Karan Malhotra",
  },
];

const STATUS_STYLES: Record<
  RecordStatus,
  { bg: string; border: string; color: string }
> = {
  "In Progress": {
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.5)",
    color: "#60a5fa",
  },
  Pending: {
    bg: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.5)",
    color: "#fb923c",
  },
  Verified: {
    bg: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.5)",
    color: "#4ade80",
  },
  "Under Review": {
    bg: "rgba(234,179,8,0.15)",
    border: "rgba(234,179,8,0.5)",
    color: "#facc15",
  },
  Closed: {
    bg: "rgba(107,114,128,0.15)",
    border: "rgba(107,114,128,0.5)",
    color: "#9ca3af",
  },
};

const EVIDENCE_BY_TYPE = [
  { name: "Phishing", count: 23 },
  { name: "Financial", count: 31 },
  { name: "Identity", count: 18 },
  { name: "Shopping", count: 14 },
  { name: "Investment", count: 22 },
  { name: "Job Fraud", count: 17 },
  { name: "Ransomware", count: 12 },
  { name: "Romance", count: 11 },
];

const CASE_STATUS_DIST = [
  { name: "Active", value: 37, fill: "#DC2626" },
  { name: "Pending", value: 52, fill: "#fb923c" },
  { name: "Verified", value: 59, fill: "#4ade80" },
];

const UPLOAD_TREND = [
  { day: "Mon", uploads: 12 },
  { day: "Tue", uploads: 19 },
  { day: "Wed", uploads: 15 },
  { day: "Thu", uploads: 28 },
  { day: "Fri", uploads: 22 },
  { day: "Sat", uploads: 9 },
  { day: "Sun", uploads: 7 },
];

function CountUp({
  target,
  duration = 1200,
}: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function ChartCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(220,38,38,0.2), 0 8px 32px rgba(0,0,0,0.4)",
        borderColor: "rgba(220,38,38,0.5)",
        transition: { duration: 0.2 },
      }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: 12,
        padding: "1.5rem",
        cursor: "default",
      }}
    >
      <h3
        className="text-sm font-mono uppercase tracking-wider mb-4"
        style={{ color: CHART_TEXT }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export default function AdminPanel() {
  const { t, lang } = useLang();

  const getStatusLabel = (status: RecordStatus): string => {
    if (lang === "hi") {
      const map: Record<RecordStatus, string> = {
        "In Progress": t("statusInProgress"),
        Pending: t("statusPending"),
        Verified: t("statusVerified"),
        "Under Review": t("statusUnderReview"),
        Closed: t("statusClosed"),
      };
      return map[status];
    }
    return status;
  };

  const stats = [
    {
      label: t("totalCases"),
      value: 148,
      color: "#DC2626",
      border: "rgba(220,38,38,0.3)",
    },
    {
      label: t("activeCasesCount"),
      value: 37,
      color: "#60a5fa",
      border: "rgba(59,130,246,0.3)",
    },
    {
      label: t("pendingCasesCount"),
      value: 52,
      color: "#fb923c",
      border: "rgba(249,115,22,0.3)",
    },
    {
      label: t("resolvedCases"),
      value: 59,
      color: "#4ade80",
      border: "rgba(34,197,94,0.3)",
    },
  ];

  return (
    <div
      data-ocid="admin.panel"
      style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* 3D rotating background — same as Home page */}
      <ThreeBackground3D />

      <section
        className="py-16 px-4"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
              ▸ ADMIN ACCESS
            </div>
            <h1
              className="font-display font-bold text-3xl md:text-4xl"
              style={{ color: "#f0f0f0" }}
            >
              {t("adminPanel")}
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: "rgba(240,240,240,0.45)" }}
            >
              {t("adminOverview")}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${s.border}`,
                  borderRadius: 12,
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  className="font-display font-bold text-3xl mb-1"
                  style={{ color: s.color }}
                >
                  <CountUp target={s.value} />
                </div>
                <div
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "rgba(240,240,240,0.5)" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Records Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#f0f0f0" }}
            >
              {t("adminRecords")}
            </h2>
            <div
              data-ocid="admin.records.table"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(220,38,38,0.2)",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}
                    >
                      {[
                        t("caseRecordId"),
                        t("caseRecordTitle"),
                        t("caseRecordStatus"),
                        t("caseRecordType"),
                        t("caseRecordDate"),
                        t("caseRecordOfficer"),
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap"
                          style={{ color: "rgba(220,38,38,0.7)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FAKE_RECORDS.map((rec, i) => {
                      const s = STATUS_STYLES[rec.status];
                      return (
                        <motion.tr
                          key={rec.id}
                          data-ocid={`admin.records.row.${i + 1}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.04 }}
                          style={{
                            borderBottom: "1px solid rgba(240,240,240,0.05)",
                          }}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td
                            className="px-4 py-3 font-mono text-xs"
                            style={{ color: "#DC2626" }}
                          >
                            {rec.id}
                          </td>
                          <td
                            className="px-4 py-3 max-w-[200px] truncate"
                            style={{ color: "#f0f0f0" }}
                          >
                            {rec.title}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              style={{
                                background: s.bg,
                                border: `1px solid ${s.border}`,
                                color: s.color,
                                fontSize: "11px",
                              }}
                            >
                              {getStatusLabel(rec.status)}
                            </Badge>
                          </td>
                          <td
                            className="px-4 py-3 text-xs"
                            style={{ color: "rgba(240,240,240,0.65)" }}
                          >
                            {rec.type}
                          </td>
                          <td
                            className="px-4 py-3 font-mono text-xs"
                            style={{ color: "rgba(240,240,240,0.5)" }}
                          >
                            {rec.date}
                          </td>
                          <td
                            className="px-4 py-3 text-xs"
                            style={{ color: "rgba(240,240,240,0.65)" }}
                          >
                            {rec.officer}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Graphs */}
          <div data-ocid="admin.graphs.section">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#f0f0f0" }}
            >
              {t("adminGraphs")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart: Evidence by Scam Type */}
              <ChartCard title={t("evidenceByType")}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={EVIDENCE_BY_TYPE}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={CHART_RED}
                          stopOpacity={1}
                        />
                        <stop
                          offset="100%"
                          stopColor={CHART_RED}
                          stopOpacity={0.3}
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
                      tick={{ fill: CHART_TEXT, fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                      angle={-25}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis
                      tick={{ fill: CHART_TEXT, fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      cursor={{ fill: "rgba(220,38,38,0.06)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#barGrad)"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive
                      animationDuration={900}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Donut Chart: Case Status Distribution */}
              <ChartCard title={t("caseStatusDist")}>
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={CASE_STATUS_DIST}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                        isAnimationActive
                        animationDuration={900}
                      >
                        {CASE_STATUS_DIST.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={entry.fill}
                            style={{
                              filter: "drop-shadow(0 0 4px rgba(0,0,0,0.4))",
                              cursor: "pointer",
                              transition: "filter 0.2s",
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 mt-3 justify-center">
                    {CASE_STATUS_DIST.map((d) => (
                      <div key={d.name} className="flex items-center gap-1.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: d.fill }}
                        />
                        <span className="text-xs" style={{ color: CHART_TEXT }}>
                          {d.name}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: "#f0f0f0" }}
                        >
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ChartCard>

              {/* Area Chart: 7-Day Upload Trend */}
              <ChartCard title={t("uploadTrend")}>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={UPLOAD_TREND}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={CHART_RED}
                          stopOpacity={0.4}
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
                      tick={{ fill: CHART_TEXT, fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: CHART_TEXT, fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      cursor={{ stroke: "rgba(220,38,38,0.3)", strokeWidth: 1 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="uploads"
                      stroke={CHART_RED}
                      strokeWidth={2}
                      fill="url(#areaGrad)"
                      dot={{ fill: CHART_RED, strokeWidth: 0, r: 4 }}
                      activeDot={{
                        r: 6,
                        fill: CHART_RED,
                        style: { filter: "drop-shadow(0 0 6px #DC2626)" },
                      }}
                      isAnimationActive
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
