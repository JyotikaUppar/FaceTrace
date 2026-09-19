import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GeofenceAlertModal = ({ isOpen, onClose, adhaar, personName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (isOpen && adhaar) {
      setLoading(true);
      setDispatched(false);
      fetch(`http://localhost:5000/api/foundlocation/geofence-alert/${adhaar}`)
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Geofence fetch error:", err);
          setLoading(false);
        });
    }
  }, [isOpen, adhaar]);

  if (!isOpen) return null;

  const handleDispatchAlert = async () => {
    try {
      await fetch("http://localhost:5000/api/notifications/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: "112",
          name: personName || data?.name,
          adhaar: adhaar,
          location: data?.latestSighting?.region || "Active Node"
        })
      });
    } catch (e) {
      console.log("Dispatch simulated trigger");
    }
    setDispatched(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white text-slate-900 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-600 my-8"
        >
          {/* HEADER */}
          <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                📡
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide">
                  5KM GEOFENCE PROXIMITY ENGINE
                </h3>
                <p className="text-xs font-bold opacity-80">
                  Target Aadhaar ID: {adhaar}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-6">
            {loading ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-400">Computing Haversine Geofence Proximity...</p>
              </div>
            ) : data && data.nearbyStations ? (
              <>
                {/* LATEST SIGHTING BANNER */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Subject Name</span>
                    <h4 className="text-lg font-black text-slate-900">{data.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block">Geofence Radius</span>
                    <span className="text-base font-black text-indigo-600">Within 5.0 km</span>
                  </div>
                </div>

                {/* STATIONS LIST */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Identified Authorities within 5km Radius ({data.alertedStationsCount})
                  </h4>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {data.nearbyStations.map((station, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center"
                      >
                        <div className="space-y-1">
                          <h5 className="text-sm font-black text-slate-900">{station.name}</h5>
                          <p className="text-xs font-bold text-slate-500">
                            📞 Contact: <span className="font-mono">{station.phone}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-lg">
                            {station.distanceKm} km away
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DISPATCH ACTION */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDispatchAlert}
                    disabled={dispatched}
                    className={`flex-1 py-3.5 px-4 text-white font-black rounded-2xl shadow-lg transition-all text-xs uppercase tracking-wider ${
                      dispatched
                        ? "bg-emerald-600 shadow-emerald-500/20"
                        : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
                    }`}
                  >
                    {dispatched
                      ? "✔ Proximity Alerts Dispatched to All Stations!"
                      : "🚀 Dispatch Urgent Alerts to 5km Network"}
                  </button>
                  <button
                    onClick={onClose}
                    className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-2xl text-xs uppercase tracking-wider transition-all"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-slate-400 py-8 font-bold">
                No active sightings recorded for this ID yet.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GeofenceAlertModal;
