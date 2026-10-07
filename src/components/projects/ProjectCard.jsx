import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { TechIcon } from "@/components/skills/TechIcon";
import {
  Github,
  ExternalLink,
  Sparkles,
  Link2,
  ChevronRight,
  Layers,
  Activity,
  Terminal,
  Cpu,
} from "lucide-react";

/**
 * ProjectCard
 * Futuristic 3D tilt project card with dynamic responsive sizing, glowing borders, and hover revelations.
 */
export const ProjectCard = React.forwardRef(
  (
    {
      project,
      isActive,
      isRelated,
      isDimmed,
      onHoverStart,
      onHoverEnd,
      onClick,
    },
    ref
  ) => {
    const cardInternalRef = useRef(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    const [isHoveredLocal, setIsHoveredLocal] = useState(false);

    const setRefs = (el) => {
      cardInternalRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    const handleMouseMove = (e) => {
      if (!cardInternalRef.current) return;
      const rect = cardInternalRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({ rotateX, rotateY, glareX, glareY });
    };

    const handleMouseEnter = () => {
      setIsHoveredLocal(true);
      onHoverStart(project.id);
    };

    const handleMouseLeave = () => {
      setIsHoveredLocal(false);
      setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
      onHoverEnd();
    };

    const getAccentStyles = () => {
      switch (project.accent) {
        case "champagne":
          return {
            borderActive: "border-amber-400/80 shadow-[0_0_30px_rgba(251,191,36,0.35)]",
            borderHover: "hover:border-amber-400/50",
            badge: "bg-amber-400/15 text-amber-300 border-amber-400/30",
            dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
            subtleGlow: "rgba(251, 191, 36, 0.12)",
            textAccent: "text-amber-400",
            gradientLine: "from-amber-400 via-yellow-200 to-transparent",
          };
        case "emerald":
        case "lime":
          return {
            borderActive: "border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.35)]",
            borderHover: "hover:border-emerald-400/50",
            badge: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
            dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
            subtleGlow: "rgba(16, 185, 129, 0.12)",
            textAccent: "text-emerald-400",
            gradientLine: "from-emerald-400 via-teal-200 to-transparent",
          };
        case "iris":
          return {
            borderActive: "border-purple-400/80 shadow-[0_0_30px_rgba(168,85,247,0.35)]",
            borderHover: "hover:border-purple-400/50",
            badge: "bg-purple-400/15 text-purple-300 border-purple-400/30",
            dot: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
            subtleGlow: "rgba(168, 85, 247, 0.14)",
            textAccent: "text-purple-400",
            gradientLine: "from-purple-400 via-indigo-200 to-transparent",
          };
        case "signal":
        default:
          return {
            borderActive: "border-sky-400/80 shadow-[0_0_30px_rgba(14,165,233,0.35)]",
            borderHover: "hover:border-sky-400/50",
            badge: "bg-sky-400/15 text-sky-300 border-sky-400/30",
            dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
            subtleGlow: "rgba(14, 165, 233, 0.12)",
            textAccent: "text-sky-400",
            gradientLine: "from-sky-400 via-cyan-200 to-transparent",
          };
      }
    };

    const style = getAccentStyles();

    // Featured projects span 2 columns on medium/large screens
    const gridSpanClass = project.isFeatured
      ? "col-span-1 md:col-span-2 lg:col-span-2"
      : "col-span-1";

    return (
      <motion.div
        ref={setRefs}
        layout
        layoutId={`project-card-${project.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: isDimmed ? 0.25 : 1,
          scale: isActive ? 1.02 : 1,
          filter: isDimmed ? "grayscale(75%) blur(0.5px)" : "grayscale(0%) blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`group relative ${gridSpanClass} cursor-pointer select-none rounded-2xl`}
        style={{
          perspective: 1100,
          zIndex: isActive ? 30 : isRelated ? 25 : 10,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(project)}
        role="button"
        tabIndex={0}
        aria-label={`${project.title} - ${project.codename}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(project);
          }
        }}
      >
        {/* Inner Card Container */}
        <div
          className={`relative h-full w-full overflow-hidden rounded-2xl border bg-gradient-to-b from-[#121828]/95 via-[#0d1220]/95 to-[#080c16] p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 ${
            isActive
              ? `${style.borderActive} bg-[#162035]`
              : isRelated
              ? "border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.2)] bg-[#121c2e]"
              : "border-slate-800/80 hover:border-slate-700/80"
          }`}
          style={{
            transform: isHoveredLocal
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(8px)`
              : "none",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Spotlight Glare */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${tilt.glareX}% ${tilt.glareY}%, ${style.subtleGlow}, transparent 70%)`,
            }}
          />

          {/* Corner Cyber Brackets */}
          <div className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-slate-600/40 group-hover:border-slate-400" />
          <div className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-slate-600/40 group-hover:border-slate-400" />
          <div className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-slate-600/40 group-hover:border-slate-400" />
          <div className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-slate-600/40 group-hover:border-slate-400" />

          {/* Header Telemetry Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${style.dot}`} />
              <span className="font-semibold tracking-wider text-slate-300">
                {project.codename}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${style.badge}`}>
                {project.status}
              </span>

              {project.isFeatured && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 border border-amber-400/30">
                  <Sparkles className="h-2.5 w-2.5" />
                  FLAGSHIP
                </span>
              )}

              {isRelated && (
                <span className="inline-flex items-center gap-1 rounded bg-sky-400/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-400/40 animate-pulse">
                  <Link2 className="h-3 w-3" />
                  LINKED PROTOCOL
                </span>
              )}
            </div>
          </div>

          {/* Project Body */}
          <div className="mt-4 flex flex-col justify-between">
            <div>
              {/* Optional Visual Banner preview */}
              {project.image && (
                <div className="relative mb-4 h-36 sm:h-44 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-transparent to-transparent opacity-80" />
                </div>
              )}

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-white">
                {project.title}
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
                {project.summary}
              </p>

              {/* Key Engineering Features (Always visible on featured, revealed on hover on standard) */}
              <div className={`mt-4 space-y-1.5 border-l-2 border-slate-800 pl-3 ${project.isFeatured ? "block" : "hidden sm:block"}`}>
                {project.keyFeatures.slice(0, project.isFeatured ? 3 : 2).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 group-hover:text-slate-300">
                    <span className={`text-[10px] font-mono font-bold ${style.textAccent}`}>//</span>
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Metrics Ribbon (for Featured Projects) */}
              {project.metrics && (
                <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px]">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2">
                      <span className="text-[10px] text-slate-500">{m.label}</span>
                      <p className={`font-semibold ${style.textAccent}`}>{m.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack Pills with TechIcons */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.techIds.slice(0, project.isFeatured ? 8 : 5).map((tId) => (
                  <span
                    key={tId}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-1 text-[11px] font-mono text-slate-300 group-hover:border-slate-700 transition"
                  >
                    <TechIcon id={tId} className="h-3 w-3 text-slate-400 group-hover:text-white" />
                    <span>{tId.replace(/_/g, " ").toUpperCase()}</span>
                  </span>
                ))}
                {project.techIds.length > (project.isFeatured ? 8 : 5) && (
                  <span className="rounded-lg bg-slate-800/60 px-2 py-1 text-[10px] font-mono text-slate-400">
                    +{project.techIds.length - (project.isFeatured ? 8 : 5)} MORE
                  </span>
                )}
              </div>
            </div>

            {/* Footer Action Links: Code, Live, Inspect */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3.5 text-xs font-mono">
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 text-slate-200 transition hover:border-white hover:bg-slate-750 hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>SOURCE</span>
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/20 px-3 py-1.5 font-semibold text-sky-300 border border-sky-400/40 transition hover:bg-sky-500/30 hover:border-sky-400"
                  >
                    <span>LIVE DEPLOY</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => onClick(project)}
                className="inline-flex items-center gap-1 font-semibold text-slate-400 transition hover:text-white"
              >
                <span>BLUEPRINT</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
