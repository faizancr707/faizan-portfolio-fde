import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code2,
  GraduationCap,
  Terminal,
  Cpu,
  Server,
  Database,
  Cloud,
  Layers,
  Sparkles,
  ExternalLink,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Radio,
  FileText,
} from "lucide-react";
import profileImg from "@/assets/profile/profile.jpg";
import cvPdf from "@/assets/files/cv_pdf/FaizanAlam_resume1.pdf";

const corePillars = [
  {
    id: "backend",
    title: "Backend & Systems",
    icon: Server,
    color: "#10b981", // Emerald
    accentBg: "rgba(16, 185, 129, 0.1)",
    borderCol: "border-emerald-500/30",
    summary:
      "Architecting low-latency REST & GraphQL microservices, robust JWT/RBAC auth, event queues, and fault-tolerant APIs.",
    technologies: ["Node.js", "Express.js", "Spring Boot", "FastAPI", "REST APIs", "WebSockets"],
  },
  {
    id: "database",
    title: "Data Architecture",
    icon: Database,
    color: "#0ea5e9", // Signal Blue
    accentBg: "rgba(14, 165, 233, 0.1)",
    borderCol: "border-sky-500/30",
    summary:
      "Relational & document database modeling, index optimization, Redis in-memory caching layers, and transaction safety.",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Mongoose", "Prisma"],
  },
  {
    id: "frontend",
    title: "Frontend Orchestration",
    icon: Layers,
    color: "#8b5cf6", // Royal Iris
    accentBg: "rgba(139, 92, 246, 0.1)",
    borderCol: "border-violet-500/30",
    summary:
      "Crafting performant, high-density React & Next.js user interfaces with dynamic state management and crisp micro-interactions.",
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
  },
  {
    id: "cloud",
    title: "Cloud & Containerization",
    icon: Cloud,
    color: "#fbbf24", // Champagne
    accentBg: "rgba(251, 191, 36, 0.1)",
    borderCol: "border-amber-500/30",
    summary:
      "Containerizing applications with Docker, orchestrating AWS ECS deployments, and configuring continuous delivery pipelines.",
    technologies: ["Docker", "AWS (EC2, ECS, S3)", "CI/CD Pipelines", "Linux / Bash", "Git"],
  },
];

const telemetryStats = [
  { label: "Production Experience", value: "Full Stack", sub: "Backend & Distributed Systems" },
  { label: "Academic Excellence", value: "8.01 CGPA", sub: "B.Tech E&TC (AIKTC Mumbai)" },
  { label: "Algorithms Solved", value: "200+", sub: "Data Structures & Systems Logic" },
  { label: "Production Uptime", value: "99.9%", sub: "Resilient API Architecture" },
];

