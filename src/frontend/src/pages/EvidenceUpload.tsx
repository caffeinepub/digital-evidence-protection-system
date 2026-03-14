import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Banknote,
  Briefcase,
  Bug,
  CheckCircle,
  File,
  Gift,
  Heart,
  HelpCircle,
  Loader2,
  Mail,
  MessageSquareX,
  ShoppingCart,
  Upload,
  UserX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentType, SVGProps } from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import RedRotation3DBG from "../components/RedRotation3DBG";
import { useLang } from "../contexts/LanguageContext";
import type { TranslationKey } from "../contexts/LanguageContext";
import { useActor } from "../hooks/useActor";
import {
  computeSHA256,
  formatFileSize,
  generateEvidenceId,
} from "../utils/crypto";

type LucideIconType = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string; style?: React.CSSProperties }
>;

interface UploadedFile {
  file: File;
  hash: string;
  evidenceId: string;
  timestamp: string;
}

interface ScamTypeItem {
  key: TranslationKey;
  icon: LucideIconType;
  color: string;
}

const SCAM_TYPES: ScamTypeItem[] = [
  { key: "phishing", icon: Mail, color: "#EF4444" },
  { key: "financialInvestmentScam", icon: Banknote, color: "#F97316" },
  { key: "identityTheft", icon: UserX, color: "#8B5CF6" },
  { key: "shoppingScam", icon: ShoppingCart, color: "#06B6D4" },
  { key: "jobFraud", icon: Briefcase, color: "#D97706" },
  { key: "lotteryScam", icon: Gift, color: "#EC4899" },
  { key: "romanceScam", icon: Heart, color: "#F43F5E" },
  { key: "cyberBullying", icon: MessageSquareX, color: "#0EA5E9" },
  { key: "ransomware", icon: Bug, color: "#16A34A" },
  { key: "otherScam", icon: HelpCircle, color: "#9CA3AF" },
];

function generateDemoBlockchainId(): string {
  const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `DEMO-CHAIN-${hex}`;
}

