import React, { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTORS, SKILLS_DATA } from "@/data/skillsData";
import { SkillCard } from "@/components/skills/SkillCard";
import { SudokuGridLines } from "@/components/skills/SudokuGridLines";
import { SkillDossierModal } from "@/components/skills/SkillDossierModal";
import { CommandCenterHUD } from "@/components/skills/CommandCenterHUD";
import {
  Cpu,
  Sparkles,
  Link2,
  Terminal,
  Activity,
  Layers,
  Info,
  Compass,
} from "lucide-react";

const Skills = () => {
  const [skills, setSkills] = useState(SKILLS_DATA);
  const [activeSector, setActiveSector] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [layoutMode, setLayoutMode] = useState("matrix"); // "matrix" | "cluster"
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const containerRef = useRef(null);
  const cardRefs = useRef({});

  // Active target is either the hovered card or currently inspected card
  const activeSkillId = hoveredSkillId || (selectedSkill ? selectedSkill.id : null);

  // Active skill object and set of its related technology IDs
  const activeSkill = useMemo(
    () => skills.find((s) => s.id === activeSkillId),
    [skills, activeSkillId]
  );

  const relatedSet = useMemo(() => {
    if (!activeSkill || !activeSkill.relatedIds) return new Set();
    return new Set(activeSkill.relatedIds);
  }, [activeSkill]);

  // Filter skills by sector and search query
  const filteredSkills = useMemo(() => {
    return skills.filter((item) => {
      const matchesSector =
        activeSector === "all" || item.sectorId === activeSector;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cvHighlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cvApplication.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSector && matchesSearch;
    });
  }, [skills, activeSector, searchQuery]);

  // Total active linkages in filtered set
  const totalActiveConnections = useMemo(() => {
    return filteredSkills.reduce(
      (acc, curr) => acc + (curr.relatedIds?.length || 0),
      0
    );
  }, [filteredSkills]);

  // Shuffle / Rearrange matrix dynamically
  const handleShuffle = useCallback(() => {
    setSkills((prev) => {
      const copy = [...prev];
      // Fisher-Yates shuffle
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  }, []);

  // Hover handlers
  const handleHoverStart = useCallback((id) => {
    setHoveredSkillId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredSkillId(null);
  }, []);

  // Card click to inspect
  const handleCardClick = useCallback((skill) => {
    setSelectedSkill(skill);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  // Pivot modal to another related skill
  const handlePivotRelated = useCallback(
    (targetSkill) => {
      setSelectedSkill(targetSkill);
      setHoveredSkillId(targetSkill.id);
    },
    []
  );

  // Grouped skills by sector for "cluster" mode
  const sectorGroups = useMemo(() => {
    const validSectors = SECTORS.filter((s) => s.id !== "all");
    return validSectors
      .map((sec) => ({
        ...sec,
        items: filteredSkills.filter((sk) => sk.sectorId === sec.id),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [filteredSkills]);

  return (
    <div className="relative min-h-screen bg-[#070a12] text-slate-100 px-4 py-16 sm:px-6 lg:px-10 xl:px-16 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Ambient Cyber Grid & Glow Overlays */}
      <div className="pointer-events-none fixed inset-0 -z-10 cyber-grid-bg opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-500/10 via-purple-600/5 to-transparent blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 -z-10 h-[450px] w-[600px] rounded-full bg-emerald-500/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header: Command Center Banner */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            <Activity className="h-3.5 w-3.5 animate-pulse text-sky-400" />
            <span>SUDOKU TECH MATRIX // VERIFIED CV STACK</span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Developer <span className="bg-gradient-to-r from-sky-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">Command Center</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                A fully dynamic, interconnected technology grid extracted strictly from my production CV. Hover any node to trace active dependencies or click to inspect real-world implementation specs.
              </p>
            </div>

            {/* Matrix Legend Badge */}
            <div className="hidden lg:flex flex-col items-end gap-1.5 font-mono text-[11px] text-slate-400">
              <span className="text-slate-300 font-semibold tracking-wider flex items-center gap-1.5">
                <Compass className="h-3 w-3 text-amber-400" />
                SYSTEM PALETTE
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                  Champagne
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  Emerald
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                  Royal Iris
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                  Signal Blue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Command Center Telemetry Header */}
        <CommandCenterHUD
          sectors={SECTORS}
          activeSector={activeSector}
          onSelectSector={setActiveSector}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          layoutMode={layoutMode}
          onChangeLayoutMode={setLayoutMode}
          totalNodes={skills.length}
          visibleNodes={filteredSkills.length}
          activeConnectionsCount={totalActiveConnections}
          onShuffle={handleShuffle}
        />

        {/* Active Node Dependency Status Bar (when a skill is hovered/selected) */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-400/40 bg-sky-950/40 px-4 py-2.5 font-mono text-xs text-sky-200 shadow-[0_0_20px_rgba(14,165,233,0.15)] backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-80" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
                </span>
                <span>
                  TARGET FOCUS: <strong className="text-white text-sm">{activeSkill.name}</strong> ({activeSkill.matrixCoord})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Link2 className="h-3.5 w-3.5 text-sky-400" />
                  <span>
                    CONNECTED HUBS: <strong className="text-amber-300 font-bold">{activeSkill.relatedIds?.length || 0}</strong>
                  </span>
                </span>

                <button
                  onClick={() => setSelectedSkill(activeSkill)}
                  className="rounded bg-sky-500/20 px-2 py-0.5 text-[11px] font-semibold text-sky-300 border border-sky-400/30 hover:bg-sky-500/30"
                >
                  OPEN DOSSIER ↗
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid Stage with Relative Positioning for SVG Connection Lines */}
        <div ref={containerRef} className="relative w-full">
          {/* Animated SVG Laser Connection Lines */}
          <SudokuGridLines
            activeSkillId={activeSkillId}
            skills={skills}
            cardRefs={cardRefs}
            containerRef={containerRef}
          />

          {/* Render Mode 1: Sudoku Auto-Matrix */}
          {layoutMode === "matrix" && (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3.5 sm:gap-4.5 [grid-auto-flow:dense]"
            >
              {filteredSkills.map((skill) => {
                const isActive = skill.id === activeSkillId;
                const isRelated = relatedSet.has(skill.id);
                const isDimmed = activeSkillId && !isActive && !isRelated;

                return (
                  <SkillCard
                    key={skill.id}
                    ref={(el) => {
                      if (el) cardRefs.current[skill.id] = el;
                      else delete cardRefs.current[skill.id];
                    }}
                    skill={skill}
                    isActive={isActive}
                    isRelated={isRelated}
                    isDimmed={isDimmed}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onClick={handleCardClick}
                    layoutMode={layoutMode}
                  />
                );
              })}
            </motion.div>
          )}

          {/* Render Mode 2: Sector Clusters */}
          {layoutMode === "cluster" && (
            <div className="space-y-10">
              {sectorGroups.map((sector) => (
                <div
                  key={sector.id}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6 backdrop-blur-sm"
                >
                  {/* Sector Telemetry Header */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-400">
                          [{sector.code}]
                        </span>
                        <h2 className="text-xl font-bold tracking-tight text-white">
                          {sector.name}
                        </h2>
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-slate-700">
                          {sector.items.length} Nodes
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {sector.description}
                      </p>
                    </div>

                    <span className="font-mono text-xs text-slate-400">
                      QUADRANT ACTIVE
                    </span>
                  </div>

                  {/* Cards inside this Sector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
                    {sector.items.map((skill) => {
                      const isActive = skill.id === activeSkillId;
                      const isRelated = relatedSet.has(skill.id);
                      const isDimmed = activeSkillId && !isActive && !isRelated;

                      return (
                        <SkillCard
                          key={skill.id}
                          ref={(el) => {
                            if (el) cardRefs.current[skill.id] = el;
                            else delete cardRefs.current[skill.id];
                          }}
                          skill={skill}
                          isActive={isActive}
                          isRelated={isRelated}
                          isDimmed={isDimmed}
                          onHoverStart={handleHoverStart}
                          onHoverEnd={handleHoverEnd}
                          onClick={handleCardClick}
                          layoutMode={layoutMode}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty Search State */}
          {filteredSkills.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
              <Terminal className="mx-auto h-12 w-12 text-slate-600" />
              <h3 className="mt-4 text-lg font-bold text-white">
                No matching technologies found
              </h3>
              <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
                No skills matching &quot;{searchQuery}&quot; in sector &quot;{activeSector}&quot;. Try resetting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveSector("all");
                }}
                className="mt-5 rounded-lg bg-sky-500/20 px-4 py-2 font-mono text-xs font-semibold text-sky-300 border border-sky-400/30 hover:bg-sky-500/30"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>

        {/* Footer Command Center Status Footnote */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>FAIZAN ALAM · FULL STACK PORTFOLIO COMMAND CENTER</span>
          </div>

          <div className="flex items-center gap-3">
            <span>SUDOKU TOPOLOGY: ADAPTIVE</span>
            <span>·</span>
            <span>VERIFIED CV ACCURACY: 100%</span>
          </div>
        </div>
      </div>

      {/* Click-to-Expand Skill Dossier Inspection Modal */}
      <SkillDossierModal
        skill={selectedSkill}
        isOpen={Boolean(selectedSkill)}
        onClose={handleCloseModal}
        onSelectRelated={handlePivotRelated}
        allSkills={skills}
      />
    </div>
  );
};

export default Skills;