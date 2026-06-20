import React from 'react'
import { motion } from "framer-motion"

const Missingcard = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[40px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-500 border border-slate-50 flex flex-col justify-between"
    >
      <div className="flex flex-col space-y-10">
        
        {/* HEADER */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-50 rounded-[20px] flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100/50 flex-shrink-0 transition-transform group-hover:scale-110 duration-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div className="min-w-0 space-y-1">
            <h5 className="text-2xl font-black text-slate-900 truncate tracking-tight" title={props.name}>{props.name}</h5>
            <p className="text-xs font-black text-indigo-500 uppercase tracking-widest leading-none">ID: {props.adhaar}</p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-8 border-y border-slate-50">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Detected At</p>
            <p className="text-lg font-black text-slate-800 leading-none">{props.date}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Region</p>
            <p className="text-lg font-black text-slate-800 leading-none">{props.region}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">City/City</p>
            <p className="text-lg font-black text-slate-800 leading-none truncate">{props.state}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Signal Node</p>
            <p className="text-sm font-black text-emerald-500 leading-none uppercase tracking-widest">Active Ping</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Secure CCTV Feed</span>
          </div>
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Track live</span>
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}

export default Missingcard