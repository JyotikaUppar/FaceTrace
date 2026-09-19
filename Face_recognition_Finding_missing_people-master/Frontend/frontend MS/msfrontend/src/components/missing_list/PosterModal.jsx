import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PosterModal = ({ isOpen, onClose, person }) => {
  if (!isOpen || !person) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `https://facetrace.org/missing/${person.adhaar}`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
        
        {/* ACTION HEADER (Hidden when printing) */}
        <div className="fixed top-6 right-6 flex items-center gap-3 z-50 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg hover:shadow-red-500/25 transition-all text-sm uppercase tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save PDF
          </button>

          <button
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PRINTABLE POSTER CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-8 border-red-600 print:shadow-none print:border-4 print:border-red-600 print:w-full print:max-w-none print:rounded-none my-8"
        >
          {/* HEADER BANNER */}
          <div className="bg-red-600 text-white text-center py-6 px-4">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-widest print:text-4xl">
              MISSING PERSON
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1 opacity-90">
              FACETRACE SURVEILLANCE & RECOVERY NETWORK
            </p>
          </div>

          <div className="p-8 space-y-6 print:p-6 print:space-y-4">
            {/* PHOTO AND QUICK DETAILS */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-48 h-60 bg-slate-100 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-md flex-shrink-0">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                  {person.name}
                </h2>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Gender</span>
                    <span className="text-base font-black text-slate-800">{person.gender}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Height</span>
                    <span className="text-base font-black text-slate-800">{person.height} ft</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Missing Since</span>
                    <span className="text-base font-black text-red-600">{person.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Aadhaar ID</span>
                    <span className="text-base font-black text-slate-800">{person.adhaar}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS & IDENTIFICATION */}
            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Last Known Location / Address</h4>
                <p className="text-sm font-bold text-slate-800 mt-1">{person.address}</p>
              </div>

              {person.identification && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">Distinguishing Marks / Features</h4>
                  <p className="text-sm font-bold text-amber-900 mt-1">{person.identification}</p>
                </div>
              )}
            </div>

            {/* QR CODE & EMERGENCY CONTACT */}
            <div className="pt-4 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-black text-red-600 uppercase tracking-wide">
                  IF SEEN, CONTACT IMMEDIATELY:
                </h3>
                <p className="text-xl font-black text-slate-900">
                  📞 Emergency: 112 / 1094
                </p>
                <p className="text-xs font-bold text-slate-500">
                  Reference Aadhaar ID: <span className="font-mono">{person.adhaar}</span>
                </p>
              </div>

              <div className="text-center flex-shrink-0">
                <img
                  src={qrUrl}
                  alt="Scan QR to Track"
                  className="w-24 h-24 border-2 border-slate-900 rounded-lg p-1 bg-white mx-auto shadow-sm"
                />
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mt-1">
                  Scan to View Activity Map
                </span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-slate-900 text-white text-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest">
            FACETRACE NATIONAL SURVEILLANCE & MISSING PERSON RECOVERY PORTAL
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PosterModal;
