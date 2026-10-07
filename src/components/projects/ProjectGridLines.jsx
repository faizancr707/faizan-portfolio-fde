import React, { useEffect, useState, useRef, useCallback } from "react";

/**
 * ProjectGridLines
 * Renders dynamic, animated SVG laser lines connecting related engineering projects.
 */
export const ProjectGridLines = ({
  activeProjectId,
  projects,
  cardRefs,
  containerRef,
}) => {
  const [lines, setLines] = useState([]);
  const animFrameRef = useRef(null);

  const calculateConnections = useCallback(() => {
    if (!activeProjectId || !containerRef.current) {
      setLines([]);
      return;
    }

    const activeCard = cardRefs.current[activeProjectId];
    const container = containerRef.current;
    if (!activeCard || !container) {
      setLines([]);
      return;
    }

    const activeProject = projects.find((p) => p.id === activeProjectId);
    if (!activeProject || !activeProject.relatedProjectIds || activeProject.relatedProjectIds.length === 0) {
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

    activeProject.relatedProjectIds.forEach((targetId) => {
      const targetCard = cardRefs.current[targetId];
      if (!targetCard) return;

      const targetProject = projects.find((p) => p.id === targetId);
      const targetRect = targetCard.getBoundingClientRect();
      const targetCenter = {
        x: targetRect.left - containerRect.left + targetRect.width / 2,
        y: targetRect.top - containerRect.top + targetRect.height / 2,
      };

      const dx = targetCenter.x - sourceCenter.x;
      const dy = targetCenter.y - sourceCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const curvature = Math.min(Math.max(dist * 0.28, 45), 140);
      const cx1 = sourceCenter.x + (dx > 0 ? curvature : -curvature) * 0.45;
      const cy1 = sourceCenter.y + (dy > 0 ? 0 : -curvature * 0.25);
      const cx2 = targetCenter.x - (dx > 0 ? curvature : -curvature) * 0.45;
      const cy2 = targetCenter.y;

      const pathData = `M ${sourceCenter.x} ${sourceCenter.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${targetCenter.x} ${targetCenter.y}`;

      newLines.push({
        id: `${activeProjectId}->${targetId}`,
        targetTitle: targetProject?.title || targetId,
        source: sourceCenter,
        target: targetCenter,
        pathData,
        accent: activeProject.accent || "signal",
      });
    });

    setLines(newLines);
  }, [activeProjectId, projects, cardRefs, containerRef]);

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

  if (!activeProjectId || lines.length === 0) return null;

  const getStrokeColors = (accent) => {
    switch (accent) {
      case "champagne":
        return {
          glow: "rgba(251, 191, 36, 0.45)",
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
        <filter id="prj-laser-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
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
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#prj-laser-glow)"
              opacity="0.6"
            />

            {/* Solid circuit connection line */}
            <path
              d={line.pathData}
              fill="none"
              stroke={colors.core}
              strokeWidth="2"
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
              strokeDasharray="8 22"
              className="animate-laser-flow"
              filter="url(#prj-laser-glow)"
            />

            {/* Target node dot */}
            <circle
              cx={line.target.x}
              cy={line.target.y}
              r="5"
              fill={colors.core}
              filter="url(#prj-laser-glow)"
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
            r="9"
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
            filter="url(#prj-laser-glow)"
          />
        </g>
      )}
    </svg>
  );
};
