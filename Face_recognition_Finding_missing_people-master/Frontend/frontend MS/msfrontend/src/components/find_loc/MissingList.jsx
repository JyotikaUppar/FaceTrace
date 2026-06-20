import React, { useEffect, useState } from 'react'
import Missingcard from './Missingcard'
import locationimg from "./Locationnew.png"
import { motion } from "framer-motion"

const MissingList = () => {
  const [location, setLocation] = useState([])
  const [text, setText] = useState('')
  const [current, setcurrent] = useState('')

  const handleinput = (e) => {
    if (e.target.value === "") {
      setText("")
    }
    setcurrent(e.target.value)
  }

  const handleclick = () => {
    setText(current)
  }

  const getdata = async () => {
    const response = await fetch("http://localhost:5000/api/foundlocation/getalllocations");
    let data = await response.json();
    setLocation(data)
  }

  useEffect(() => {
    getdata();
  }, [])

  return (
    <div className="pt-12 pb-32 lg:pt-16 lg:pb-56 px-12 lg:px-32 min-h-screen bg-white selection:bg-indigo-100 overflow-x-hidden">
      
      {/* HEADER */}
      <div className="w-full mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 text-left">
        <div className="space-y-10 flex-1">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            Real-time Detection
          </motion.span>
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-[100px] font-black text-slate-900 leading-[0.9] tracking-tighter"
            >
              Detected <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-[16px]">Locations</span>
            </motion.h2>
            <p className="text-slate-400 font-bold max-w-2xl text-2xl leading-relaxed">
              Monitor real-time detection pings from our nationwide network. 
              Search by Aadhaar ID to filter results.
            </p>
          </div>
        </div>

        {/* SEARCH BAR (Upscaled) */}
        <div className="relative group w-full lg:max-w-[450px]">
          <input
            type="search"
            placeholder='Search by Aadhaar ID...'
            onChange={handleinput}
            value={current}
            className="w-full pl-14 pr-32 py-5 bg-slate-50 rounded-[24px] border-2 border-slate-100 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-lg font-bold text-slate-900 placeholder:text-slate-300"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <svg className="w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={handleclick}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-indigo-600 text-white text-[13px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="w-full">
        {location.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-10">
            {location.map((element, idx) => {
              if (text === "" || element.adhaar_number === text) {
                return (
                  <Missingcard
                    key={`${element.adhaar_number}_${element.date}_${idx}`}
                    name={element.name}
                    adhaar={element.adhaar_number}
                    date={element.date}
                    region={element.location.region}
                    latitude={element.location.latitude}
                    longitude={element.location.longitude}
                    country={element.location.country}
                    state={element.location.city}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-48 bg-slate-50 rounded-[60px] border-4 border-dashed border-slate-100"
          >
            <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center mb-10 shadow-xl shadow-slate-200/50">
              <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <p className="text-3xl font-black text-slate-400">Waiting for detection pings...</p>
            <p className="text-lg font-bold text-slate-300 mt-3">Our AI is actively searching the nation-wide network.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MissingList