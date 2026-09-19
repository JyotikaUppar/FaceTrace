import React from "react";
import { motion } from "framer-motion";

const MovementMap = ({ sightings }) => {
  if (!sightings || sightings.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl border border-slate-800 space-y-8 my-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/20">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            GIS Trajectory Engine
          </span>
          <h3 className="text-3xl font-black mt-2 tracking-tight">
            Chronological Movement Map
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">Total Sighting Nodes:</span>
          <span className="px-3 py-1 bg-indigo-600 text-white font-black text-xs rounded-xl">
            {sightings.length} Pings
          </span>
        </div>
      </div>

      {/* INTERACTIVE TRAJECTORY GRAPH & MAP VISUALIZER */}
      <div className="relative bg-slate-950/80 rounded-2xl p-6 border border-slate-800 overflow-hidden min-h-[300px] flex flex-col justify-between">
        
        {/* SVG POLYLINE TRAJECTORY CONNECTOR */}
        <div className="absolute inset-0 p-12 pointer-events-none opacity-40">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 50 150 Q 250 50, 450 150 T 850 150"
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* SIGHTING NODES GRID */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          {sightings.map((item, idx) => {
            const isLatest = idx === sightings.length - 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`p-6 rounded-2xl border transition-all ${
                  isLatest
                    ? "bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/90 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                    isLatest ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}>
                    {isLatest ? "Latest Sighting" : `Ping Node #${idx + 1}`}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {item.date || "Active"}
                  </span>
                </div>

                <h4 className="text-xl font-black text-white truncate" title={item.name}>
                  {item.location?.region || item.location?.city || "Node Surveillance"}
                </h4>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1 text-xs text-slate-400 font-bold">
                  <p>Country/City: {item.location?.country || "India"} / {item.location?.city || "N/A"}</p>
                  <p className="font-mono text-indigo-400">
                    Lat: {item.location?.latitude || "12.9716"}, Long: {item.location?.longitude || "77.5946"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovementMap;
