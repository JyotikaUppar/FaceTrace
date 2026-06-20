import React, { useState } from 'react'
import axios from "axios"
import formimage from "../../images/form.gif" // Keeping existing gif for personality
import { motion } from "framer-motion"

const inputClass =
  "w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[24px] text-slate-900 text-lg font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"

const labelClass = "block text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-4 ml-2"

const Formmissing = () => {
  const [user, setUser] = useState({ name: '', email: '', datemissing: '', identification: '', adhaar_number: '', address: '', height: 0, Gender: '', phonenumber: '' })
  const [image, setImage] = useState('')

  const handleinput = (e) => {
    let nameval = e.target.name
    let value = e.target.value
    if (nameval !== 'image') {
      setUser({ ...user, [nameval]: value })
    } else {
      setImage(e.target.files[0])
    }
  }

  const postdata = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(user)) {
      formData.append(key, value);
    }
    formData.append('image', image)
    const res = await axios.post('http://localhost:5000/api/missingpeople/addperson', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.status === 200) {
      window.alert("Registration successful");
    } else {
      window.alert("invalid registration");
    }
  }

  return (
    <div className="pt-12 pb-32 lg:pt-16 lg:pb-56 px-12 lg:px-32 min-h-screen bg-white selection:bg-indigo-100 overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="w-full mb-24 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-black uppercase tracking-[0.3em]">
            <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse" />
            Registry Intake
          </div>
          
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black text-slate-900 leading-[0.9] tracking-tighter">
              Report <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-[16px]">Case</span>
            </h2>
            <p className="text-slate-400 font-bold max-w-4xl text-2xl leading-relaxed">
              Initiate the nationwide AI search protocol. Provide accurate details to maximize the efficiency of our triangulation network.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full grid lg:grid-cols-12 gap-20 items-start">
        
        {/* LEFT: FORM BOX */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-white rounded-[60px] p-10 lg:p-20 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-50"
        >
          <form onSubmit={postdata} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
              <div>
                <label className={labelClass}>Full Identity Name</label>
                <input className={inputClass} type="text" placeholder="Johnathan Doe" name="name" value={user.name} onChange={handleinput} required />
              </div>
              <div>
                <label className={labelClass}>Registry Email</label>
                <input className={inputClass} type="email" placeholder="contact@registry.gov" name="email" value={user.email} onChange={handleinput} required />
              </div>
              <div>
                <label className={labelClass}>Date of disappearance</label>
                <input className={inputClass} type="date" name="datemissing" value={user.datemissing} onChange={handleinput} required />
              </div>
              <div>
                <label className={labelClass}>Aadhaar Number (12 Digit)</label>
                <input className={inputClass} type="text" placeholder="XXXX XXXX XXXX" name="adhaar_number" value={user.adhaar_number} onChange={handleinput} required />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Last Known Physical Address</label>
                <input className={inputClass} type="text" placeholder="Sector 24, Near City Mall, Landmark..." name="address" value={user.address} onChange={handleinput} required />
              </div>
              <div>
                <label className={labelClass}>Identification Marks</label>
                <input className={inputClass} type="text" placeholder="Scars, Tattoos, features..." name="identification" value={user.identification} onChange={handleinput} required />
              </div>
              <div>
                <label className={labelClass}>Estimated Height (ft)</label>
                <input className={inputClass} type="number" step="0.1" name="height" value={user.height} onChange={handleinput} required />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Emergency Contact Number</label>
                <input className={inputClass} type="text" placeholder="+91 XXXX XXXX XX" name="phonenumber" value={user.phonenumber} onChange={handleinput} required />
              </div>
            </div>

            <div className="space-y-5 text-left">
              <label className={labelClass}>Gender Classification</label>
              <div className="flex gap-6">
                {['male', 'female', 'others'].map((g) => (
                  <label key={g} className="flex-1 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="Gender" 
                      value={g} 
                      checked={user.Gender === g} 
                      onChange={handleinput} 
                      className="hidden" 
                    />
                    <div 
                      className={`py-5 text-center rounded-[20px] border-2 text-sm font-black uppercase tracking-widest transition-all ${
                        user.Gender === g 
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-xl shadow-indigo-100/50" 
                          : "border-slate-50 bg-slate-50 text-slate-300 group-hover:border-slate-200"
                      }`}
                    >
                      {g}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-5 text-left">
              <label className={labelClass}>Primary Identification Photo</label>
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleinput} 
                  required 
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
                />
                <div className="w-full py-16 border-4 border-dashed border-slate-50 rounded-[40px] flex flex-col items-center justify-center gap-4 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-all">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-slate-300 group-hover:text-indigo-400 group-hover:scale-110 transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-sm font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest">
                    {image ? image.name : "Upload Identification Photo"}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-7 bg-indigo-600 text-white font-black rounded-[24px] shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:bg-indigo-700 transition-all mt-10 text-xl uppercase tracking-[0.2em]"
            >
              Start Search Protocol
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT: INFO/GIF */}
        <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-16 text-left">
          <div className="space-y-10">
            <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center shadow-[0_20px_40px_rgba(79,70,229,0.2)]">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Search Framework</h3>
              <p className="text-xl text-slate-400 leading-relaxed font-bold">
                Our AI-driven pipeline ensures every report is analyzed across thousands of nationwide surveillance points instantly.
              </p>
            </div>
            <ul className="space-y-6">
              {[
                "Nationwide surveillance integration",
                "Biometric facial recognition",
                "Automated alerting system",
                "Human-verified matches"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-lg font-black text-slate-700 uppercase tracking-tight">
                  <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-50 rounded-[60px] -rotate-3" />
            <img src={formimage} alt="Process" className="relative w-full max-w-sm mx-auto lg:mx-0 rounded-[48px] shadow-2xl border-8 border-white" />
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Formmissing