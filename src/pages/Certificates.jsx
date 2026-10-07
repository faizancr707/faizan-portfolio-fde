import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  FileText,
  Cpu,
  Layers,
  CheckCircle2,
  Cloud,
  Terminal,
  Lock,
} from "lucide-react";
import typescriptPdf from "@/assets/files/certificates_pdf/TypeScript.pdf";
import awsEcsPdf from "@/assets/files/certificates_pdf/aws_ecs.pdf";
import javascriptPdf from "@/assets/files/certificates_pdf/javascript.pdf";
import dockerPdf from "@/assets/files/certificates_pdf/docker_fundamentals.pdf";
import pythonPdf from "@/assets/files/certificates_pdf/python.pdf";
import cybersecurityPdf from "@/assets/files/certificates_pdf/cybersecurity_virtual_program.pdf";

const certificates = [
 
  // {
  //   id: "cybersecurity",
  //   title: "Cybersecurity Virtual Experience",
  //   issuer: "Forage",
  //   date: "10 July 2023",
  //   category: "security",
  //   link: cybersecurityPdf,
  //   badgeColor: "#8b5cf6", // Royal Iris
  //   icon: Lock,
  //   description:
  //     "Practical exploration of cybersecurity threat surfaces, ransomware detection vectors, vulnerability patch analysis, and zero-trust security postures.",
  //   skills: ["Cybersecurity", "Threat Analysis", "Zero-Trust", "Vulnerability Assessment", "Risk Mitigation"],
  // },
];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCerts = certificates.filter((cert) => {
    const matchesCat = activeCategory === "all" || cert.category === activeCategory;
    const matchesQuery =
      searchQuery === "" ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top HUD Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#0c101b]/90 border border-champagne-500/20 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-amber-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  CREDENTIAL_REGISTRY // VERIFIED_INDEX
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {certificates.length} VERIFIED CREDENTIALS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Certifications & Accreditations
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by skill / issuer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#111726] border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {[
          { id: "all", label: "All Credentials" },
          { id: "cloud", label: "Cloud & DevOps" },
          { id: "languages", label: "Languages & Core" },
          { id: "security", label: "Security & Systems" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              activeCategory === tab.id
                ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => {
          const Icon = cert.icon;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl bg-[#0c101b]/90 border border-white/10 backdrop-blur-xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-amber-400/40 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300"
            >
              {/* Corner Cyber Accent */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-amber-400 transition-colors pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{ backgroundColor: `${cert.badgeColor}15`, color: cert.badgeColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      VERIFIED
                    </span>
                    <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  {cert.issuer}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-3 group-hover:text-amber-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">PDF ATTACHED</span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white font-mono text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredCerts.length === 0 && (
        <div className="text-center py-16 bg-[#0c101b]/50 rounded-2xl border border-white/10 mt-6">
          <Award className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-300 text-sm font-mono">No credentials matched current query parameters.</p>
        </div>
      )}
    </div>
  );
}
