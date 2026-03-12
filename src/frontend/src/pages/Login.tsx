import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import CyberBackground from "../components/CyberBackground";
import { useLang } from "../contexts/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Login() {
  const { t } = useLang();
  const navigate = useNavigate();
  const {
    login,
    identity,
    isLoggingIn,
    isLoginError,
    loginError,
    isInitializing,
  } = useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  useEffect(() => {
    if (isAuthenticated) void navigate({ to: "/" });
  }, [isAuthenticated, navigate]);

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
      {/* BG */}
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
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass p-10 text-center">
          {/* Logo */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{
              background: "rgba(220,38,38,0.12)",
              border: "2px solid rgba(220,38,38,0.4)",
            }}
          >
            <Shield className="w-8 h-8" style={{ color: "#DC2626" }} />
          </div>

          <h1
            className="font-display font-bold text-2xl mb-1"
            style={{ color: "#f0f0f0" }}
          >
            {t("appShort")}
          </h1>
          <p
            className="text-xs font-mono mb-8"
            style={{ color: "rgba(220,38,38,0.7)" }}
          >
            SECURE ACCESS PORTAL
          </p>

          {isLoginError && (
            <div
              className="flex items-center gap-2 p-3 rounded-lg mb-5 text-sm"
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#DC2626",
              }}
              data-ocid="login.error_state"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {loginError?.message || "Authentication failed"}
            </div>
          )}

          <p
            className="text-sm mb-8"
            style={{ color: "rgba(240,240,240,0.5)" }}
          >
            Authenticate using Internet Identity — a secure, decentralized login
            system that requires no password.
          </p>

          <Button
            data-ocid="login.submit_button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            className="w-full h-12 font-semibold text-base mb-4"
            style={{ background: "#DC2626", color: "#fff", border: "none" }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />{" "}
                Authenticating...
              </>
            ) : (
              <>
                <Shield className="mr-2 w-5 h-5" /> {t("login")} with Internet
                Identity
              </>
            )}
          </Button>

          <p className="text-xs" style={{ color: "rgba(240,240,240,0.35)" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:text-white transition-colors"
              style={{ color: "rgba(220,38,38,0.7)" }}
            >
              {t("signup")}
            </Link>
          </p>

          <div
            className="mt-8 pt-6 text-xs font-mono"
            style={{
              borderTop: "1px solid rgba(240,240,240,0.08)",
              color: "rgba(240,240,240,0.25)",
            }}
          >
            DEPS v2.4.1 · ICP Mainnet · TLS 1.3
          </div>
        </div>
      </motion.div>
    </div>
  );
}