export default function EvidenceUpload() {
  const { t } = useLang();
  const { actor } = useActor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedScamType, setSelectedScamType] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [description, setDescription] = useState("");
  const [caseId, setCaseId] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [activityLog, setActivityLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setActivityLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev,
    ]);

  const handleFile = async (file: File) => {
    setIsHashing(true);
    addLog(`Processing file: ${file.name}`);
    try {
      const hash = await computeSHA256(file);
      const evidenceId = generateEvidenceId();
      setUploadedFile({
        file,
        hash,
        evidenceId,
        timestamp: new Date().toISOString(),
      });
      addLog(`SHA-256 computed: ${hash.slice(0, 16)}...`);
      addLog(`Evidence ID assigned: ${evidenceId}`);
    } catch {
      toast.error("Failed to compute hash");
    } finally {
      setIsHashing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!uploadedFile || !selectedScamType) return;
    setIsUploading(true);
    addLog(`Scam Type: ${selectedScamType}`);
    addLog("Uploading evidence to blockchain...");
    try {
      if (actor) {
        // Real backend upload
        const { ExternalBlob } = await import("../backend");
        const bytes = new Uint8Array(await uploadedFile.file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes);
        const id = await actor.uploadEvidence(
          uploadedFile.file.name,
          uploadedFile.file.type || "application/octet-stream",
          BigInt(uploadedFile.file.size),
          uploadedFile.hash,
          `[${selectedScamType}] ${description}`,
          blob,
        );
        setSuccessId(id.toString());
        addLog(`Evidence successfully recorded. ID: ${id}`);
        toast.success("Evidence uploaded successfully!");
      } else {
        // Demo mode — simulate blockchain upload
        await new Promise((res) => setTimeout(res, 1400));
        const demoId = generateDemoBlockchainId();
        setSuccessId(demoId);
        addLog("Evidence recorded on demo blockchain.");
        addLog(`Demo Blockchain ID: ${demoId}`);

        // Save to localStorage so Verify Evidence page can look it up
        const stored = JSON.parse(
          localStorage.getItem("demoEvidenceRecords") || "[]",
        );
        stored.push({
          localId: uploadedFile.evidenceId,
          blockchainId: demoId,
          hash: uploadedFile.hash,
          fileName: uploadedFile.file.name,
          timestamp: uploadedFile.timestamp,
          scamType: selectedScamType,
        });
        localStorage.setItem("demoEvidenceRecords", JSON.stringify(stored));

        toast.success("Evidence uploaded successfully (demo mode)!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
      addLog(`Upload failed: ${err}`);
    } finally {
      setIsUploading(false);
    }
  };

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
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 text-center"
            >
              <h1
                className="section-heading text-3xl md:text-4xl mb-3"
                style={{ color: "#f0f0f0" }}
              >
                {t("uploadEvidence")}
              </h1>
              <p style={{ color: "rgba(240,240,240,0.5)" }}>
                {t("uploadEvidenceSubtitle")}
              </p>
            </motion.div>

            {/* Success banner */}
            <AnimatePresence>
              {successId && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-green p-5 mb-6 flex items-center gap-4"
                  data-ocid="evidence.success_state"
                >
                  <CheckCircle
                    className="w-6 h-6 flex-shrink-0"
                    style={{ color: "#16A34A" }}
                  />
                  <div>
                    <div className="font-semibold" style={{ color: "#16A34A" }}>
                      Evidence Uploaded Successfully
                    </div>
                    <div
                      className="font-mono text-xs mt-1"
                      style={{ color: "rgba(22,163,74,0.8)" }}
                    >
                      Blockchain ID: {successId}
                    </div>
                    {uploadedFile && (
                      <div
                        className="font-mono text-xs mt-0.5"
                        style={{ color: "rgba(22,163,74,0.65)" }}
                      >
                        Evidence ID: {uploadedFile.evidenceId} — use either ID
                        to verify
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSuccessId(null)}
                    className="ml-auto"
                    style={{ color: "rgba(22,163,74,0.7)" }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="glass p-8">
              {/* Scam Type Selector */}
              <div className="mb-8" data-ocid="evidence.scam_select">
                <div className="flex items-center justify-between mb-3">
                  <Label
                    className="text-base font-semibold"
                    style={{ color: "#f0f0f0" }}
                  >
                    {t("scamType")}
                    <span style={{ color: "#DC2626" }}> *</span>
                  </Label>
                  {!selectedScamType && (
                    <span
                      className="text-xs font-mono"
                      style={{ color: "rgba(220,38,38,0.7)" }}
                    >
                      {t("selectScamType")}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {SCAM_TYPES.map((scam, idx) => {
                    const isSelected = selectedScamType === scam.key;
                    const ScamIcon = scam.icon;
                    return (
                      <motion.button
                        key={scam.key}
                        type="button"
                        data-ocid={`scam_type.item.${idx + 1}`}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedScamType(scam.key)}
                        className="relative flex flex-col items-center justify-center gap-2 rounded-xl p-3 text-center cursor-pointer transition-all duration-200"
                        style={{
                          background: isSelected
                            ? "rgba(220,38,38,0.12)"
                            : "rgba(255,255,255,0.03)",
                          border: isSelected
                            ? "2px solid #DC2626"
                            : "2px solid rgba(255,255,255,0.08)",
                          boxShadow: isSelected
                            ? "0 0 18px rgba(220,38,38,0.25)"
                            : "none",
                          minHeight: "80px",
                        }}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: "#DC2626" }}
                          >
                            <CheckCircle
                              className="w-3 h-3"
                              style={{ color: "#fff" }}
                            />
                          </motion.div>
                        )}
                        <ScamIcon
                          className="w-5 h-5 flex-shrink-0"
                          style={{
                            color: isSelected
                              ? scam.color
                              : "rgba(240,240,240,0.45)",
                          }}
                        />
                        <span
                          className="text-xs font-medium leading-tight"
                          style={{
                            color: isSelected
                              ? "#f0f0f0"
                              : "rgba(240,240,240,0.5)",
                          }}
                        >
                          {t(scam.key)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {selectedScamType && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <span
                      className="text-xs"
                      style={{ color: "rgba(240,240,240,0.45)" }}
                    >
                      {t("scamType")}:
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(220,38,38,0.15)",
                        color: "#DC2626",
                        border: "1px solid rgba(220,38,38,0.3)",
                      }}
                    >
                      {t(selectedScamType as TranslationKey)}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Divider */}
              <div
                className="mb-6"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(220,38,38,0.25), transparent)",
                }}
              />

              {/* Drop zone */}
              <button
                type="button"
                data-ocid="evidence.dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed cursor-pointer text-center py-14 px-6 transition-all duration-200"
                style={{
                  borderColor: dragging ? "#DC2626" : "rgba(220,38,38,0.3)",
                  background: dragging
                    ? "rgba(220,38,38,0.05)"
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.tar,.gz"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
                {isHashing ? (
                  <Loader2
                    className="mx-auto mb-3 w-10 h-10 animate-spin"
                    style={{ color: "#DC2626" }}
                  />
                ) : (
                  <Upload
                    className="mx-auto mb-3 w-10 h-10"
                    style={{
                      color: dragging ? "#DC2626" : "rgba(220,38,38,0.5)",
                    }}
                  />
                )}
                <p
                  className="font-semibold"
                  style={{
                    color: dragging ? "#DC2626" : "rgba(240,240,240,0.7)",
                  }}
                >
                  {t("uploadFile")}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(240,240,240,0.35)" }}
                >
                  Drag & drop or click to select \u2014 Images, Videos,
                  Documents, Archives
                </p>
              </button>

              {/* File info */}
              {uploadedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(220,38,38,0.2)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <File className="w-5 h-5" style={{ color: "#DC2626" }} />
                    <span
                      className="font-semibold"
                      style={{ color: "#f0f0f0" }}
                    >
                      {uploadedFile.file.name}
                    </span>
                    <span
                      className="ml-auto text-xs mono"
                      style={{ color: "rgba(240,240,240,0.4)" }}
                    >
                      {formatFileSize(uploadedFile.file.size)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {[
                      [t("evidenceId"), uploadedFile.evidenceId],
                      [t("sha256Hash"), uploadedFile.hash],
                      [t("fileType"), uploadedFile.file.type || "Unknown"],
                      [t("timestamp"), uploadedFile.timestamp],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span
                          className="w-28 flex-shrink-0"
                          style={{ color: "rgba(240,240,240,0.45)" }}
                        >
                          {k}:
                        </span>
                        <span
                          className="font-mono break-all"
                          style={{ color: "rgba(240,240,240,0.8)" }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Form fields */}
              <div className="mt-6 space-y-4">
                <div>
                  <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                    {t("description")}
                  </Label>
                  <Textarea
                    data-ocid="evidence.textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the evidence, its source, and relevance to the case..."
                    rows={3}
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
                    {t("caseId")} (Optional)
                  </Label>
                  <Input
                    data-ocid="evidence.input"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    placeholder="e.g. 1234"
                    className="mt-1.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      color: "#f0f0f0",
                    }}
                  />
                </div>

                {!selectedScamType && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: "rgba(220,38,38,0.06)",
                      border: "1px solid rgba(220,38,38,0.2)",
                    }}
                    data-ocid="evidence.error_state"
                  >
                    <AlertCircle
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "#DC2626" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "rgba(220,38,38,0.9)" }}
                    >
                      {t("selectScamTypeFirst")}
                    </span>
                  </motion.div>
                )}

                <Button
                  data-ocid="evidence.submit_button"
                  onClick={handleSubmit}
                  disabled={!uploadedFile || isUploading || !selectedScamType}
                  className="w-full h-11 font-semibold text-sm"
                  style={{
                    background: "#DC2626",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                      {t("uploadingBlockchain")}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 w-4 h-4" /> {t("uploadEvidence")}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Activity log */}
            {activityLog.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 glass p-5"
              >
                <h3
                  className="font-display font-semibold text-sm mb-3"
                  style={{ color: "#DC2626" }}
                >
                  {t("activityLog")}
                </h3>
                <div className="space-y-1">
                  {activityLog.map((entry) => (
                    <p
                      key={entry}
                      className="font-mono text-xs"
                      style={{ color: "rgba(240,240,240,0.5)" }}
                    >
                      {entry}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
