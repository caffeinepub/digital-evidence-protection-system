import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Clock,
  FolderOpen,
  IndianRupee,
  Loader2,
  Lock,
  Plus,
  Search,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CaseRecord } from "../backend";
import Footer from "../components/Footer";
import RedRotation3DBG from "../components/RedRotation3DBG";
import { useLang } from "../contexts/LanguageContext";
import { MOCK_CASES } from "../data/mockData";
import { useActor } from "../hooks/useActor";
import { formatTimestamp } from "../utils/crypto";

// Animated count-up hook
function useCountUp(target: number, duration = 1400, delay = 0) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - (1 - p) ** 3;
        setVal(Math.round(ease * target));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, delay]);
  return val;
}

function getFakeActivityLog(t: (k: string) => string) {
  return [
    {
      id: "a1",
      text: t("activityLog_a1"),
      time: t("activityLog_time1"),
      color: "#16A34A",
    },
    {
      id: "a2",
      text: t("activityLog_a2"),
      time: t("activityLog_time2"),
      color: "#16A34A",
    },
    {
      id: "a3",
      text: t("activityLog_a3"),
      time: t("activityLog_time3"),
      color: "#DC2626",
    },
    {
      id: "a4",
      text: t("activityLog_a4"),
      time: t("activityLog_time4"),
      color: "#FBBF24",
    },
    {
      id: "a5",
      text: t("activityLog_a5"),
      time: t("activityLog_time5"),
      color: "#16A34A",
    },
    {
      id: "a6",
      text: t("activityLog_a6"),
      time: t("activityLog_time6"),
      color: "#DC2626",
    },
    {
      id: "a7",
      text: t("activityLog_a7"),
      time: t("activityLog_time7"),
      color: "#FBBF24",
    },
    {
      id: "a8",
      text: t("activityLog_a8"),
      time: t("activityLog_time8"),
      color: "#DC2626",
    },
    {
      id: "a9",
      text: t("activityLog_a9"),
      time: t("activityLog_time9"),
      color: "#16A34A",
    },
    {
      id: "a10",
      text: t("activityLog_a10"),
      time: t("activityLog_time10"),
      color: "#16A34A",
    },
  ];
}

