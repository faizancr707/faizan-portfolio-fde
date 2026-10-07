import React, { useEffect, useState, useRef, useCallback } from "react";

/**
 * SudokuGridLines
 * Renders dynamic, animated SVG laser connection lines between the active skill and its dependencies.
 */
export const SudokuGridLines = ({
  activeSkillId,
  skills,
  cardRefs,
  containerRef,
}) => {
  const [lines, setLines] = useState([]);
  const animFrameRef = useRef(null);

  const calculateConnections = useCallback(() => {
    if (!activeSkillId || !containerRef.current) {
      setLines([]);
      return;
    }

    const activeCard = cardRefs.current[activeSkillId];
    const container = containerRef.current;
    if (!activeCard || !container) {
      setLines([]);
      return;
    }

    const activeSkill = skills.find((s) => s.id === activeSkillId);
    if (!activeSkill || !activeSkill.relatedIds || activeSkill.relatedIds.length === 0) {
      setLines([]);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const sourceRect = activeCard.getBoundingClientRect();

    const sourceCenter = {
      x: sourceRect.left - containerRect.left + sourceRect.width / 2,
      y: sourceRect.top - containerRect.top + sourceRect.height / 2,
    };

    const newLines = [];

    activeSkill.relatedIds.forEach((targetId) => {
      const targetCard = cardRefs.current[targetId];
      if (!targetCard) return;

      const targetSkill = skills.find((s) => s.id === targetId);
      const targetRect = targetCard.getBoundingClientRect();
      const targetCenter = {
        x: targetRect.left - containerRect.left + targetRect.width / 2,
        y: targetRect.top - containerRect.top + targetRect.height / 2,
      };

      // Calculate organic circuit curve
      const dx = targetCenter.x - sourceCenter.x;
      const dy = targetCenter.y - sourceCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Curvature offset based on distance and orientation
      const curvature = Math.min(Math.max(dist * 0.25, 40), 120);
      const cx1 = sourceCenter.x + (dx > 0 ? curvature : -curvature) * 0.4;
      const cy1 = sourceCenter.y + (dy > 0 ? 0 : -curvature * 0.2);
      const cx2 = targetCenter.x - (dx > 0 ? curvature : -curvature) * 0.4;
      const cy2 = targetCenter.y;

      const pathData = `M ${sourceCenter.x} ${sourceCenter.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${targetCenter.x} ${targetCenter.y}`;

      newLines.push({
        id: `${activeSkillId}->${targetId}`,
        targetName: targetSkill?.name || targetId,
        source: sourceCenter,
        target: targetCenter,
        pathData,
        accent: activeSkill.accent || "signal",
      });
    });

    setLines(newLines);
  }, [activeSkillId, skills, cardRefs, containerRef]);

  // Recalculate on scroll, resize, or hover changes
  useEffect(() => {
    const handleUpdate = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(calculateConnections);
    };

    handleUpdate();

    window.addEventListener("resize", handleUpdate, { passive: true });
    window.addEventListener("scroll", handleUpdate, { passive: true });

    const observer = new ResizeObserver(handleUpdate);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [calculateConnections, containerRef]);

  if (!activeSkillId || lines.length === 0) return null;

  // Accent color mapping
  const getStrokeColors = (accent) => {
    switch (accent) {
      case "champagne":
        return {
          glow: "rgba(251, 191, 36, 0.4)",
          core: "#fbbf24",
          laser: "#fef08a",
        };
      case "emerald":
      case "lime":
        return {
          glow: "rgba(16, 185, 129, 0.45)",
          core: "#10b981",
          laser: "#86efac",
        };
      case "iris":
        return {
          glow: "rgba(139, 92, 246, 0.45)",
          core: "#8b5cf6",
          laser: "#c4b5fd",
        };
      case "signal":
      default:
        return {
          glow: "rgba(14, 165, 233, 0.45)",
          core: "#0ea5e9",
          laser: "#7dd3fc",
        };
    }
  };

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="intense-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {lines.map((line) => {
        const colors = getStrokeColors(line.accent);

        return (
          <g key={line.id} className="transition-opacity duration-300">
            {/* Ambient wide glow path */}
            <path
              d={line.pathData}
              fill="none"
              stroke={colors.glow}
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#laser-glow)"
              opacity="0.6"
            />

            {/* Solid circuit connection line */}
            <path
              d={line.pathData}
              fill="none"
              stroke={colors.core}
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Traveling laser pulse */}
            <path
              d={line.pathData}
              fill="none"
              stroke={colors.laser}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="8 20"
              className="animate-laser-flow"
              filter="url(#laser-glow)"
            />

            {/* Target node dot */}
            <circle
              cx={line.target.x}
              cy={line.target.y}
              r="4.5"
              fill={colors.core}
              filter="url(#laser-glow)"
            />
            <circle
              cx={line.target.x}
              cy={line.target.y}
              r="2"
              fill="#ffffff"
            />
          </g>
        );
      })}

      {/* Origin/source node anchor pulse ring */}
      {lines[0] && (
        <g>
          <circle
            cx={lines[0].source.x}
            cy={lines[0].source.y}
            r="8"
            fill="none"
            stroke={getStrokeColors(lines[0].accent).core}
            strokeWidth="2"
            opacity="0.8"
            className="animate-ping"
          />
          <circle
            cx={lines[0].source.x}
            cy={lines[0].source.y}
            r="5"
            fill={getStrokeColors(lines[0].accent).laser}
            filter="url(#laser-glow)"
          />
        </g>
      )}
    </svg>
  );
};
