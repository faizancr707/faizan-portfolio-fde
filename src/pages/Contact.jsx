import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  Clock,
  Send,
  Radio,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Cpu,
  ArrowRight,
} from "lucide-react";

const contactNodes = [
  {
    id: "email",
    label: "Primary Transmission Node",
    name: "Email Channel",
    value: "faizancr707@gmail.com",
    href: "mailto:faizancr707@gmail.com",
    icon: Mail,
    color: "#10b981", // Emerald
    copyable: true,
  },
  {
    id: "phone",
    label: "Direct Voice / Telemetry",
    name: "Voice Phone",
    value: "+91 89220 36146",
    href: "tel:+918922036146",
    icon: Phone,
    color: "#0ea5e9", // Signal Blue
    copyable: true,
  },
  {
    id: "whatsapp",
    label: "Encrypted Instant Dispatch",
    name: "WhatsApp Direct",
    value: "+91 89220 36146",
    href: "https://wa.me/918922036146",
    icon: MessageCircle,
    color: "#84cc16", // Lime
    copyable: false,
  },
  {
    id: "linkedin",
    label: "Professional Verification",
    name: "LinkedIn Network",
    value: "faizan-alam-06897a20b",
    href: "https://www.linkedin.com/in/faizan-alam-06897a20b/",
    icon: Linkedin,
    color: "#8b5cf6", // Royal Iris
    copyable: false,
  },
  {
    id: "github",
    label: "Code Repositories",
    name: "GitHub Profile",
    value: "github.com/faizancr707",
    href: "https://github.com/faizancr707",
    icon: Github,
    color: "#fbbf24", // Champagne
    copyable: false,
  },
];

const subjectPresets = [
  "Full-Time Role (Backend / Full Stack)",
  "Contract / Architecture Consulting",
  "Freelance Project Inquiry",
  "Technical Collaboration",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjectPresets[0],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send message via Formspree or fallback mailto
      const response = await fetch("https://formspree.io/f/mqakevve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: subjectPresets[0],
          message: "",
        });
      } else {
        // Fallback gracefully
        window.location.href = `mailto:faizancr707@gmail.com?subject=${encodeURIComponent(
          `[Portfolio Contact] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `Sender: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
        )}`;
        setSubmitStatus("success");
      }
    } catch (err) {
      window.location.href = `mailto:faizancr707@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Sender: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      setSubmitStatus("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top HUD Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#0c101b]/90 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-emerald-500/10 via-cyan-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  COMMUNICATION_RELAY // DISPATCH
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  CHANNELS OPEN · SLA &lt; 12H
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Command Transmission Terminal
              </h1>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Delhi / Mumbai</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>IST (UTC+5:30)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Direct Channels (Left) & Encrypted Transmission Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Transmission Nodes */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-5 rounded-2xl bg-[#0c101b]/90 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>DIRECT_CHANNELS // IMMEDIATE DISPATCH</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Reach out directly for full-time engineering roles, technical leadership opportunities, system
              architecture reviews, or freelance inquiries. All transmissions receive high-priority responses.
            </p>

            <div className="space-y-3">
              {contactNodes.map((node) => {
                const Icon = node.icon;
                const isCopied = copiedKey === node.id;

                return (
                  <div
                    key={node.id}
                    className="p-3.5 rounded-xl bg-[#111726]/80 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                  >
                    <a
                      href={node.href}
                      target={node.href.startsWith("http") ? "_blank" : undefined}
                      rel={node.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 min-w-0 flex-1 mr-2"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                        style={{ backgroundColor: `${node.color}15`, color: node.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase text-slate-400">{node.label}</div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                          {node.value}
                        </div>
                      </div>
                    </a>

                    <div className="flex items-center gap-1 shrink-0">
                      {node.copyable && (
                        <button
                          onClick={() => handleCopy(node.value, node.id)}
                          title="Copy to clipboard"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                      <a
                        href={node.href}
                        target={node.href.startsWith("http") ? "_blank" : undefined}
                        rel={node.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Availability Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#0c101b] to-[#111726] border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Full-Time Availability Status</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Actively interviewing for <strong className="text-white">Full Stack Developer</strong> and{" "}
              <strong className="text-white">Backend Engineer</strong> positions across India and remote-global.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Encrypted Transmission Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c101b]/95 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

            {/* Corner Cyber Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400/50 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400/50 pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Encrypted Transmission Form
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">
                SECURE_SOCKET // TLS 1.3
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Your Name / Organization <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance (Acme Corp)"
                    className="w-full px-4 py-3 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Your Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@acmecorp.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                  />
                </div>
              </div>

              {/* Subject Presets */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  Mission Nature / Subject Preset
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {subjectPresets.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setFormData({ ...formData, subject: preset })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        formData.subject === preset
                          ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Specify subject line..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-emerald-500/60 transition-all"
                />
              </div>

              {/* Message Payload */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Message Payload <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide role parameters, tech stack requirements, project scope, or meeting request..."
                  className="w-full px-4 py-3 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      TRANSMISSION DISPATCHED SUCCESSFULLY. I will review your message and reply promptly!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold font-mono text-sm uppercase tracking-wider hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all group"
              >
                {isSubmitting ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>ENCRYPTING & TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    <span>TRANSMIT MESSAGE PACKET</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