function KeyMetricCard({
  label,
  rawValue,
  display,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  rawValue: number;
  display?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  delay: number;
}) {
  const counted = useCountUp(rawValue, 1400, delay);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
      className="glass p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}30`,
        borderRadius: 12,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${color}18` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div
        className="font-display font-bold text-2xl leading-none mb-1"
        style={{ color: "#f0f0f0" }}
      >
        {display
          ? display.replace(/\d+/, counted.toLocaleString("en-IN"))
          : counted.toLocaleString("en-IN")}
      </div>
      <div className="text-xs" style={{ color: "rgba(240,240,240,0.45)" }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function CaseDashboard() {
  const { t } = useLang();
  const fakeActivityLog = getFakeActivityLog(t as (k: string) => string);
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: cases = [], isLoading } = useQuery<CaseRecord[]>({
    queryKey: ["allCases"],
    queryFn: async () => {
      const result = actor ? await actor.getAllCases() : [];
      return result.length > 0 ? result : MOCK_CASES;
    },
    enabled: !!actor && !isFetching,
  });

  const createMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.createCase(title, desc, null);
    },
    onSuccess: () => {
      toast.success("Case created successfully!");
      setTitle("");
      setDesc("");
      qc.invalidateQueries({ queryKey: ["allCases"] });
    },
    onError: () => toast.error("Failed to create case"),
  });

  const sealMut = useMutation({
    mutationFn: async (caseId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.sealCase(caseId);
    },
    onSuccess: () => {
      toast.success("Case sealed!");
      qc.invalidateQueries({ queryKey: ["allCases"] });
    },
  });

  const filtered = cases.filter(
    (c) =>
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.caseId.toString().includes(search),
  );

  // Use fake numbers for display
  const FAKE_TOTAL = 247;
  const FAKE_OPEN = 89;
  // Use fake numbers for progress bar display
  const openPct = (FAKE_OPEN / FAKE_TOTAL) * 100;

  return (
    <div
      style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <RedRotation3DBG />
      <div style={{ position: "relative", zIndex: 1 }}>
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h1
                className="section-heading text-3xl md:text-4xl mb-2"
                style={{ color: "#f0f0f0" }}
              >
                {t("dashboard")}
              </h1>
              <p style={{ color: "rgba(240,240,240,0.5)" }}>
                {t("manageCasesSubtitle")}
              </p>
            </motion.div>

            {/* Key Metrics — 6 cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <KeyMetricCard
                label={t("allCases")}
                rawValue={FAKE_TOTAL}
                icon={FolderOpen}
                color="#DC2626"
                delay={0}
              />
              <KeyMetricCard
                label={t("openCases")}
                rawValue={FAKE_OPEN}
                icon={Clock}
                color="#16A34A"
                delay={80}
              />
              <KeyMetricCard
                label={t("totalEvidence")}
                rawValue={1342}
                icon={Shield}
                color="#3B82F6"
                delay={160}
              />
              <KeyMetricCard
                label={t("arrestsMade")}
                rawValue={34}
                icon={UserCheck}
                color="#FBBF24"
                delay={240}
              />
              <KeyMetricCard
                label={t("victimsProtected")}
                rawValue={1847}
                icon={Users}
                color="#8B5CF6"
                delay={320}
              />
              <KeyMetricCard
                label={t("amountRecovered")}
                rawValue={23}
                display="₹2.3 Cr"
                icon={IndianRupee}
                color="#10B981"
                delay={400}
              />
            </div>

            {/* Mini case status bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="glass p-5 mb-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(220,38,38,0.15)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "rgba(240,240,240,0.5)" }}
                >
                  {t("caseStatusBreakdown")}
                </span>
                <div className="flex items-center gap-4">
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "#16A34A" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#16A34A" }}
                    />
                    {t("openLabel")}: {FAKE_OPEN}
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "#DC2626" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#DC2626" }}
                    />
                    {t("closedLabel")}: {FAKE_TOTAL - FAKE_OPEN}
                  </span>
                </div>
              </div>
              <div
                className="relative h-3 rounded-full overflow-hidden"
                style={{ background: "rgba(220,38,38,0.18)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #16A34A, #22c55e)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${openPct}%` }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.6,
                  }}
                />
              </div>
              <div
                className="flex justify-between mt-1.5 text-xs font-mono"
                style={{ color: "rgba(240,240,240,0.3)" }}
              >
                <span>0%</span>
                <span>
                  {Math.round(openPct)}
                  {t("pctOpenLabel")}
                </span>
                <span>100%</span>
              </div>
            </motion.div>

            {/* Priority Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                {
                  label: t("highPriority"),
                  value: 23,
                  color: "#DC2626",
                  bg: "rgba(220,38,38,0.12)",
                  icon: AlertTriangle,
                },
                {
                  label: t("mediumPriority"),
                  value: 41,
                  color: "#FBBF24",
                  bg: "rgba(251,191,36,0.12)",
                  icon: TrendingUp,
                },
                {
                  label: t("lowPriority"),
                  value: 25,
                  color: "#16A34A",
                  bg: "rgba(22,163,74,0.12)",
                  icon: Shield,
                },
              ].map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                  className="glass p-4 flex items-center gap-3"
                  style={{
                    background: p.bg,
                    border: `1px solid ${p.color}30`,
                    borderRadius: 10,
                  }}
                >
                  <p.icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: p.color }}
                  />
                  <div>
                    <div
                      className="font-display font-bold text-xl leading-none"
                      style={{ color: p.color }}
                    >
                      {p.value}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(240,240,240,0.5)" }}
                    >
                      {p.label}
                    </div>
                  </div>
                  <Badge
                    className="ml-auto text-xs"
                    style={{
                      background: `${p.color}18`,
                      color: p.color,
                      border: `1px solid ${p.color}40`,
                    }}
                  >
                    {t("casesLabel")}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <Tabs defaultValue="cases">
              <TabsList
                className="mb-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(220,38,38,0.2)",
                }}
              >
                <TabsTrigger
                  value="cases"
                  data-ocid="case.tab"
                  style={{ color: "rgba(240,240,240,0.7)" }}
                >
                  {t("cases")}
                </TabsTrigger>
                <TabsTrigger
                  value="create"
                  data-ocid="case.tab"
                  style={{ color: "rgba(240,240,240,0.7)" }}
                >
                  {t("createCase")}
                </TabsTrigger>
                <TabsTrigger
                  value="log"
                  data-ocid="case.tab"
                  style={{ color: "rgba(240,240,240,0.7)" }}
                >
                  {t("activityLog")}
                </TabsTrigger>
              </TabsList>

              {/* Cases list */}
              <TabsContent value="cases">
                <div className="mb-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgba(220,38,38,0.6)" }}
                    />
                    <Input
                      data-ocid="case.search_input"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t("searchEvidence")}
                      className="pl-9"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(220,38,38,0.25)",
                        color: "#f0f0f0",
                      }}
                    />
                  </div>
                </div>

                {isLoading ? (
                  <div
                    className="flex justify-center py-12"
                    data-ocid="case.loading_state"
                  >
                    <Loader2
                      className="w-8 h-8 animate-spin"
                      style={{ color: "#DC2626" }}
                    />
                  </div>
                ) : filtered.length === 0 ? (
                  <div
                    className="glass text-center py-12"
                    data-ocid="case.empty_state"
                  >
                    <FolderOpen
                      className="mx-auto mb-3 w-10 h-10"
                      style={{ color: "rgba(220,38,38,0.4)" }}
                    />
                    <p style={{ color: "rgba(240,240,240,0.45)" }}>
                      {t("noCasesFound")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filtered.map((c, idx) => (
                      <motion.div
                        key={c.caseId.toString()}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="glass"
                        data-ocid={`case.item.${idx + 1}`}
                      >
                        <div
                          className="flex items-center gap-4 p-4 cursor-pointer"
                          onClick={() =>
                            setExpanded(
                              expanded === c.caseId.toString()
                                ? null
                                : c.caseId.toString(),
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              setExpanded(
                                expanded === c.caseId.toString()
                                  ? null
                                  : c.caseId.toString(),
                              );
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(220,38,38,0.1)" }}
                          >
                            <FolderOpen
                              className="w-4 h-4"
                              style={{ color: "#DC2626" }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-semibold truncate"
                              style={{ color: "#f0f0f0" }}
                            >
                              {c.title}
                            </div>
                            <div
                              className="text-xs font-mono"
                              style={{ color: "rgba(240,240,240,0.4)" }}
                            >
                              ID: {c.caseId.toString()} · Evidence:{" "}
                              {c.evidenceIds.length}
                            </div>
                          </div>
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
                          <Button
                            size="sm"
                            data-ocid={`case.delete_button.${idx + 1}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              sealMut.mutate(c.caseId);
                            }}
                            disabled={
                              c.status === "closed" || sealMut.isPending
                            }
                            className="text-xs"
                            style={{
                              background: "transparent",
                              border: "1px solid rgba(220,38,38,0.3)",
                              color: "#DC2626",
                            }}
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            {t("sealCase")}
                          </Button>
                          {expanded === c.caseId.toString() ? (
                            <ChevronDown
                              className="w-4 h-4 flex-shrink-0"
                              style={{ color: "rgba(240,240,240,0.4)" }}
                            />
                          ) : (
                            <ChevronRight
                              className="w-4 h-4 flex-shrink-0"
                              style={{ color: "rgba(240,240,240,0.4)" }}
                            />
                          )}
                        </div>

                        {expanded === c.caseId.toString() && (
                          <div
                            className="px-4 pb-4"
                            style={{
                              borderTop: "1px solid rgba(220,38,38,0.1)",
                            }}
                          >
                            <p
                              className="text-sm mt-3 mb-2"
                              style={{ color: "rgba(240,240,240,0.6)" }}
                            >
                              {c.description || t("noDescriptionProvided")}
                            </p>
                            <div
                              className="text-xs font-mono"
                              style={{ color: "rgba(240,240,240,0.35)" }}
                            >
                              {t("createdLabel")}:{" "}
                              {formatTimestamp(c.createdAt)}
                            </div>
                            <div className="mt-3">
                              <div
                                className="text-xs font-semibold mb-2"
                                style={{ color: "rgba(220,38,38,0.8)" }}
                              >
                                {t("evidenceIdsLabel")} ({c.evidenceIds.length})
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {c.evidenceIds.length === 0 ? (
                                  <span
                                    className="text-xs"
                                    style={{ color: "rgba(240,240,240,0.35)" }}
                                  >
                                    {t("noEvidenceAttached")}
                                  </span>
                                ) : (
                                  c.evidenceIds.map((id) => (
                                    <span
                                      key={id.toString()}
                                      className="font-mono text-xs px-2 py-0.5 rounded"
                                      style={{
                                        background: "rgba(220,38,38,0.1)",
                                        color: "rgba(220,38,38,0.8)",
                                      }}
                                    >
                                      #{id.toString()}
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Create case */}
              <TabsContent value="create">
                <div className="glass p-8 max-w-xl">
                  <h3
                    className="font-display font-semibold text-lg mb-6"
                    style={{ color: "#f0f0f0" }}
                  >
                    {t("createCase")}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                        {t("caseTitleLabel")}
                      </Label>
                      <Input
                        data-ocid="case.input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Operation Cyber Shield 2024"
                        className="mt-1.5"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(220,38,38,0.25)",
                          color: "#f0f0f0",
                        }}
                      />
                    </div>
                    <div>
                      <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                        {t("description")}
                      </Label>
                      <Textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Case description, objectives, and relevant details..."
                        rows={4}
                        className="mt-1.5"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(220,38,38,0.25)",
                          color: "#f0f0f0",
                        }}
                      />
                    </div>
                    <Button
                      data-ocid="case.submit_button"
                      onClick={() => createMut.mutate()}
                      disabled={!title || createMut.isPending}
                      className="w-full h-11"
                      style={{
                        background: "#DC2626",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      {createMut.isPending ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                          {t("creatingLabel")}
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 w-4 h-4" /> {t("createCase")}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Activity log */}
              <TabsContent value="log">
                <div className="glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="font-display font-semibold"
                      style={{ color: "#DC2626" }}
                    >
                      {t("activityLog")}
                    </h3>
                    <Badge
                      style={{
                        background: "rgba(220,38,38,0.12)",
                        color: "#DC2626",
                        border: "1px solid rgba(220,38,38,0.3)",
                      }}
                    >
                      {fakeActivityLog.length + cases.slice(0, 20).length}{" "}
                      {t("entriesLabel")}
                    </Badge>
                  </div>

                  <div className="space-y-0">
                    {/* Fake rich log entries */}
                    {fakeActivityLog.map((entry, idx) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-start gap-3 py-2.5"
                        style={{
                          borderBottom: "1px solid rgba(240,240,240,0.05)",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: entry.color }}
                        />
                        <span
                          className="text-sm flex-1"
                          style={{ color: "rgba(240,240,240,0.75)" }}
                        >
                          {entry.text}
                        </span>
                        <span
                          className="font-mono text-xs whitespace-nowrap flex-shrink-0"
                          style={{ color: "rgba(240,240,240,0.3)" }}
                        >
                          {entry.time}
                        </span>
                      </motion.div>
                    ))}

                    {/* Real cases log */}
                    {cases.slice(0, 20).map((c) => (
                      <div
                        key={c.caseId.toString()}
                        className="flex items-center gap-3 py-2.5"
                        style={{
                          borderBottom: "1px solid rgba(240,240,240,0.05)",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            background:
                              c.status === "open" ? "#16A34A" : "#DC2626",
                          }}
                        />
                        <span
                          className="text-sm flex-1"
                          style={{ color: "rgba(240,240,240,0.7)" }}
                        >
                          Case{" "}
                          <span
                            className="font-mono text-xs"
                            style={{ color: "#DC2626" }}
                          >
                            #{c.caseId.toString()}
                          </span>{" "}
                          "{c.title}" — {c.status}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: "rgba(240,240,240,0.3)" }}
                        >
                          {formatTimestamp(c.createdAt)}
                        </span>
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
    </div>
  );
}
