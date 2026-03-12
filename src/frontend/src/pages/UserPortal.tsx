import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CyberBackground from "../components/CyberBackground";

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
  "Other",
];

const steps = [
  { n: 1, label: "File Complaint" },
  { n: 2, label: "Case Assigned" },
  { n: 3, label: "Investigation" },
  { n: 4, label: "Resolution" },
];

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span>
      {displayed}
      <span
        style={{ animation: "blink 1s step-end infinite", color: "#3B82F6" }}
      >
        |
      </span>
    </span>
  );
}

export default function UserPortal() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    scamType: "",
    date: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [caseResult, setCaseResult] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.contact || !form.scamType || !form.description)
      return;
    setSubmitted(true);
  };

  const handleTrack = () => {
    if (!caseId.trim()) return;
    setCaseResult(true);
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
      <style>{"@keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }"}</style>
      <CyberBackground />

      {/* Blue/cyan floating orbs */}
      <motion.div
        animate={{ y: [0, -28, 0], x: [0, 16, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "12%",
          left: "5%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
        transition={{
          duration: 11,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "8%",
          right: "6%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px 24px",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 36, textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "rgba(59,130,246,0.7)",
              letterSpacing: "0.2em",
              marginBottom: 12,
            }}
          >
            DEPS · PUBLIC ACCESS
          </p>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(22px, 4vw, 40px)",
              fontWeight: 900,
              color: "#f0f0f0",
              letterSpacing: "0.04em",
              margin: "0 0 10px",
            }}
          >
            CITIZEN COMPLAINT PORTAL
          </h1>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: "rgba(59,130,246,0.8)",
            }}
          >
            <TypewriterText text="Submit · Track · Verify" />
          </p>
        </motion.div>

        {/* Process Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 0,
          }}
        >
          {steps.map((step, i) => (
            <div key={step.n} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background:
                      i === 0
                        ? "rgba(59,130,246,0.25)"
                        : "rgba(255,255,255,0.05)",
                    border: `2px solid ${i === 0 ? "#3B82F6" : "rgba(255,255,255,0.15)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    fontWeight: 700,
                    color: i === 0 ? "#3B82F6" : "rgba(240,240,240,0.4)",
                  }}
                >
                  {step.n}
                </motion.div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: i === 0 ? "#3B82F6" : "rgba(240,240,240,0.35)",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  style={{
                    height: 2,
                    background: "rgba(59,130,246,0.25)",
                    margin: "0 8px",
                    marginBottom: 24,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="complaint">
          <TabsList
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 24,
              width: "100%",
            }}
          >
            {["complaint", "track", "verify"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-ocid="user.tab"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  flex: 1,
                }}
              >
                {tab === "complaint"
                  ? "File Complaint"
                  : tab === "track"
                    ? "Track Case"
                    : "Verify Evidence"}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* File Complaint */}
          <TabsContent value="complaint">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  background: "rgba(22,163,74,0.06)",
                  border: "1px solid rgba(22,163,74,0.3)",
                  borderRadius: 16,
                }}
                data-ocid="user.success_state"
              >
                <CheckCircle2
                  style={{
                    width: 52,
                    height: 52,
                    color: "#16A34A",
                    margin: "0 auto 16px",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#f0f0f0",
                    marginBottom: 8,
                  }}
                >
                  Complaint Filed Successfully
                </h3>
                <p
                  style={{
                    color: "rgba(240,240,240,0.55)",
                    fontSize: 14,
                    fontFamily: "'General Sans', sans-serif",
                  }}
                >
                  Your complaint has been registered. You will receive a Case ID
                  within 24 hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 20,
                    background: "rgba(22,163,74,0.15)",
                    border: "1px solid rgba(22,163,74,0.4)",
                    color: "#16A34A",
                  }}
                >
                  File Another
                </Button>
              </motion.div>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {[
                  {
                    label: "Full Name",
                    key: "name",
                    type: "text",
                    placeholder: "Enter your full name",
                  },
                  {
                    label: "Contact / Email",
                    key: "contact",
                    type: "email",
                    placeholder: "Enter your email or phone",
                  },
                  {
                    label: "Incident Date",
                    key: "date",
                    type: "date",
                    placeholder: "",
                  },
                ].map(({ label, key, type, placeholder }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <label
                      htmlFor={`field-${key}`}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: "rgba(240,240,240,0.5)",
                        letterSpacing: "0.1em",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {label.toUpperCase()}
                    </label>
                    <Input
                      id={`field-${key}`}
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      placeholder={placeholder}
                      data-ocid="user.input"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#f0f0f0",
                      }}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24 }}
                >
                  <label
                    htmlFor="scam-type-select"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "rgba(240,240,240,0.5)",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    SCAM TYPE
                  </label>
                  <Select
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, scamType: v }))
                    }
                  >
                    <SelectTrigger
                      data-ocid="user.select"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: form.scamType
                          ? "#f0f0f0"
                          : "rgba(240,240,240,0.35)",
                      }}
                    >
                      <SelectValue placeholder="Select scam type" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "#13131a",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {scamTypes.map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          style={{ color: "#f0f0f0" }}
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 }}
                >
                  <label
                    htmlFor="incident-description"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "rgba(240,240,240,0.5)",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    INCIDENT DESCRIPTION
                  </label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Describe the incident in detail..."
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#f0f0f0",
                      minHeight: 100,
                    }}
                  />
                </motion.div>

                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "rgba(59,130,246,0.7)",
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: "rgba(59,130,246,0.07)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  💡 To attach evidence files, use the{" "}
                  <Link
                    to="/upload"
                    style={{ color: "#3B82F6", textDecoration: "underline" }}
                  >
                    Evidence Upload
                  </Link>{" "}
                  page.
                </p>

                <Button
                  onClick={handleSubmit}
                  data-ocid="user.submit_button"
                  style={{
                    background: "rgba(59,130,246,0.2)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    color: "#3B82F6",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    padding: "12px 0",
                  }}
                >
                  SUBMIT COMPLAINT
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Track Case */}
          <TabsContent value="track">
            <div style={{ maxWidth: 500, margin: "0 auto" }}>
              <label
                htmlFor="case-id-input"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "rgba(240,240,240,0.5)",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                ENTER CASE ID
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <Input
                  id="case-id-input"
                  value={caseId}
                  onChange={(e) => {
                    setCaseId(e.target.value);
                    setCaseResult(false);
                  }}
                  placeholder="e.g. DEPS-2024-0047"
                  data-ocid="user.search_input"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f0f0f0",
                  }}
                />
                <Button
                  onClick={handleTrack}
                  style={{
                    background: "rgba(59,130,246,0.2)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    color: "#3B82F6",
                    whiteSpace: "nowrap",
                  }}
                >
                  TRACK
                </Button>
              </div>

              {caseResult && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 24,
                    background: "rgba(59,130,246,0.07)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    borderRadius: 12,
                    padding: "20px 22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#f0f0f0",
                      }}
                    >
                      Case #{caseId}
                    </p>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 10,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: "rgba(217,119,6,0.15)",
                        border: "1px solid rgba(217,119,6,0.35)",
                        color: "#D97706",
                      }}
                    >
                      UNDER INVESTIGATION
                    </span>
                  </div>
                  {[
                    ["Status", "Under Investigation"],
                    ["Last Updated", new Date().toLocaleDateString()],
                    ["Assigned Officer", "Inspector Sharma"],
                    ["Department", "Cyber Crime Unit"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{ display: "flex", gap: 12, marginBottom: 8 }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: "rgba(240,240,240,0.4)",
                          minWidth: 120,
                        }}
                      >
                        {k}
                      </span>
                      <span
                        style={{
                          fontFamily: "'General Sans', sans-serif",
                          fontSize: 13,
                          color: "rgba(240,240,240,0.75)",
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* Verify Evidence */}
          <TabsContent value="verify">
            <div
              style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "rgba(59,130,246,0.06)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: 14,
                  padding: "32px 28px",
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "rgba(59,130,246,0.8)",
                    marginBottom: 14,
                    letterSpacing: "0.1em",
                  }}
                >
                  EVIDENCE VERIFICATION
                </p>
                <p
                  style={{
                    color: "rgba(240,240,240,0.65)",
                    fontFamily: "'General Sans', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  Use the Evidence Verification module to verify the SHA-256
                  hash of any uploaded file. This ensures the file has not been
                  tampered with since it was submitted.
                </p>
              </motion.div>
              <Link to="/verify">
                <Button
                  style={{
                    background: "rgba(59,130,246,0.2)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    color: "#3B82F6",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    padding: "12px 32px",
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> GO TO VERIFICATION
                  PAGE
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
