import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(6,6,10,0.98)",
        borderTop: "1px solid rgba(220,38,38,0.15)",
      }}
      className="py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: "#DC2626" }} />
            <span
              className="font-display font-bold text-sm"
              style={{ color: "#DC2626" }}
            >
              DEPS
            </span>
            <span
              className="text-xs"
              style={{ color: "rgba(240,240,240,0.4)" }}
            >
              — {t("appName")}
            </span>
          </div>

          <nav className="flex items-center gap-4">
            {[
              { to: "/", label: t("home") },
              { to: "/about", label: t("about") },
              { to: "/verify", label: t("verify") },
              { to: "/contact", label: t("contact") },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs transition-colors hover:text-white"
                style={{ color: "rgba(240,240,240,0.45)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs" style={{ color: "rgba(240,240,240,0.35)" }}>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: "rgba(220,38,38,0.7)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
