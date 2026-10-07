import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechIcon } from "@/components/skills/TechIcon";
import {
  X,
  Github,
  ExternalLink,
  Sparkles,
  Link2,
  Cpu,
  Layers,
  CheckCircle2,
  Database,
  Cloud,
  ChevronRight,
  Workflow,
  Shield,
  Activity,
} from "lucide-react";

/**
 * ProjectDossierModal
 * Deep architectural blueprint modal detailing system design, layer topology, and project linkages.
 */
export const ProjectDossierModal = ({
  project,
  isOpen,
  onClose,
  onSelectRelated,
  allProjects,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const relatedProjects = (project.relatedProjectIds || [])
    .map((id) => allProjects.find((p) => p.id === id))
    .filter(Boolean);

  const getAccentStyles = () => {
    switch (project.accent) {
      case "champagne":
        return {
          glow: "shadow-[0_0_40px_rgba(251,191,36,0.3)]",
          border: "border-amber-400/50",
          text: "text-amber-400",
          badge: "bg-amber-400/10 text-amber-300 border-amber-400/30",
        };
      case "emerald":
      case "lime":
        return {
          glow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
          border: "border-emerald-400/50",
          text: "text-emerald-400",
          badge: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
        };
      case "iris":
        return {
          glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]",
          border: "border-purple-400/50",
          text: "text-purple-400",
          badge: "bg-purple-400/10 text-purple-300 border-purple-400/30",
        };
      case "signal":
      default:
        return {
          glow: "shadow-[0_0_40px_rgba(14,165,233,0.3)]",
          border: "border-sky-400/50",
          text: "text-sky-400",
          badge: "bg-sky-400/10 text-sky-300 border-sky-400/30",
        };
    }
  };

  const style = getAccentStyles();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border ${style.border} bg-[#0a0e19] p-6 sm:p-8 text-white ${style.glow} shadow-2xl`}
        >
          {/* Top HUD Status */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ENGINEERING BLUEPRINT // {project.codename}</span>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg border border-slate-700/60 p-1.5 text-slate-400 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              aria-label="Close blueprint"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Optional Image Banner */}
          {project.image && (
            <div className="mt-5 h-48 sm:h-64 w-full overflow-hidden rounded-xl border border-slate-800">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {project.title}
                </h2>
                {project.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-400/30">
                    <Sparkles className="h-3 w-3" />
                    FLAGSHIP ARCHITECTURE
                  </span>
                )}
              </div>
              <p className={`mt-1 font-mono text-sm ${style.text}`}>
                {project.role} · {project.period}
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-mono font-semibold text-white transition hover:bg-slate-700"
                >
                  <Github className="h-4 w-4" />
                  <span>REPOSITORY</span>
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs font-mono font-bold text-black transition hover:bg-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Deep Architectural Narrative */}
          <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-sky-400" />
              SYSTEM OVERVIEW & DESIGN RATIONALE
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
              {project.description}
            </p>
          </div>

          {/* Multi-Layer Architectural Breakdown */}
          {project.architecture && (
            <div className="mt-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
                <Layers className="h-3.5 w-3.5 text-emerald-400" />
                FULL-STACK ARCHITECTURE BLUEPRINT
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {project.architecture.client && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cpu className="h-3 w-3 text-sky-400" />
                      CLIENT & UI LAYER
                    </span>
                    <p className="mt-1 text-slate-200">{project.architecture.client}</p>
                  </div>
                )}

                {project.architecture.server && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Workflow className="h-3 w-3 text-emerald-400" />
                      SERVER & API GATEWAY
                    </span>
                    <p className="mt-1 text-slate-200">{project.architecture.server}</p>
                  </div>
                )}

                {project.architecture.ai && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-purple-400" />
                      COGNITIVE / AI LAYER
                    </span>
                    <p className="mt-1 text-slate-200">{project.architecture.ai}</p>
                  </div>
                )}

                {project.architecture.queue && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Activity className="h-3 w-3 text-amber-400" />
                      DISTRIBUTED QUEUE & PUB/SUB
                    </span>
                    <p className="mt-1 text-slate-200">{project.architecture.queue}</p>
                  </div>
                )}

                {project.architecture.database && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Database className="h-3 w-3 text-cyan-400" />
                      DATA STORE & ORM
                    </span>
                    <p className="mt-1 text-slate-200">{project.architecture.database}</p>
                  </div>
                )}

                {project.architecture.storage && (
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3.5">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cloud className="h-3 w-3 text-amber-400" />
                      OBJECT STORAGE & MEDIA
                    </span>
                    <p className="mt-1 text-slate-200">{project.architecture.storage}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key Engineering Features */}
          <div className="mt-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              KEY ENGINEERING ACHIEVEMENTS
            </h3>
            <div className="space-y-2">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300"
                >
                  <span className={`font-mono font-bold text-sm ${style.text}`}>0{idx + 1}.</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Tech Stack Pills */}
          <div className="mt-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              TECHNOLOGY MESH ({project.techStack.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techIds.map((tId, idx) => (
                <span
                  key={tId}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-200"
                >
                  <TechIcon id={tId} className="h-4 w-4 text-sky-400" />
                  <span>{project.techStack[idx] || tId}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Interconnected Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-6 border-t border-slate-800 pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-300">
                  <Link2 className="h-3.5 w-3.5 text-sky-400" />
                  <span>CONNECTED ARCHITECTURAL HUBS ({relatedProjects.length})</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">CLICK TO PIVOT BLUEPRINT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedProjects.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 text-left transition hover:border-sky-400/50 hover:bg-slate-850"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-300">
                        {rel.title}
                      </h4>
                      <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                        {rel.codename} · {rel.status}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-sky-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Close */}
          <div className="mt-7 flex justify-end border-t border-slate-800 pt-4">
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-5 py-2 font-mono text-xs font-semibold text-white transition hover:bg-slate-700"
            >
              CLOSE BLUEPRINT [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
