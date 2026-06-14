import { useState, useRef } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// 📊  Google Sheets backend — messages go straight into YOUR Google Sheet
//     NO email access required. No third-party controls your account.
//     Setup guide is in the artifact: google_sheets_setup.md
//
//     After setup, paste your Google Apps Script Web App URL here:
// ─────────────────────────────────────────────────────────────────────────────
const SHEET_URL = "https://script.google.com/macros/s/AKfycbyzD-oBltDGiRnQyHWlxD0QwqyRVLHgC0V0WEL0_H73Gmq24e-Zo5PcVOe7dkXsrsFL/exec" as string; 

const CONTACT_INFO = [
  {
    label: "Email", value: "umangpandey.co@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=umangpandey.co@gmail.com",
    id: "contact-email",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  },
  {
    label: "Phone", value: "+91 7518593228",
    href: "tel:+917518593228",
    id: "contact-phone",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91A16 16 0 0016.09 17.1l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0124 18h-2v-1.08z"/></svg>,
  },
  {
    label: "Location", value: "Ghaziabad, Uttar Pradesh, India",
    href: "https://maps.google.com/?q=Ghaziabad",
    id: "contact-location",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    label: "LinkedIn", value: "linkedin.com/in/umang-pandey-01b486273",
    href: "https://linkedin.com/in/umang-pandey-01b486273",
    id: "contact-linkedin",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "GitHub", value: "github.com/Umangpandey75",
    href: "https://github.com/Umangpandey75",
    id: "contact-github",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  },
];

type FormState = { name: string; email: string; subject: string; message: string };

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1.1rem",
  background: "var(--color-card)",
  border: "1px solid var(--color-border-strong)",
  borderRadius: 12,
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  color: "var(--color-heading)",
  outline: "none",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  boxSizing: "border-box",
};

