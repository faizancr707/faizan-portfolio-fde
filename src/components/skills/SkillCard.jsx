import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { ChevronRight, Link2, Sparkles } from "lucide-react";

/**
 * SkillCard
 * Sudoku-inspired dynamic 3D tilt card with command-center telemetry styling.
 */
export const SkillCard = React.forwardRef(
  (
    {
      skill,
      isActive,
      isRelated,
      isDimmed,
      onHoverStart,
      onHoverEnd,
      onClick,
      layoutMode = "matrix",
    },
    ref
  ) => {
    const cardInternalRef = useRef(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    const [isHoveredLocal, setIsHoveredLocal] = useState(false);

    // Merge external ref with internal ref
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

      // Subtle, smooth 3D tilt
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({ rotateX, rotateY, glareX, glareY });
    };

    const handleMouseEnter = () => {
      setIsHoveredLocal(true);
      onHoverStart(skill.id);
    };

    const handleMouseLeave = () => {
      setIsHoveredLocal(false);
      setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
      onHoverEnd();
    };

    // Color theme setups
    const getAccentStyles = () => {
      switch (skill.accent) {
        case "champagne":
          return {
            borderActive: "border-amber-400/80 shadow-[0_0_24px_rgba(251,191,36,0.35)]",
            borderHover: "hover:border-amber-400/50",
            badge: "bg-amber-400/15 text-amber-300 border-amber-400/30",
            dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
            iconGlow: "group-hover:text-amber-300",
            subtleGlow: "rgba(251, 191, 36, 0.12)",
            textAccent: "text-amber-400",
          };
        case "emerald":
        case "lime":
          return {
            borderActive: "border-emerald-400/80 shadow-[0_0_24px_rgba(16,185,129,0.35)]",
            borderHover: "hover:border-emerald-400/50",
            badge: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
            dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
            iconGlow: "group-hover:text-emerald-300",
            subtleGlow: "rgba(16, 185, 129, 0.12)",
            textAccent: "text-emerald-400",
          };
        case "iris":
          return {
            borderActive: "border-purple-400/80 shadow-[0_0_24px_rgba(168,85,247,0.35)]",
            borderHover: "hover:border-purple-400/50",
            badge: "bg-purple-400/15 text-purple-300 border-purple-400/30",
            dot: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
            iconGlow: "group-hover:text-purple-300",
            subtleGlow: "rgba(168, 85, 247, 0.14)",
            textAccent: "text-purple-400",
          };
        case "signal":
        default:
          return {
            borderActive: "border-sky-400/80 shadow-[0_0_24px_rgba(14,165,233,0.35)]",
            borderHover: "hover:border-sky-400/50",
            badge: "bg-sky-400/15 text-sky-300 border-sky-400/30",
            dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
            iconGlow: "group-hover:text-sky-300",
            subtleGlow: "rgba(14, 165, 233, 0.12)",
            textAccent: "text-sky-400",
          };
      }
    };

    const style = getAccentStyles();

    // Determine grid span in Sudoku Matrix layout
    const spanClass =
      layoutMode === "matrix" && skill.isAnchor
        ? "col-span-1 md:col-span-2 lg:col-span-2"
        : "col-span-1";

    return (
      <motion.div
        ref={setRefs}
        layout
        layoutId={`skill-card-${skill.id}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: isDimmed ? 0.22 : 1,
          scale: isActive ? 1.03 : 1,
          filter: isDimmed ? "grayscale(70%) blur(0.5px)" : "grayscale(0%) blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`group relative ${spanClass} cursor-pointer select-none rounded-xl`}
        style={{
          perspective: 1000,
          zIndex: isActive ? 30 : isRelated ? 25 : 10,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(skill)}
        role="button"
        tabIndex={0}
        aria-label={`${skill.name} - ${skill.role}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(skill);
          }
        }}
      >
        {/* 3D Tilted Inner Wrapper */}
        <div
          className={`relative h-full w-full overflow-hidden rounded-xl border bg-gradient-to-b from-[#131927]/90 via-[#0d121e]/95 to-[#090d16] p-4 sm:p-5 backdrop-blur-md transition-all duration-300 ${
            isActive
              ? `${style.borderActive} bg-[#161f33]`
              : isRelated
              ? "border-sky-400/60 shadow-[0_0_18px_rgba(56,189,248,0.25)] bg-[#121a2c]"
              : "border-slate-800/80 hover:border-slate-700/80"
          }`}
          style={{
            transform: isHoveredLocal
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(10px)`
              : "none",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Reactive Spotlight Glare */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(320px circle at ${tilt.glareX}% ${tilt.glareY}%, ${style.subtleGlow}, transparent 75%)`,
            }}
          />

          {/* Sudoku Corner HUD Brackets */}
          <div className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-slate-600/40 group-hover:border-slate-400/80" />
          <div className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-slate-600/40 group-hover:border-slate-400/80" />
          <div className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-slate-600/40 group-hover:border-slate-400/80" />
          <div className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-slate-600/40 group-hover:border-slate-400/80" />

          {/* Sudoku Matrix Header: Coordinate, Sector, Status */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
              <span className="opacity-90">{skill.matrixCoord}</span>
            </span>

            <div className="flex items-center gap-1.5">
              <span className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-400 border border-slate-700/50">
                {skill.sectorCode}
              </span>

              {skill.isAnchor && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-amber-300 border border-amber-400/30">
                  <Sparkles className="h-2.5 w-2.5" />
                  CORE
                </span>
              )}

              {isRelated && (
                <span className="inline-flex items-center gap-0.5 rounded bg-sky-400/20 px-1.5 py-0.5 text-[9px] font-bold text-sky-300 border border-sky-400/40 animate-pulse">
                  <Link2 className="h-2.5 w-2.5" />
                  LINKED
                </span>
              )}
            </div>
          </div>

          {/* Main Card Content */}
          <div className="mt-3 flex items-start gap-3">
            {/* Tech Icon Container */}
            <div
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-900/80 p-2 text-slate-300 shadow-inner transition-transform duration-300 group-hover:scale-110 ${style.iconGlow}`}
            >
              <TechIcon id={skill.id} className="h-6 w-6" />
            </div>

            {/* Name & Role Description */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold tracking-tight text-white group-hover:text-white sm:text-lg">
                {skill.name}
              </h3>
              <p className="truncate text-xs font-mono text-slate-400 group-hover:text-slate-300">
                {skill.role}
              </p>
            </div>
          </div>

          {/* CV Highlight / Application Preview */}
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-400/90 group-hover:text-slate-300">
            {skill.cvHighlight}
          </p>

          {/* Footer Telemetry: Linked Dependencies count + Click Dossier prompt */}
          <div className="mt-3.5 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-300">
              <span className="opacity-70">CONNECTIONS:</span>
              <strong className={`font-bold ${style.textAccent}`}>
                {skill.relatedIds?.length || 0}
              </strong>
            </span>

            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 transition-colors group-hover:text-white">
              <span>INSPECT</span>
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

SkillCard.displayName = "SkillCard";
