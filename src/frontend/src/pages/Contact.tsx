import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Footer from "../components/Footer";
import PageAnimBG from "../components/PageAnimBG";
import { useLang } from "../contexts/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@deps.gov.in",
      sub: "Response within 24 hours",
    },
    {
      icon: Phone,
      label: "Helpline",
      value: "+91 1800-DEPS-GOV",
      sub: "Mon–Fri, 9AM–6PM IST",
    },
    {
      icon: MapPin,
      label: "HQ",
      value: "Cyber Crimes Division, New Delhi",
      sub: "Ministry of Home Affairs",
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
      <PageAnimBG />
      <div style={{ position: "relative", zIndex: 1 }}>
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1
                className="section-heading text-4xl md:text-5xl mb-4"
                style={{ color: "#f0f0f0" }}
              >
                {t("contact")}
              </h1>
              <p
                style={{
                  color: "rgba(240,240,240,0.5)",
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                Reach out to the DEPS team for support, onboarding, or technical
                inquiries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {sent ? (
                  <div
                    className="glass-green p-10 text-center"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle
                      className="mx-auto mb-4 w-12 h-12"
                      style={{ color: "#16A34A" }}
                    />
                    <h3
                      className="font-display font-bold text-xl mb-2"
                      style={{ color: "#16A34A" }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ color: "rgba(240,240,240,0.6)" }}>
                      We'll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      className="mt-6 text-sm"
                      style={{ color: "#16A34A", textDecoration: "underline" }}
                      onClick={() => setSent(false)}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass p-8">
                    <h2
                      className="font-display font-semibold text-xl mb-6"
                      style={{ color: "#f0f0f0" }}
                    >
                      Send a Message
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label style={{ color: "rgba(240,240,240,0.7)" }}>
                          {t("name")}
                        </Label>
                        <Input
                          data-ocid="contact.input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Inspector R.K. Sharma"
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
                          {t("email")}
                        </Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="officer@police.gov.in"
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
                          {t("message")}
                        </Label>
                        <Textarea
                          data-ocid="contact.textarea"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                          placeholder="Describe your inquiry or support request..."
                          className="mt-1.5"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(220,38,38,0.25)",
                            color: "#f0f0f0",
                          }}
                        />
                      </div>
                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={sending}
                        className="w-full h-11 font-semibold"
                        style={{
                          background: "#DC2626",
                          color: "#fff",
                          border: "none",
                        }}
                      >
                        {sending ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-4 h-4" /> {t("send")}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-5"
              >
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="glass p-6 flex items-center gap-5"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: "rgba(220,38,38,0.1)" }}
                    >
                      <info.icon
                        className="w-6 h-6"
                        style={{ color: "#DC2626" }}
                      />
                    </div>
                    <div>
                      <div
                        className="text-xs font-mono mb-0.5"
                        style={{ color: "rgba(220,38,38,0.7)" }}
                      >
                        {info.label}
                      </div>
                      <div
                        className="font-semibold"
                        style={{ color: "#f0f0f0" }}
                      >
                        {info.value}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(240,240,240,0.4)" }}
                      >
                        {info.sub}
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="glass p-6 mt-2"
                  style={{ background: "rgba(220,38,38,0.04)" }}
                >
                  <div
                    className="font-mono text-xs mb-3"
                    style={{ color: "rgba(220,38,38,0.7)" }}
                  >
                    SECURITY NOTICE
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(240,240,240,0.55)", lineHeight: 1.7 }}
                  >
                    For urgent security vulnerabilities or evidence-related
                    emergencies, please contact your designated agency liaison
                    directly. Do not transmit sensitive evidence details through
                    this form.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
