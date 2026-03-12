import { Eye, Gavel, Globe, Hash, Shield, Users } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import RedRotation3DBG from "../components/RedRotation3DBG";
import { useLang } from "../contexts/LanguageContext";

export default function About() {
  const { t } = useLang();

  const techs = [
    {
      icon: Shield,
      titleKey: "techIcpTitle" as const,
      descKey: "techIcpDesc" as const,
    },
    {
      icon: Hash,
      titleKey: "techShaTitle" as const,
      descKey: "techShaDesc" as const,
    },
    {
      icon: Users,
      titleKey: "techRbacTitle" as const,
      descKey: "techRbacDesc" as const,
    },
    {
      icon: Globe,
      titleKey: "techStorageTitle" as const,
      descKey: "techStorageDesc" as const,
    },
  ];

  const useCases = [
    {
      icon: Shield,
      titleKey: "useLawTitle" as const,
      descKey: "useLawDesc" as const,
      color: "#DC2626",
    },
    {
      icon: Eye,
      titleKey: "useForensicsTitle" as const,
      descKey: "useForensicsDesc" as const,
      color: "#DC2626",
    },
    {
      icon: Gavel,
      titleKey: "useJudiciaryTitle" as const,
      descKey: "useJudiciaryDesc" as const,
      color: "#16A34A",
    },
  ];

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
        {/* Page hero */}
        <section
          className="py-24 px-4 text-center cyber-grid"
          style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-mono"
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#DC2626",
              }}
            >
              <Shield className="w-3.5 h-3.5" />
              {t("aboutTagline")}
            </div>
            <h1
              className="section-heading text-4xl md:text-5xl mb-6"
              style={{ color: "#f0f0f0" }}
            >
              {t("aboutHeroTitle")}{" "}
              <span style={{ color: "#DC2626" }}>
                {t("aboutHeroTitleHighlight")}
              </span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(240,240,240,0.6)", lineHeight: 1.8 }}
            >
              {t("aboutHeroDesc")}
            </p>
          </motion.div>
        </section>

        {/* Mission */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2
                  className="section-heading text-3xl mb-6"
                  style={{ color: "#f0f0f0" }}
                >
                  {t("ourMission")}{" "}
                  <span style={{ color: "#DC2626" }}>
                    {t("ourMissionHighlight")}
                  </span>
                </h2>
                <p
                  className="text-base mb-4"
                  style={{ color: "rgba(240,240,240,0.65)", lineHeight: 1.8 }}
                >
                  {t("missionDesc1")}
                </p>
                <p
                  className="text-base"
                  style={{ color: "rgba(240,240,240,0.65)", lineHeight: 1.8 }}
                >
                  {t("missionDesc2")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass p-8"
              >
                <div
                  className="font-mono text-xs mb-3"
                  style={{ color: "rgba(220,38,38,0.7)" }}
                >
                  {t("systemStats")}
                </div>
                {[
                  [t("statEvidenceRecords"), "10,000+"],
                  [t("statHashVerifications"), "48,200+"],
                  [t("statTamperAttempts"), "132"],
                  [t("statActiveAgencies"), "150+"],
                  [t("statSystemUptime"), "99.9%"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between py-2"
                    style={{ borderBottom: "1px solid rgba(240,240,240,0.06)" }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: "rgba(240,240,240,0.55)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-mono font-semibold text-sm"
                      style={{ color: "#f0f0f0" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-20 px-4 cyber-grid">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="section-heading text-3xl md:text-4xl mb-4"
                style={{ color: "#f0f0f0" }}
              >
                {t("techStack")}{" "}
                <span style={{ color: "#DC2626" }}>
                  {t("techStackHighlight")}
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techs.map((tech, i) => (
                <motion.div
                  key={tech.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 flex gap-5"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: "rgba(220,38,38,0.1)" }}
                  >
                    <tech.icon
                      className="w-6 h-6"
                      style={{ color: "#DC2626" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-display font-semibold text-base mb-2"
                      style={{ color: "#f0f0f0" }}
                    >
                      {t(tech.titleKey)}
                    </h3>
                    <p
                      className="text-sm"
                      style={{
                        color: "rgba(240,240,240,0.55)",
                        lineHeight: 1.7,
                      }}
                    >
                      {t(tech.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="section-heading text-3xl md:text-4xl mb-4"
                style={{ color: "#f0f0f0" }}
              >
                {t("whoUses")} <span style={{ color: "#DC2626" }}>DEPS</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.titleKey}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="glass text-center p-8"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: `${uc.color}18`,
                      border: `2px solid ${uc.color}44`,
                    }}
                  >
                    <uc.icon className="w-7 h-7" style={{ color: uc.color }} />
                  </div>
                  <h3
                    className="font-display font-semibold text-lg mb-3"
                    style={{ color: "#f0f0f0" }}
                  >
                    {t(uc.titleKey)}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(240,240,240,0.55)", lineHeight: 1.7 }}
                  >
                    {t(uc.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