const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "var(--color-accent-gold)";
  e.target.style.boxShadow   = "0 0 0 3px rgba(232,160,69,0.1)";
};
const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "var(--color-border-strong)";
  e.target.style.boxShadow   = "none";
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm]     = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (SHEET_URL === "YOUR_GOOGLE_SCRIPT_URL") {
      alert("⚠️ Google Sheet URL not set yet! Follow the setup guide.");
      return;
    }

    setStatus("sending");

    try {
      // ── Image beacon: reliable way to send data to Google Apps Script
      // fetch() with no-cors drops query params on Google's internal redirect.
      // Image src requests always carry query params through ALL redirects.
      const params = new URLSearchParams({
        name:      form.name,
        email:     form.email,
        subject:   form.subject,
        message:   form.message,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      await new Promise<void>((resolve) => {
        const beacon  = new Image();
        beacon.onload  = () => resolve();
        beacon.onerror = () => resolve(); // Script returns JSON (not image) → onerror = success
        beacon.src     = `${SHEET_URL}?${params.toString()}`;
        setTimeout(resolve, 4000); // safety timeout
      });

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };



  return (
    <main className="page-content" id="page-contact">
      {/* Background glow */}
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,72,255,0.08) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />

      <section style={{ padding: "5rem 0 6rem", position: "relative", zIndex: 1 }}>
        <div className="section-wrapper">

          {/* Header */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: "0.5rem" }}>
            Let's connect
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--color-heading)", marginBottom: "1rem" }}>
            Get in <span className="violet-text-gradient">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-body-muted)", maxWidth: 520, lineHeight: 1.8, marginBottom: "0.75rem" }}>
            Actively looking for internship opportunities. Whether you have a project, an idea, or just want to talk — my inbox is always open.
          </motion.p>

          {/* Availability badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: 9999, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", marginBottom: "3.5rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 6px #22C55E", animation: "glowPulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#22C55E", fontWeight: 600 }}>
              Available for Internship &amp; Freelance · Responds within 24 hours
            </span>
          </motion.div>

          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap", alignItems: "flex-start" }}>

            {/* ── Contact Info ── */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ flex: "0 1 320px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--color-heading)", marginBottom: "1.5rem" }}>
                Contact Details
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {CONTACT_INFO.map((info) => (
                  <a key={info.id} id={info.id} href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <motion.div whileHover={{ x: 6 }} className="glass-card"
                      style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.95rem 1.2rem", borderRadius: 14, border: "1px solid var(--color-border)", cursor: "pointer" }}>
                      <span style={{ color: "var(--color-accent-gold)", flexShrink: 0 }}>{info.icon}</span>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--color-body-faint)", marginBottom: "0.15rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{info.label}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--color-accent-gold)", fontWeight: 500 }}>{info.value}</p>
                      </div>
                    </motion.div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="glass-card"
                style={{ marginTop: "2rem", padding: "1.5rem", borderRadius: 16, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", flexShrink: 0, boxShadow: "0 0 8px #22C55E", animation: "glowPulse 2s infinite" }} />
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#22C55E", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                    Availability Status
                  </p>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--color-heading)", fontWeight: 600 }}>
                  Open to Internship &amp; Freelance
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)", marginTop: "0.3rem" }}>
                  Usually responds within 24 hours
                </p>
              </motion.div>
            </motion.div>

            {/* ── Form ── */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} style={{ flex: "1 1 380px" }}>

              {/* Success banner */}
              {status === "sent" && (
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: "1.25rem", padding: "1.2rem 1.5rem", borderRadius: 14, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-heading)", marginBottom: "0.25rem" }}>Thank you for reaching out!</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-body-muted)", lineHeight: 1.6 }}>Your message has been received. I appreciate you taking the time to connect — I'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {/* Error banner */}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: "1.25rem", padding: "1rem 1.4rem", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>❌</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#EF4444" }}>Something went wrong — try again</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-body-faint)", marginTop: "0.2rem" }}>
                      Or email me at{" "}
                      <a href="mailto:umangpandey.co@gmail.com" style={{ color: "var(--color-accent-gold)" }}>umangpandey.co@gmail.com</a>
                    </p>
                  </div>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} id="contact-form">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-body-muted)", display: "block", marginBottom: "0.4rem" }}>Your Name *</label>
                    <input id="contact-input-name" name="name" type="text" required placeholder="Rahul Sharma"
                      value={form.name} onChange={handleChange} style={inputBase} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-body-muted)", display: "block", marginBottom: "0.4rem" }}>Your Email *</label>
                    <input id="contact-input-email" name="email" type="email" required placeholder="rahul@gmail.com"
                      value={form.email} onChange={handleChange} style={inputBase} onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-body-muted)", display: "block", marginBottom: "0.4rem" }}>Subject *</label>
                  <input id="contact-input-subject" name="subject" type="text" required placeholder="Internship Opportunity / Project Collaboration"
                    value={form.subject} onChange={handleChange} style={inputBase} onFocus={focusOn} onBlur={focusOff} />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-body-muted)", display: "block", marginBottom: "0.4rem" }}>Message *</label>
                  <textarea id="contact-input-message" name="message" required rows={6}
                    placeholder="Tell me about the opportunity, your project, or just say hello!"
                    value={form.message} onChange={handleChange}
                    style={{ ...inputBase, resize: "vertical", minHeight: 140 }} onFocus={focusOn} onBlur={focusOff} />
                </div>

                <motion.button
                  type="submit" id="contact-submit"
                  whileHover={status === "idle" ? { scale: 1.02 } : {}}
                  whileTap={status  === "idle" ? { scale: 0.97 } : {}}
                  disabled={status === "sending" || status === "sent"}
                  style={{
                    width: "100%", padding: "0.92rem", borderRadius: 12, border: "none",
                    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem",
                    cursor: status === "sending" || status === "sent" ? "not-allowed" : "pointer",
                    background: status === "sent"  ? "linear-gradient(135deg, #22C55E, #16a34a)"
                              : status === "error" ? "linear-gradient(135deg, #EF4444, #b91c1c)"
                              : "linear-gradient(135deg, #6B48FF, #E8A045)",
                    color: "#fff", transition: "all 0.3s ease",
                    opacity: status === "sending" ? 0.75 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  }}>
                  {status === "idle"    && <><span>Send Message</span><span>→</span></>}
                  {status === "sending" && (
                    <><span style={{ display: "inline-block", animation: "spin 1s linear infinite", width: 16, height: 16, border: "2px solid #fff4", borderTop: "2px solid #fff", borderRadius: "50%" }} />
                    <span>Sending…</span></>
                  )}
                  {status === "sent"    && <><span>✓</span><span>Message Sent!</span></>}
                  {status === "error"   && <><span>✗</span><span>Failed — Try Again</span></>}
                </motion.button>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-body-faint)", textAlign: "center", marginTop: "1rem" }}>
                  Or email directly:{" "}
                  <a href="https://mail.google.com/mail/?view=cm&to=umangpandey.co@gmail.com"
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: "var(--color-accent-gold)", textDecoration: "none" }}>
                    umangpandey.co@gmail.com
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
};

export default Contact;
