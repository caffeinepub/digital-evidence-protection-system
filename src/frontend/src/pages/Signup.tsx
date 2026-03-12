import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Loader2, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UserRole } from "../backend";
import CyberBackground from "../components/CyberBackground";
import { useLang } from "../contexts/LanguageContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Signup() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { login, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor } = useActor();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const [displayName, setDisplayName] = useState("");
  const [department, setDepartment] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [role, setRole] = useState<string>("officer");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = async () => {
    if (!actor || !identity) return;
    setSaving(true);
    try {
      await actor.saveCallerUserProfile({
        userId: identity.getPrincipal(),
        displayName,
        department,
        badgeNumber,
        role: role as UserRole,
      });
      setSaved(true);
      toast.success("Profile saved successfully!");
      setTimeout(() => void navigate({ to: "/dashboard" }), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.12)",
        }}
      />
      <div
        className="cyber-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.4 }}
      />
      <CyberBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass p-8">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(220,38,38,0.12)",
                border: "2px solid rgba(220,38,38,0.4)",
              }}
            >
              <Shield className="w-7 h-7" style={{ color: "#DC2626" }} />
            </div>
            <h1
              className="font-display font-bold text-xl"
              style={{ color: "#f0f0f0" }}
            >
              {t("signup")}
            </h1>
            <p
              className="text-xs font-mono mt-1"
              style={{ color: "rgba(220,38,38,0.7)" }}
            >
              OFFICER REGISTRATION
            </p>
          </div>

          {!isAuthenticated ? (
            <div className="text-center">
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                First, authenticate with Internet Identity to establish your
                secure identity.
              </p>
              <Button
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="w-full h-11"
                style={{ background: "#DC2626", color: "#fff", border: "none" }}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 w-4 h-4" /> Authenticate with
                    Internet Identity
                  </>
                )}
              </Button>
            </div>
          ) : saved ? (
            <div className="text-center py-6">
              <CheckCircle
                className="mx-auto mb-3 w-10 h-10"
                style={{ color: "#16A34A" }}
              />
              <p className="font-semibold" style={{ color: "#16A34A" }}>
                Profile saved!
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(240,240,240,0.5)" }}
              >
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="p-3 rounded-lg text-xs font-mono"
                style={{
                  background: "rgba(22,163,74,0.08)",
                  border: "1px solid rgba(22,163,74,0.25)",
                  color: "rgba(22,163,74,0.8)",
                }}
              >
                ✓ Authenticated as:{" "}
                {identity.getPrincipal().toString().slice(0, 20)}...
              </div>
              <div>
                <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                  {t("displayName")}
                </Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Inspector Arjun Singh"
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
                  {t("department")}
                </Label>
                <Input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Cyber Crimes Division, CBI"
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
                  {t("badgeNumber")}
                </Label>
                <Input
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  placeholder="CBI-2024-001"
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
                  {t("role")}
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger
                    className="mt-1.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(220,38,38,0.25)",
                      color: "#f0f0f0",
                    }}
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "#13131a",
                      border: "1px solid rgba(220,38,38,0.2)",
                    }}
                  >
                    <SelectItem value="officer" style={{ color: "#f0f0f0" }}>
                      Officer
                    </SelectItem>
                    <SelectItem
                      value="investigator"
                      style={{ color: "#f0f0f0" }}
                    >
                      Investigator
                    </SelectItem>
                    <SelectItem value="admin" style={{ color: "#f0f0f0" }}>
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={!displayName || saving}
                className="w-full h-11 mt-2"
                style={{ background: "#DC2626", color: "#fff", border: "none" }}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
