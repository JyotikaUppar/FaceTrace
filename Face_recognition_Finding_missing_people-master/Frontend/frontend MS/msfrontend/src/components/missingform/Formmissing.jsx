import React, { useState } from 'react'
import axios from "axios"
import formimage from "../../images/form.gif"
import { motion } from "framer-motion"

const inputClass =
  "w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 outline-none shadow-sm hover:shadow-md"

const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1"

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
      window.alert("Registration successfull");
    } else {
      window.alert("invalid registration");
    }
  }

  return (
    <div className="min-h-screen py-20 px-6 lg:px-20 grid lg:grid-cols-2 gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-white rounded-[2.5rem] p-10 lg:p-16 hero-image-shadow border border-slate-50"
      >
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900 font-display">Registration</h2>
          <p className="text-slate-500 font-medium mt-2">Get started by providing the missing person's profile.</p>
        </div>

        <form onSubmit={postdata} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Full Name</label>
              <input className={inputClass} type="text" placeholder="Full Name" name="name" value={user.name} onChange={handleinput} required />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input className={inputClass} type="text" placeholder="Email" name="email" value={user.email} onChange={handleinput} required />
            </div>
            <div>
              <label className={labelClass}>Date missing</label>
              <input className={inputClass} type="date" name="datemissing" value={user.datemissing} onChange={handleinput} required />
            </div>
            <div>
              <label className={labelClass}>adhaar number</label>
              <input className={inputClass} type="text" placeholder="Adhaar number" name="adhaar_number" value={user.adhaar_number} onChange={handleinput} required />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>address</label>
              <input className={inputClass} type="text" placeholder="Address" name="address" value={user.address} onChange={handleinput} required />
            </div>
            <div>
              <label className={labelClass}>identification</label>
              <input className={inputClass} type="text" placeholder="Identification mark" name="identification" value={user.identification} onChange={handleinput} required />
            </div>
            <div>
              <label className={labelClass}>height</label>
              <input className={inputClass} type="number" placeholder="Height in ft" name="height" value={user.height} onChange={handleinput} required />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input className={inputClass} type="text" placeholder="Contact number" name="phonenumber" value={user.phonenumber} onChange={handleinput} required />
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Gender</label>
            <div className="flex">
              {['male', 'female', 'others'].map((g) => (
                <label key={g} className="flex-1 mr-4 last:mr-0">
                  <input 
                    type="radio" 
                    name="Gender" 
                    value={g} 
                    checked={user.Gender === g} 
                    onChange={handleinput} 
                    className="hidden" 
                  />
                  <div 
                    className={`w-full py-3 text-center rounded-xl border-2 font-bold cursor-pointer transition-all ${
                      user.Gender === g 
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600" 
                        : "border-slate-100 text-slate-500 hover:border-indigo-300"
                    }`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
             <label className={labelClass}>upload person image</label>
             <input className="w-full py-3 px-4 bg-slate-50 rounded-xl" type="file" name="image" onChange={handleinput} required />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-colors mt-8"
          >
            Register Case
          </motion.button>
        </form>
      </motion.div>

      <div className="flex flex-col items-center gap-10">
        <div className="text-center font-bold text-slate-800 text-2xl max-w-sm">
          Emotional rescue through AI technology.
        </div>
        <img src={formimage} alt="" className="w-[400px] rounded-[2.5rem] hero-image-shadow" />
      </div>
    </div>
  )
}

export default Formmissing