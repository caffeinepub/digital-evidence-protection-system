import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  Search,
  Shield,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import RedRotation3DBG from "../components/RedRotation3DBG";
import { useLang } from "../contexts/LanguageContext";
import { useActor } from "../hooks/useActor";
import { computeSHA256, truncateHash } from "../utils/crypto";

type VerifyResult = "match" | "mismatch" | null;

interface DemoEvidenceRecord {
  localId: string;
  blockchainId: string;
  hash: string;
  fileName: string;
  timestamp: string;
  scamType: string;
}

function lookupDemoRecord(id: string): DemoEvidenceRecord | null {
  try {
    const stored: DemoEvidenceRecord[] = JSON.parse(
      localStorage.getItem("demoEvidenceRecords") || "[]",
    );
    return (
      stored.find(
        (r) =>
          r.localId === id ||
          r.blockchainId === id ||
          r.blockchainId.toLowerCase() === id.toLowerCase(),
      ) ?? null
    );
  } catch {
    return null;
  }
}

export default function EvidenceVerification() {
  const { t } = useLang();
  const { actor } = useActor();

  const [evidenceId, setEvidenceId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [computedHash, setComputedHash] = useState("");
  const [storedHash, setStoredHash] = useState("");
  const [result, setResult] = useState<VerifyResult>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileChange = async (f: File) => {
    setFile(f);
    const hash = await computeSHA256(f);
    setComputedHash(hash);
  };

  const handleVerify = async () => {
    if (!evidenceId || !computedHash) return;
    setIsVerifying(true);
    setResult(null);
    try {
      if (actor) {
        // Real backend flow
        const record = await actor.getEvidence(BigInt(evidenceId));
        setStoredHash(record.sha256Hash);
        setResult(record.sha256Hash === computedHash ? "match" : "mismatch");
      } else {
        // Demo mode — look up from localStorage
        await new Promise((res) => setTimeout(res, 800)); // simulate latency
        const record = lookupDemoRecord(evidenceId.trim());
        if (!record) {
          toast.error(
            "Evidence record not found. Make sure you uploaded this file first and entered the correct Evidence ID or Blockchain ID.",
          );
          return;
        }
        setStoredHash(record.hash);
        setResult(record.hash === computedHash ? "match" : "mismatch");
      }
    } catch (err) {
      console.error(err);
      toast.error("Evidence record not found or invalid ID.");
    } finally {
      setIsVerifying(false);
    }
  };

  const triggerFileInput = () =>
    document.getElementById("verify-file-input")?.click();

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
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 text-center"
            >
              <h1
                className="section-heading text-3xl md:text-4xl mb-3"
                style={{ color: "#f0f0f0" }}
              >
                {t("verifyEvidence")}
              </h1>
              <p style={{ color: "rgba(240,240,240,0.5)" }}>
                {t("verifySubtitle")}
              </p>
            </motion.div>

            <div className="glass p-8">
              <div className="mb-5">
                <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                  {t("evidenceId")}
                </Label>
                <Input
                  data-ocid="verify.input"
                  value={evidenceId}
                  onChange={(e) => setEvidenceId(e.target.value)}
                  placeholder="Enter Evidence ID (e.g. EV-XXXXX or DEMO-CHAIN-XXXX)"
                  className="mt-1.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    color: "#f0f0f0",
                  }}
                />
                <p
                  className="mt-1.5 text-xs"
                  style={{ color: "rgba(240,240,240,0.35)" }}
                >
                  Use the Evidence ID (EV-XXXXX) or Blockchain ID
                  (DEMO-CHAIN-XXXX) shown after upload
                </p>
              </div>

              <div className="mb-6">
                <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                  {t("uploadFileComparison")}
                </Label>
                <div
                  data-ocid="verify.dropzone"
                  className="mt-1.5 rounded-xl border-2 border-dashed cursor-pointer text-center py-10 transition-all"
                  style={{
                    borderColor: file
                      ? "rgba(22,163,74,0.5)"
                      : "rgba(220,38,38,0.3)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onClick={triggerFileInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") triggerFileInput();
                  }}
                >
                  <input
                    id="verify-file-input"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileChange(f);
                    }}
                  />
                  {file ? (
                    <div>
                      <CheckCircle
                        className="mx-auto mb-2 w-8 h-8"
                        style={{ color: "#16A34A" }}
                      />
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#16A34A" }}
                      >
                        {file.name}
                      </p>
                      <p
                        className="font-mono text-xs mt-1"
                        style={{ color: "rgba(22,163,74,0.7)" }}
                      >
                        Hash: {truncateHash(computedHash)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload
                        className="mx-auto mb-2 w-8 h-8"
                        style={{ color: "rgba(220,38,38,0.5)" }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: "rgba(240,240,240,0.5)" }}
                      >
                        {t("clickToUploadComparison")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                data-ocid="verify.submit_button"
                onClick={handleVerify}
                disabled={!evidenceId || !computedHash || isVerifying}
                className="w-full h-11 font-semibold"
                style={{ background: "#DC2626", color: "#fff", border: "none" }}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                    {t("verifyingLabel")}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 w-4 h-4" /> {t("verifyEvidence")}
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={
                    result === "match"
                      ? "glass-green mt-6 p-6"
                      : "glass-red mt-6 p-6"
                  }
                  data-ocid={
                    result === "match"
                      ? "verify.success_state"
                      : "verify.error_state"
                  }
                >
                  <div className="flex items-center gap-3 mb-5">
                    {result === "match" ? (
                      <Shield
                        className="w-8 h-8"
                        style={{ color: "#16A34A" }}
                      />
                    ) : (
                      <AlertTriangle
                        className="w-8 h-8"
                        style={{ color: "#DC2626" }}
                      />
                    )}
                    <div>
                      <div
                        className="font-display font-bold text-lg"
                        style={{
                          color: result === "match" ? "#16A34A" : "#DC2626",
                        }}
                      >
                        {result === "match"
                          ? t("noTampering")
                          : t("tamperAlert")}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(240,240,240,0.5)" }}
                      >
                        {t("verifiedAtLabel")} {new Date().toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      [t("storedHashLabel"), storedHash],
                      [t("computedHashLabel"), computedHash],
                    ].map(([label, hash]) => (
                      <div key={label}>
                        <div
                          className="text-xs mb-1"
                          style={{ color: "rgba(240,240,240,0.45)" }}
                        >
                          {label}
                        </div>
                        <div
                          className="font-mono text-xs p-3 rounded-lg break-all"
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            color: result === "match" ? "#16A34A" : "#DC2626",
                            border: `1px solid ${
                              result === "match"
                                ? "rgba(22,163,74,0.25)"
                                : "rgba(220,38,38,0.25)"
                            }`,
                          }}
                        >
                          {hash}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
