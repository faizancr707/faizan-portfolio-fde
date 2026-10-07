import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Terminal, Home, Compass, Radio, ArrowRight, ShieldAlert, Cpu } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20 relative overflow-hidden">
      {/* Background Radar Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full rounded-full border border-emerald-500/10 animate-ping opacity-25" />
        <div className="absolute inset-16 rounded-full border border-violet-500/15" />
        <div className="absolute inset-32 rounded-full border border-sky-500/20" />
      </div>

      <div className="text-center max-w-xl mx-auto relative z-10 p-8 rounded-3xl bg-[#0c101b]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
        {/* Cyber Corner Marks */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

        {/* Telemetry Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>STATUS // 404_SECTOR_NOT_FOUND</span>
        </div>

        {/* 404 Glitch Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-4"
        >
          <div className="text-7xl sm:text-9xl font-black font-mono tracking-tighter bg-gradient-to-b from-white via-slate-300 to-slate-600 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400/80 bg-[#0c101b] px-3 py-1 border border-emerald-500/30 rounded">
              SIGNAL LOST IN DIGITAL VOID
            </span>
          </div>
        </motion.div>

        <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Sector Coordinates Unresolved
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-mono">
          The requested route does not exist within the Command Center registry. The route may have been
          decommissioned or rerouted to another sector.
        </p>

        {/* Action Dials */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Mission Control</span>
          </Link>
          <Link
            to="/skills"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all"
          >
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>Explore Skills Grid</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
