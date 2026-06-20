import React, { useEffect, useState } from 'react';
import missingimg from "./missingguy.png";
import PersonCard from './PersonCard';
import { motion } from "framer-motion";

const Missing_persons = () => {
  const [cases, setCases] = useState([]);

  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/missingpeople/getallpersons");
      if (response.ok) {
        const data = await response.json();
        setCases(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching missing persons:', error);
    }
  };

  useEffect(() => { getdata(); }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  return (
    <div className="pt-12 pb-32 lg:pt-16 lg:pb-56 px-12 lg:px-32 min-h-screen bg-slate-50/30 selection:bg-indigo-100 overflow-x-hidden">

      {/* HEADER */}
      <div className="w-full mb-16 text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            Active Search Directory
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            Help Us Bring 
            Them <span className="text-indigo-600">Home</span>
          </h2>
          <p className="text-slate-500 font-bold max-w-4xl text-2xl leading-relaxed">
            Every case matters. Our AI-powered network is actively monitoring thousands of feeds to identify and reconnect missing loved ones.
          </p>
          <div className="pt-4 flex items-center gap-6 text-slate-400 font-black">
            <span className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 shadow-sm text-xl text-slate-700">
              {cases.length} Active Reports
            </span>
          </div>
        </motion.div>
      </div>

      {/* GRID */}
      <div className="w-full">
        {cases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-10">
            {cases.map((element, idx) => {
              try {
                if (!element?.image?.data?.data) return null;
                const base64string = arrayBufferToBase64(element.image.data.data);
                const src = `data:image/png;base64,${base64string}`;
                return (
                  <PersonCard
                    key={element.adhaar_number}
                    name={element.name}
                    adhaar={element.adhaar_number}
                    email={element.email}
                    date={element.Date_missing?.substring(0, 10)}
                    height={element.height?.$numberDecimal}
                    identification={element.identification}
                    gender={element.Gender}
                    address={element.address}
                    image={src}
                    totalcases={cases}
                    changecase={setCases}
                  />
                );
              } catch (err) { return null; }
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="text-slate-500 font-bold">No active cases reported at this time.</p>
            <p className="text-slate-400 text-sm mt-1">Check back later or report a new case.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Missing_persons;
