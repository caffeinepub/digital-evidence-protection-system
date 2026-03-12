import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  FolderOpen,
  Loader2,
  Lock,
  Plus,
  Search,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { CaseRecord } from "../backend";
import Footer from "../components/Footer";
import { useLang } from "../contexts/LanguageContext";
import { MOCK_CASES } from "../data/mockData";
import { useActor } from "../hooks/useActor";
import { formatTimestamp } from "../utils/crypto";

export default function CaseDashboard() {
  const { t } = useLang();
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

  const open = cases.filter((c) => c.status === "open").length;
  const closed = cases.length - open;
  const openPct = cases.length > 0 ? (open / cases.length) * 100 : 0;

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
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
              Manage cases and evidence records.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: t("allCases"), value: cases.length, icon: FolderOpen },
              { label: t("openCases"), value: open, icon: Clock },
              {
                label: t("totalEvidence"),
                value: cases.reduce((a, c) => a + c.evidenceIds.length, 0),
                icon: Shield,
              },
              {
                label: t("recentActivity"),
                value: cases.slice(0, 5).length,
                icon: Clock,
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
                className="glass p-5 text-center"
              >
                <s.icon
                  className="mx-auto mb-2 w-6 h-6"
                  style={{ color: "#DC2626" }}
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

          {/* Mini case status bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass p-5 mb-8"
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
                Case Status Breakdown
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
                  Open: {open}
                </span>
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "#DC2626" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#DC2626" }}
                  />
                  Closed: {closed}
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
                  delay: 0.5,
                }}
              />
            </div>
            <div
              className="flex justify-between mt-1.5 text-xs font-mono"
              style={{ color: "rgba(240,240,240,0.3)" }}
            >
              <span>0%</span>
              <span>{Math.round(openPct)}% open</span>
              <span>100%</span>
            </div>
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
                    No cases found.
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
                            color: c.status === "open" ? "#16A34A" : "#DC2626",
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
                          disabled={c.status === "closed" || sealMut.isPending}
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
                            {c.description || "No description provided."}
                          </p>
                          <div
                            className="text-xs font-mono"
                            style={{ color: "rgba(240,240,240,0.35)" }}
                          >
                            Created: {formatTimestamp(c.createdAt)}
                          </div>
                          <div className="mt-3">
                            <div
                              className="text-xs font-semibold mb-2"
                              style={{ color: "rgba(220,38,38,0.8)" }}
                            >
                              Evidence IDs ({c.evidenceIds.length})
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {c.evidenceIds.length === 0 ? (
                                <span
                                  className="text-xs"
                                  style={{ color: "rgba(240,240,240,0.35)" }}
                                >
                                  No evidence attached.
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
                      Case Title
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
                        Creating...
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
                <h3
                  className="font-display font-semibold mb-4"
                  style={{ color: "#DC2626" }}
                >
                  {t("activityLog")}
                </h3>
                {cases.length === 0 ? (
                  <p
                    className="text-sm"
                    style={{ color: "rgba(240,240,240,0.4)" }}
                  >
                    No activity yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {cases.slice(0, 20).map((c) => (
                      <div
                        key={c.caseId.toString()}
                        className="flex items-center gap-3 py-2"
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
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
}
