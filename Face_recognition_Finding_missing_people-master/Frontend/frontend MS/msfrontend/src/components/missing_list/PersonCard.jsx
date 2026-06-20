import React from "react";
import { motion } from "framer-motion";

const PersonCard = ({
  name,
  gender,
  adhaar,
  email,
  address,
  date,
  height,
  identification,
  image,
  totalcases,
  changecase,
}) => {
  const deleteThis = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/missingpeople/deleteperson/${id}`,
        { method: "DELETE" }
      );
      if (response.status === 200) {
        changecase(totalcases.filter((item) => item.adhaar_number !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 group-hover:opacity-100 transition-opacity">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm border border-red-100">
            Active Case
          </span>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="p-6 space-y-5">
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <h3 className="text-2xl font-black text-slate-900 truncate" title={name}>{name}</h3>
            <p className="text-sm text-slate-500 font-bold mt-1">{gender} • {height} ft</p>
          </div>
          <motion.button
            onClick={() => deleteThis(adhaar)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Mark as found"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-5 border-t border-slate-50">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Missing Since</p>
            <p className="text-base font-black text-slate-700 mt-1">{date}</p>
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Aadhaar ID</p>
            <p className="text-base font-black text-slate-700 mt-1">{adhaar}</p>
          </div>
        </div>

        <div className="pt-4 flex items-start gap-3">
          <div className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
             <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <span className="text-sm font-bold text-slate-500 line-clamp-2" title={address}>{address}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonCard;
