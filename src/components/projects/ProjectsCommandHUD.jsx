import React from "react";
import {
  Layers,
  Search,
  Shuffle,
  SlidersHorizontal,
  X,
  Sparkles,
  Terminal,
} from "lucide-react";

/**
 * ProjectsCommandHUD
 * Telemetry bar and controls for filtering, searching, and adapting the projects grid.
 */
export const ProjectsCommandHUD = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalProjects,
  visibleProjects,
  activeConnectionsCount,
  onShuffle,
}) => {
  return (
    <div className="relative mb-8 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-[#111726]/85 via-[#0d1322]/90 to-[#0a0e19]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
      {/* Top Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 text-xs font-mono text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-emerald-400 font-semibold tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            SYSTEM: ONLINE
          </span>

          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline">
            CLUSTER: <strong className="text-slate-300">ACTIVE HUBS</strong>
          </span>

          <span className="text-slate-700">|</span>
          <span>
            MISSIONS: <strong className="text-white">{visibleProjects}</strong> / {totalProjects}
          </span>

          <span className="text-slate-700">|</span>
          <span className="hidden md:inline">
            CROSS-LINKS: <strong className="text-sky-400">{activeConnectionsCount}</strong> LINKED
          </span>
        </div>

        {/* Dynamic Rearrange Button */}
        <button
          onClick={onShuffle}
          className="group flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 transition-all hover:border-amber-400/50 hover:bg-slate-800 hover:text-amber-300"
          title="Dynamic grid realignment"
        >
          <Shuffle className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180 text-amber-400" />
          <span className="font-semibold">ADAPT MESH</span>
        </button>
      </div>

      {/* Main Controls: Search & Category Filter Pills */}
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by tech, architecture or title..."
            className="w-full rounded-xl border border-slate-800 bg-[#090d16] py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-200 placeholder-slate-500 transition focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Info Legend */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
          <span>FLAGSHIPS EXPANDED BY DEFAULT</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
        <span className="font-mono text-[11px] text-slate-400 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="h-3 w-3" />
          CATEGORY:
        </span>

        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                isSelected
                  ? "bg-sky-500/20 text-sky-300 font-semibold border border-sky-400/50 shadow-[0_0_12px_rgba(14,165,233,0.2)]"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <span className="opacity-60 mr-1.5">[{cat.badge}]</span>
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
