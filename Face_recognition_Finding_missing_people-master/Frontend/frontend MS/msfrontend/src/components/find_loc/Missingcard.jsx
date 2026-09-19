import React from 'react';
import { motion } from "framer-motion";

const Missingcard = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-500 border border-slate-50 flex flex-col justify-between"
    >
      <div className="flex flex-col space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-50 rounded-[20px] flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100/50 flex-shrink-0 transition-transform group-hover:scale-110 duration-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div className="min-w-0 space-y-1">
            <h5 className="text-xl font-black text-slate-900 truncate tracking-tight" title={props.name}>{props.name}</h5>
            <p className="text-xs font-black text-indigo-500 uppercase tracking-widest leading-none">Aadhaar: {props.adhaar}</p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-6 py-6 border-y border-slate-50">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Detected At</p>
            <p className="text-base font-black text-slate-800 leading-none">{props.date}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Region</p>
            <p className="text-base font-black text-slate-800 leading-none">{props.region}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">City</p>
            <p className="text-base font-black text-slate-800 leading-none truncate">{props.state}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Signal Node</p>
            <p className="text-xs font-black text-emerald-500 leading-none uppercase tracking-widest">Active Ping</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => props.onOpenGeofence(props.adhaar, props.name)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white font-black rounded-2xl transition-all text-xs uppercase tracking-wider"
          >
            📡 Trigger 5km Geofence Alert
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default Missingcard;