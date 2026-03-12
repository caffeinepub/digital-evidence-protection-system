import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "../contexts/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/about", label: t("about") },
    { to: "/upload", label: t("upload") },
    { to: "/verify", label: t("verify") },
    { to: "/dashboard", label: t("dashboard") },
    { to: "/role-portal", label: "My Portal" },
    { to: "/admin", label: t("admin") },
    { to: "/contact", label: t("contact") },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,10,15,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(220,38,38,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <img
              src="/assets/generated/deps-logo-transparent.dim_120x120.png"
              alt="DEPS Logo"
              className="w-9 h-9 object-contain"
            />
            <span
              className="font-display font-bold text-lg tracking-wider"
              style={{ color: "#DC2626" }}
            >
              DEPS
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(link.to)
                    ? "#DC2626"
                    : "rgba(240,240,240,0.75)",
                  background: isActive(link.to)
                    ? "rgba(220,38,38,0.1)"
                    : "transparent",
                  borderBottom: isActive(link.to)
                    ? "1px solid rgba(220,38,38,0.5)"
                    : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.toggle"
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded-md transition-all duration-200"
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#DC2626",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "en"
                ? "EN | \u0939\u093f\u0902\u0926\u0940"
                : "\u0939\u093f\u0902\u0926\u0940 | EN"}
            </button>

            {isAuthenticated ? (
              <Button
                size="sm"
                onClick={clear}
                data-ocid="nav.button"
                className="text-xs font-semibold"
                style={{
                  background: "transparent",
                  border: "1px solid #DC2626",
                  color: "#DC2626",
                }}
              >
                {t("logout")}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                data-ocid="nav.button"
                className="text-xs font-semibold"
                style={{ background: "#DC2626", color: "#fff", border: "none" }}
              >
                {isLoggingIn ? "..." : t("login")}
              </Button>
            )}

            <button
              type="button"
              className="lg:hidden p-1.5 rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "#DC2626" }}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden px-4 pb-4 pt-2"
          style={{ borderTop: "1px solid rgba(220,38,38,0.15)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
              className="block px-3 py-2.5 rounded-md text-sm font-medium mb-1 transition-all"
              style={{
                color: isActive(link.to) ? "#DC2626" : "rgba(240,240,240,0.8)",
                background: isActive(link.to)
                  ? "rgba(220,38,38,0.1)"
                  : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
