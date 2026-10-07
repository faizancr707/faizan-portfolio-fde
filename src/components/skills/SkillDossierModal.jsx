import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechIcon } from "./TechIcon";
import {
  X,
  Sparkles,
  Link2,
  FileCheck2,
  Cpu,
  Layers,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

/**
 * SkillDossierModal
 * Command Center Inspection Drawer displaying CV implementation details and interactive dependency traversal.
 */
export const SkillDossierModal = ({
  skill,
  isOpen,
  onClose,
  onSelectRelated,
  allSkills,
}) => {
  // Close on Escape key
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

  if (!isOpen || !skill) return null;

  // Resolve related skill objects
  const relatedSkills = (skill.relatedIds || [])
    .map((id) => allSkills.find((s) => s.id === id))
    .filter(Boolean);

  const getAccentColor = (accent) => {
    switch (accent) {
      case "champagne":
        return {
          glow: "shadow-[0_0_35px_rgba(251,191,36,0.3)]",
          border: "border-amber-400/50",
          text: "text-amber-400",
          badge: "bg-amber-400/10 text-amber-300 border-amber-400/30",
        };
      case "emerald":
      case "lime":
        return {
          glow: "shadow-[0_0_35px_rgba(16,185,129,0.3)]",
          border: "border-emerald-400/50",
          text: "text-emerald-400",
          badge: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
        };
      case "iris":
        return {
          glow: "shadow-[0_0_35px_rgba(168,85,247,0.3)]",
          border: "border-purple-400/50",
          text: "text-purple-400",
          badge: "bg-purple-400/10 text-purple-300 border-purple-400/30",
        };
      case "signal":
      default:
        return {
          glow: "shadow-[0_0_35px_rgba(14,165,233,0.3)]",
          border: "border-sky-400/50",
          text: "text-sky-400",
          badge: "bg-sky-400/10 text-sky-300 border-sky-400/30",
        };
    }
  };

  const accentStyles = getAccentColor(skill.accent);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border ${accentStyles.border} bg-[#0c101b] p-6 sm:p-8 text-white ${accentStyles.glow} shadow-2xl`}
        >
          {/* Top HUD Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>COMMAND DOSSIER // {skill.matrixCoord}</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                {skill.sectorCode}
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg border border-slate-700/60 p-1.5 text-slate-400 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              aria-label="Close dossier"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Skill Title Banner */}
          <div className="mt-5 flex items-start gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/90 p-3 text-slate-200 shadow-inner">
              <TechIcon id={skill.id} className="h-10 w-10" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {skill.name}
                </h2>
                {skill.isAnchor && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-400/30">
                    <Sparkles className="h-3 w-3" />
                    CORE ANCHOR
                  </span>
                )}
              </div>
              <p className={`mt-1 font-mono text-sm font-medium ${accentStyles.text}`}>
                {skill.role}
              </p>
            </div>
          </div>

          {/* Telemetry Specs Matrix */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
              <span className="text-slate-400">COMPETENCY TIER</span>
              <p className="mt-1 font-semibold text-white">{skill.level}</p>
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
              <span className="text-slate-400">SECTOR CLUSTER</span>
              <p className="mt-1 font-semibold text-white">{skill.sectorCode}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
              <span className="text-slate-400">DEPENDENCY LINKS</span>
              <p className={`mt-1 font-bold ${accentStyles.text}`}>
                {skill.relatedIds?.length || 0} Connected
              </p>
            </div>
          </div>

          {/* Verified CV Application Section */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
              <FileCheck2 className="h-4 w-4" />
              <span>VERIFIED APPLICATION IN FAiZAN&apos;S CV</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {skill.cvApplication}
            </p>
            <div className="mt-3 border-t border-slate-800/60 pt-2.5 text-xs text-slate-400">
              <strong className="text-slate-300">Key Capability: </strong>
              {skill.cvHighlight}
            </div>
          </div>

          {/* Related Technologies Mesh */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-300">
                <Link2 className="h-3.5 w-3.5 text-sky-400" />
                <span>DIRECT DEPENDENCIES & CONNECTED TECH ({relatedSkills.length})</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">CLICK TO PIVOT DOSSIER</span>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedSkills.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-left transition hover:border-sky-400/50 hover:bg-slate-850 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-slate-800 p-1 text-slate-300 group-hover:text-sky-300">
                      <TechIcon id={rel.id} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-slate-200 group-hover:text-white">
                        {rel.name}
                      </div>
                      <div className="truncate font-mono text-[10px] text-slate-400">
                        {rel.matrixCoord} · {rel.sectorCode}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sky-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Close Button */}
          <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-5 py-2 font-mono text-xs font-semibold text-white transition hover:bg-slate-700"
            >
              CLOSE INSPECTION [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