export default function About() {
  const [activePillar, setActivePillar] = useState("backend");

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Telemetry Header */}
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
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  COMMAND_NODE // OPERATOR_DOSSIER
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Engineering Blueprint & Profile
              </h1>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Delhi / Mumbai, IN</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>IST (UTC+5:30)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available for Full-Time Roles</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Operator Avatar & Engineering Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Holographic Avatar Console */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Avatar Card */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#111726] to-[#070a12] p-4 sm:p-6 border border-white/10 shadow-2xl overflow-hidden group">
            {/* Cyber Corner Markers */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

            {/* Glowing Accent Aura */}
            <div className="absolute -top-24 -left-24 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700" />

            <div className="relative aspect-square rounded-xl overflow-hidden border border-white/15 shadow-inner">
              <img
                src={profileImg}
                alt="Faizan Alam"
                className="w-full h-full object-cover object-center filter saturate-110 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent opacity-60" />

              {/* Holographic Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

              {/* Status Pill on Image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-lg bg-[#0c101b]/90 border border-white/15 backdrop-blur-md">
                <div>
                  <p className="text-[11px] font-mono uppercase text-slate-400">Identity Record</p>
                  <p className="text-sm font-bold text-white tracking-wide">Faizan Alam</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-mono uppercase text-emerald-400">Designation</p>
                  <p className="text-xs font-semibold text-slate-200">Full Stack & Systems</p>
                </div>
              </div>
            </div>

            {/* Direct Operator Actions */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition-all duration-300 group/btn"
              >
                <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                <span>Download CV</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs font-mono uppercase tracking-wider border border-white/15 transition-all duration-300"
              >
                <span>Initiate Comm</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>

          {/* Quick Telemetry Indicators */}
          <div className="grid grid-cols-2 gap-3">
            {telemetryStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-3.5 rounded-xl bg-[#0c101b]/70 border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-slate-400 truncate">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Mission Directive, Systems Philosophy & Bio */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col justify-between space-y-6"
        >
          {/* Engineering Narrative Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c101b]/80 border border-white/10 backdrop-blur-xl relative">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-emerald-400 tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>DIRECTIVE // ARCHITECTURAL_PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
              Building Resilient, High-Throughput Software from Foundation to Cloud.
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a <strong className="text-emerald-400 font-semibold">Full Stack & Backend Developer</strong>{" "}
                driven by the craft of building scalable, observable, and dependable systems. My technical foundation was
                forged during my B.Tech in Electronics and Telecommunication Engineering, giving me a rigorous,
                low-level appreciation for distributed networks, signal logic, and system architecture.
              </p>
              <p>
                From engineering distributed REST APIs and SaaS connectors processing over 120,000 daily webhook events
                at <span className="text-white font-medium">RIB Technology</span> to architecting polyglot microservices
                with Spring Boot and FastAPI at <span className="text-white font-medium">I-Geni Technologies</span>, I
                focus on clean modularity, resilient error boundaries, and predictable database performance.
              </p>
              <p>
                I believe modern software excellence is achieved at the intersection of{" "}
                <span className="text-white font-medium">robust server-side systems</span> (Node.js, Express,
                PostgreSQL, Redis) and <span className="text-white font-medium">reactive frontend interfaces</span>{" "}
                (React, Next.js, TypeScript). When not shipping code, I solve algorithmic challenges, sharpen
                distributed systems knowledge, and explore cloud containerization with Docker and AWS.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {[
                "Microservices Architecture",
                "Distributed Caching (Redis)",
                "JWT & RBAC Security",
                "Event-Driven Webhooks",
                "Relational & NoSQL Schema Design",
                "Dockerized Workflows",
                "High-Throughput REST APIs",
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Routes Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/skills"
              className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-transparent border border-violet-500/30 hover:border-violet-500/60 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-[11px] font-mono text-violet-400 uppercase">Interactive Matrix</div>
                <div className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  Explore Skills Sudoku Grid →
                </div>
              </div>
              <Cpu className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform" />
            </Link>

            <Link
              to="/projects"
              className="p-4 rounded-xl bg-gradient-to-r from-sky-500/10 to-transparent border border-sky-500/30 hover:border-sky-500/60 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-[11px] font-mono text-sky-400 uppercase">Verified Deployments</div>
                <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                  View Systems Showcase →
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Core Architectural Domains */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              SYSTEM_COMPONENTS // SPECIALIZATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Architectural Domains & Stack Mastery
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Click domain below to inspect execution parameters
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === pillar.id;

            return (
              <motion.button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? `${pillar.borderCol} bg-[#111726]/90 shadow-lg shadow-black/40 ring-1 ring-white/10`
                    : "border-white/10 bg-[#0c101b]/60 hover:bg-[#0c101b]/90 hover:border-white/20"
                }`}
              >
                {/* Active glow */}
                {isSelected && (
                  <div
                    className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                    style={{ backgroundColor: pillar.color, opacity: 0.15 }}
                  />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: pillar.accentBg, color: pillar.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {isSelected ? "ACTIVE NODE" : "READY"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{pillar.summary}</p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {pillar.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {pillar.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                      +{pillar.technologies.length - 4}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Verified Education & Career Preview Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111726] via-[#0c101b] to-[#111726] border border-white/10 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION & TRACK RECORD</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              B.Tech in Electronics & Telecommunication Engineering
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Graduated with <span className="text-emerald-400 font-semibold">8.01 CGPA</span> from Anjuman I-Islam's
              Kalsekar Technical Campus (AIKTC), Mumbai. Combining deep theoretical problem solving with modern full stack
              and distributed cloud engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/education"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-colors"
            >
              Academic Registry →
            </Link>
            <Link
              to="/experience"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider border border-emerald-500/30 transition-colors"
            >
              Career Chronology →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
