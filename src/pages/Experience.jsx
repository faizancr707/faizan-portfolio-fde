import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Terminal,
  FileText,
  Eye,
  X,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// Certificate PDF assets
import bharatInternPdf from "@/assets/files/experience_pdf/bharatIntern.pdf";
import codeAlphaPdf from "@/assets/files/experience_pdf/codeAlpha.pdf";
import codeClausePdf from "@/assets/files/experience_pdf/codeClause.pdf";
import oasisInfobytePdf from "@/assets/files/experience_pdf/oasisInfobyte.pdf";

// Certificate image previews
import bharatInternImg from "@/assets/experience/bharatIntern_page.jpg";
import codeAlphaImg from "@/assets/experience/codeAlpha_page.jpg";
import codeClauseImg from "@/assets/experience/codeClause_page.jpg";
import oasisInfobyteImg from "@/assets/experience/oasisInfobyte_page.jpg";

const experiences = [
  {
    id: "rib-tech",
    category: "production",
    title: "Full Stack Developer",
    company: "RIB Technology",
    location: "Mumbai, India",
    period: "Aug 2026 - Present",
    status: "CURRENT MISSION",
    badgeColor: "emerald",
    summary:
      "Spearheading enterprise SaaS integration connectors, distributed API gateways, and cloud deployment pipelines.",
    achievements: [
      "Engineered SaaS connectors for 4 major CRM platforms, processing 120,000+ webhook payloads daily with 99.9% uptime.",
      "Designed high-throughput REST APIs and integrated Redis caching, decreasing endpoint response times by 38%.",
      "Implemented strict Role-Based Access Control (RBAC) and JWT token validation to enforce zero-trust security.",
      "Automated Docker containerization and CI/CD pipelines for zero-downtime rolling production updates.",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "Redis", "PostgreSQL", "Docker", "AWS"],
    certificatePdf: null,
    certificateImg: null,
  },
  {
    id: "i-geni",
    category: "production",
    title: "Full Stack Developer Intern",
    company: "I-Geni Technologies",
    location: "Mumbai, India",
    period: "May 2026 - Jul 2026",
    status: "MISSION ACCOMPLISHED",
    badgeColor: "violet",
    summary:
      "Developed polyglot microservices for financial ledger auditing and real-time transaction reconciliation.",
    achievements: [
      "Built resilient microservices using Spring Boot and FastAPI for automated transaction ledger validation.",
      "Constructed modular React interfaces with dynamic state stores for real-time portfolio analytics.",
      "Maintained 95%+ unit test coverage and assisted senior architects in zero-downtime database migrations.",
      "Optimized complex PostgreSQL queries, improving analytical report generation speeds by 25%.",
    ],
    techStack: ["React.js", "Spring Boot", "FastAPI", "PostgreSQL", "Tailwind CSS", "Docker"],
    certificatePdf: null,
    certificateImg: null,
  },
];

export default function Experience() {
  const [filter, setFilter] = useState("all");
  const [activeModalCert, setActiveModalCert] = useState(null);

  const filteredExperiences = experiences.filter((exp) => {
    if (filter === "all") return true;
    return exp.category === filter;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top HUD Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#0c101b]/90 border border-violet-500/20 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-violet-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Briefcase className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">
                  CAREER_TELEMETRY // LOGS
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-violet-500/10 border border-violet-500/30 text-violet-300">
                  {experiences.length} DEPLOYMENTS RECORDED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Work Experience & Deployments
              </h1>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111726] border border-white/10 text-xs font-mono">
            {[
              { id: "all", label: "All Missions", count: experiences.length },
              { id: "production", label: "Production Roles", count: 2 },
              { id: "internship", label: "Verified Internships", count: 4 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  filter === tab.id
                    ? "bg-violet-500 text-white font-bold shadow-md shadow-violet-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    filter === tab.id ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Career Timeline Stream */}
      <div className="relative">
        {/* Animated Central Spine Line */}
        <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-violet-500 to-sky-500 opacity-30" />

        <div className="space-y-8">
          {filteredExperiences.map((exp, index) => {
            const isProduction = exp.category === "production";

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative lg:pl-20"
              >
                {/* Timeline Beacon Node */}
                <div className="hidden lg:flex absolute left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-[#0c101b] border-2 border-emerald-400 items-center justify-center z-10 shadow-lg shadow-emerald-500/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* Experience Card */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0c101b]/90 border backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 ${
                    isProduction
                      ? "border-emerald-500/30 hover:border-emerald-500/60"
                      : "border-white/10 hover:border-violet-500/40"
                  }`}
                >
                  {/* Subtle top edge gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      isProduction
                        ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500"
                        : "bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400"
                    }`}
                  />

                  {/* Top Bar of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold uppercase border ${
                            isProduction
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                              : "bg-violet-500/10 text-violet-300 border-violet-500/30"
                          }`}
                        >
                          {exp.status}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <strong className="text-white font-semibold">{exp.company}</strong>
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {exp.title}
                      </h2>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 gap-1">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Bullet Points */}
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{exp.summary}</p>

                  <div className="space-y-2 mb-6">
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer: Tech Stack and Certificate Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">STACK:</span>
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Certificate Action Buttons if available */}
                    {exp.certificatePdf && (
                      <div className="flex items-center gap-2 shrink-0">
                        {exp.certificateImg && (
                          <button
                            onClick={() =>
                              setActiveModalCert({
                                title: `${exp.company} - ${exp.title}`,
                                img: exp.certificateImg,
                                pdf: exp.certificatePdf,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-sky-400" />
                            <span>Preview</span>
                          </button>
                        )}
                        <a
                          href={exp.certificatePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider border border-emerald-500/30 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>PDF Credential</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-2xl bg-[#0c101b] border border-white/20 p-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {activeModalCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalCert(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 max-h-[70vh] flex items-center justify-center bg-black/50">
                <img
                  src={activeModalCert.img}
                  alt={activeModalCert.title}
                  className="max-w-full max-h-[68vh] object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">VERIFIED CRYPTOGRAPHIC RECORD</span>
                <a
                  href={activeModalCert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full PDF Document</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}