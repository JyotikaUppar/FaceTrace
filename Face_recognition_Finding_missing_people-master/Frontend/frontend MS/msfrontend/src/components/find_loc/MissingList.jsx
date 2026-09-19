import React, { useEffect, useState } from 'react';
import Missingcard from './Missingcard';
import MovementMap from './MovementMap';
import GeofenceAlertModal from './GeofenceAlertModal';
import { motion } from "framer-motion";

const MissingList = () => {
  const [location, setLocation] = useState([]);
  const [text, setText] = useState('');
  const [current, setcurrent] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedAdhaar, setSelectedAdhaar] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [isGeofenceOpen, setIsGeofenceOpen] = useState(false);

  const handleinput = (e) => {
    if (e.target.value === "") {
      setText("");
    }
    setcurrent(e.target.value);
  };

  const handleclick = () => {
    setText(current);
  };

  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foundlocation/getalllocations");
      let data = await response.json();
      setLocation(data);
    } catch (err) {
      console.error("Location fetch error", err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const filteredLocations = location.filter(
    (item) => text === "" || item.adhaar_number === text
  );

  const handleOpenGeofence = (adhaar, name) => {
    setSelectedAdhaar(adhaar);
    setSelectedName(name);
    setIsGeofenceOpen(true);
  };

  return (
    <div className="pt-12 pb-32 lg:pt-16 lg:pb-56 px-8 lg:px-24 min-h-screen bg-white selection:bg-indigo-100 overflow-x-hidden">
      
      {/* HEADER */}
      <div className="w-full mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 text-left">
        <div className="space-y-6 flex-1">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            GIS & Real-time Network
          </motion.span>
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-[90px] font-black text-slate-900 leading-[0.9] tracking-tighter"
            >
              Detected <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-[16px]">Locations</span>
            </motion.h2>
            <p className="text-slate-400 font-bold max-w-2xl text-xl leading-relaxed">
              Monitor real-time CCTV detection pings, trajectory maps, and 5km geofence alerts.
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:max-w-xl">
          {/* SEARCH BAR */}
          <div className="relative group w-full flex-1">
            <input
              type="search"
              placeholder='Search by Aadhaar ID...'
              onChange={handleinput}
              value={current}
              className="w-full pl-12 pr-28 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all text-base font-bold text-slate-900 placeholder:text-slate-300"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button 
              onClick={handleclick}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              SEARCH
            </button>
          </div>

          {/* TOGGLE TRAJECTORY MAP */}
          <button
            onClick={() => setIsMapVisible(!isMapVisible)}
            className={`px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
              isMapVisible
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            🗺️ {isMapVisible ? "Hide Map" : "Show Trajectory Map"}
          </button>
        </div>
      </div>

      {/* INTERACTIVE TRAJECTORY MOVEMENT MAP */}
      {isMapVisible && (
        <MovementMap sightings={filteredLocations} />
      )}

      {/* GRID */}
      <div className="w-full mt-8">
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((element, idx) => (
              <Missingcard
                key={`${element.adhaar_number}_${element.date}_${idx}`}
                name={element.name}
                adhaar={element.adhaar_number}
                date={element.date}
                region={element.location?.region || "Node Alpha"}
                latitude={element.location?.latitude || "12.9716"}
                longitude={element.location?.longitude || "77.5946"}
                country={element.location?.country || "India"}
                state={element.location?.city || "Bangalore"}
                onOpenGeofence={handleOpenGeofence}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-36 bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-100"
          >
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <p className="text-2xl font-black text-slate-400">Waiting for detection pings...</p>
            <p className="text-sm font-bold text-slate-300 mt-2">Our AI is actively searching the nation-wide network.</p>
          </motion.div>
        )}
      </div>

      {/* GEOFENCE ALERT MODAL */}
      <GeofenceAlertModal
        isOpen={isGeofenceOpen}
        onClose={() => setIsGeofenceOpen(false)}
        adhaar={selectedAdhaar}
        personName={selectedName}
      />
    </div>
  );
};

export default MissingList;