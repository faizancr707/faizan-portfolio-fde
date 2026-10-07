import React, { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_CATEGORIES, PROJECTS_DATA } from "@/data/projectsData";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGridLines } from "@/components/projects/ProjectGridLines";
import { ProjectDossierModal } from "@/components/projects/ProjectDossierModal";
import { ProjectsCommandHUD } from "@/components/projects/ProjectsCommandHUD";
import {
  Activity,
  Terminal,
  Compass,
  Layers,
  Sparkles,
  Link2,
} from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const containerRef = useRef(null);
  const cardRefs = useRef({});

  // Active target is either hovered card or selected card
  const activeProjectId = hoveredProjectId || (selectedProject ? selectedProject.id : null);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId),
    [projects, activeProjectId]
  );

  const relatedSet = useMemo(() => {
    if (!activeProject || !activeProject.relatedProjectIds) return new Set();
    return new Set(activeProject.relatedProjectIds);
  }, [activeProject]);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      let matchesCategory = true;
      if (activeCategory === "featured") {
        matchesCategory = item.isFeatured;
      } else if (activeCategory !== "all") {
        matchesCategory = item.category === activeCategory;
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.codename.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.techStack.some((t) => t.toLowerCase().includes(query)) ||
        item.keyFeatures.some((f) => f.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Total interconnected linkages
  const totalActiveConnections = useMemo(() => {
    return filteredProjects.reduce(
      (acc, curr) => acc + (curr.relatedProjectIds?.length || 0),
      0
    );
  }, [filteredProjects]);

  // Rearrange / Scramble grid layout
  const handleShuffle = useCallback(() => {
    setProjects((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  }, []);

  const handleHoverStart = useCallback((id) => {
    setHoveredProjectId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredProjectId(null);
  }, []);

  const handleCardClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handlePivotRelated = useCallback((targetProject) => {
    setSelectedProject(targetProject);
    setHoveredProjectId(targetProject.id);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070a12] text-slate-100 px-4 py-16 sm:px-6 lg:px-10 xl:px-16 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Ambient Cyber Grid & Glowing Atmospheric Lights */}
      <div className="pointer-events-none fixed inset-0 -z-10 cyber-grid-bg opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-500/10 via-purple-600/5 to-transparent blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 -z-10 h-[500px] w-[650px] rounded-full bg-emerald-500/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            <Activity className="h-3.5 w-3.5 animate-pulse text-sky-400" />
            <span>ENGINEERING COMMAND CENTER // PRODUCTION DEPLOYMENTS</span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Systems & <span className="bg-gradient-to-r from-sky-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">Architectures</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                A dynamic, interconnected engineering grid spanning distributed event queues, multi-agent AI loops, microservices, and high-concurrency SaaS connectors.
              </p>
            </div>

            {/* Visual Palette Guide */}
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
        <ProjectsCommandHUD
          categories={PROJECT_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalProjects={projects.length}
          visibleProjects={filteredProjects.length}
          activeConnectionsCount={totalActiveConnections}
          onShuffle={handleShuffle}
        />

        {/* Active Project Dependency Link Ribbon */}
        <AnimatePresence>
          {activeProject && (
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
                  ACTIVE BLUEPRINT FOCUS: <strong className="text-white text-sm">{activeProject.title}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Link2 className="h-3.5 w-3.5 text-sky-400" />
                  <span>
                    CONNECTED ARCHITECTURES: <strong className="text-amber-300 font-bold">{activeProject.relatedProjectIds?.length || 0}</strong>
                  </span>
                </span>

                <button
                  onClick={() => setSelectedProject(activeProject)}
                  className="rounded bg-sky-500/20 px-2 py-0.5 text-[11px] font-semibold text-sky-300 border border-sky-400/30 hover:bg-sky-500/30"
                >
                  EXPAND BLUEPRINT ↗
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Projects Grid with Relative SVG Lines Overlay */}
        <div ref={containerRef} className="relative w-full">
          {/* Animated SVG Laser Connections */}
          <ProjectGridLines
            activeProjectId={activeProjectId}
            projects={projects}
            cardRefs={cardRefs}
            containerRef={containerRef}
          />

          {/* Responsive CSS Grid with Dense Auto-Placement */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 [grid-auto-flow:dense]"
          >
            {filteredProjects.map((project) => {
              const isActive = project.id === activeProjectId;
              const isRelated = relatedSet.has(project.id);
              const isDimmed = activeProjectId && !isActive && !isRelated;

              return (
                <ProjectCard
                  key={project.id}
                  ref={(el) => {
                    if (el) cardRefs.current[project.id] = el;
                    else delete cardRefs.current[project.id];
                  }}
                  project={project}
                  isActive={isActive}
                  isRelated={isRelated}
                  isDimmed={isDimmed}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onClick={handleCardClick}
                />
              );
            })}
          </motion.div>

          {/* Empty Search State */}
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
              <Terminal className="mx-auto h-12 w-12 text-slate-600" />
              <h3 className="mt-4 text-lg font-bold text-white">
                No matching projects found
              </h3>
              <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
                No engineering architectures matching &quot;{searchQuery}&quot; in category &quot;{activeCategory}&quot;. Try clearing filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-5 rounded-lg bg-sky-500/20 px-4 py-2 font-mono text-xs font-semibold text-sky-300 border border-sky-400/30 hover:bg-sky-500/30"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>

        {/* Footer Command Center Footnote */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>FAIZAN ALAM · ENGINEERING MISSIONS & ARCHITECTURE REGISTRY</span>
          </div>

          <div className="flex items-center gap-3">
            <span>GRID TOPOLOGY: DYNAMIC DENSE AUTO-PLACEMENT</span>
            <span>·</span>
            <span>ALL SYSTEMS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Click-to-Expand Project Dossier Inspection Modal */}
      <ProjectDossierModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={handleCloseModal}
        onSelectRelated={handlePivotRelated}
        allProjects={projects}
      />
    </div>
  );
};

export default Projects;