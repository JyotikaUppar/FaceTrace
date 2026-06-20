import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// New high-quality assets
import posterImg from "../../images/missing_poster.png";
import cctvImg from "../../images/cctv_scene.png";
import reunionImg from "../../images/reunion_moment.png";

const Hero = () => {
  return (
    <div className="bg-white scroll-smooth selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-128px)] flex items-center justify-center py-20 lg:py-24">
        
        {/* BACKGROUND DECORATION */}
        <div className="absolute top-[-10%] right-[-10%] -z-10 w-[800px] h-[800px] bg-indigo-50/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] -z-10 w-[700px] h-[700px] bg-slate-50 rounded-full blur-[120px]" />

        <div className="w-full px-10 lg:px-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* LEFT SIDE: COPY AND CTAS */}
          <div className="w-full lg:w-[55%] text-center lg:text-left space-y-12">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-black uppercase tracking-[0.2em]"
              >
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse" />
                AI-Powered Human Rescue
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-[110px] font-black text-slate-900 leading-[0.95] tracking-[-0.04em]"
              >
                Bring Loved Ones <br />
                <span className="text-indigo-600">Home Faster</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-bold"
              >
                FaceTrace leverages advanced neural networks and nationwide 
                surveillance to reconnect families with missing persons in real-time.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start pt-4"
            >
              <Link to="/Formmissing" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-7 bg-indigo-600 text-white text-[24px] font-black rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-700 w-full border-b-8 border-indigo-800 active:border-b-0"
                >
                  Report Missing Person
                </motion.button>
              </Link>
              
              <Link to="/Missingpeople" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-7 bg-white text-slate-900 text-[24px] font-black rounded-3xl border-2 border-slate-200 shadow-xl transition-all w-full hover:bg-slate-50"
                >
                  View Missing List
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-16 flex items-center gap-16 justify-center lg:justify-start border-t-2 border-slate-50"
            >
              <div>
                <p className="text-4xl font-black text-slate-900">1,200+</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Cases Solved</p>
              </div>
              <div className="w-0.5 h-12 bg-slate-100" />
              <div>
                <p className="text-4xl font-black text-indigo-600">98%</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Match Accuracy</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: HERO IMAGERY */}
          <div className="w-full lg:w-[45%] relative flex justify-center items-center h-[500px] lg:h-[700px]">
             {/* Main Image Container */}
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[550px] lg:-top-16"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-slate-100">
                <img 
                  src={posterImg} 
                  alt="Missing Person Poster" 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent" />
              </div>
              
              {/* Floating Element 1 - AI Badge */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 bg-white p-6 rounded-[32px] shadow-2xl border border-indigo-50 flex items-center gap-5 z-20"
              >
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Real-time</p>
                  <p className="text-xl font-black text-slate-900">AI Detection</p>
                </div>
              </motion.div>

              {/* Floating Element 2 - Verification */}
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [1, -1, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-12 -left-8 bg-white p-6 rounded-[32px] shadow-2xl border border-slate-50 flex items-center gap-5 z-20"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Verified</p>
                  <p className="text-xl font-black text-slate-900">Case Solved</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-16 border-4 border-slate-100 rounded-full flex justify-center p-2"
          >
            <div className="w-2 h-4 bg-indigo-600 rounded-full" />
          </motion.div>
        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-slate-50/30 relative pt-12 pb-32 lg:pt-16 lg:pb-56 border-t border-slate-50">
        <div className="w-full px-10 lg:px-24">
          <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">How FaceTrace Works</h2>
            <p className="text-2xl text-slate-500 font-bold">Empowering search efforts with three decisive steps.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                title: "Report Case",
                desc: "Upload a photo and key details to our nationwide network in seconds.",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>,
                color: "bg-indigo-600 text-white"
              },
              {
                title: "AI Detection",
                desc: "Our neural networks scan live feeds across the country for biometric matches.",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
                color: "bg-indigo-600 text-white"
              },
              {
                title: "Notify Help",
                desc: "Instant alerts are sent to authorities and families upon positive verification.",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
                color: "bg-indigo-600 text-white"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-12 bg-white rounded-[40px] border border-slate-50 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className={`${step.color} w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-indigo-100 transition-transform group-hover:scale-110 shadow-2xl`}>
                  {step.icon}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6">{step.title}</h3>
                <p className="text-xl text-slate-500 leading-relaxed font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-indigo-600 py-16 relative overflow-hidden">
        {/* Subtle Decorative Circle */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px] opacity-20" />
        
        <div className="w-full px-10 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 relative z-10">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black text-white tracking-tighter">FaceTrace</h3>
            <p className="text-lg text-indigo-100 max-w-lg leading-relaxed font-bold">
              Leading ethical AI rescue operations to reconnect families and ensure no one is left behind.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.3em]">Platform</h4>
            <ul className="space-y-3 text-lg text-indigo-200 font-bold">
              <li className="hover:text-white transition-colors cursor-pointer text-base"><Link to="/Formmissing">Report Case</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer text-base"><Link to="/Missingpeople">Missing List</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer text-base">Success Stories</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.3em]">Connect</h4>
            <ul className="space-y-3 text-lg text-indigo-200 font-bold">
              <li className="hover:text-white transition-colors cursor-pointer text-base">Twitter</li>
              <li className="hover:text-white transition-colors cursor-pointer text-base">LinkedIn</li>
              <li className="hover:text-white transition-colors cursor-pointer text-base">Support</li>
            </ul>
          </div>
        </div>
        <div className="w-full px-10 lg:px-24 mt-16 pt-8 border-t border-indigo-500/30 text-indigo-200 text-xs font-black text-center uppercase tracking-[0.5em] relative z-10">
          © 2026 FaceTrace AI. Dedicated to human safety.
        </div>
      </footer>

    </div>
  );
};

export default Hero;
