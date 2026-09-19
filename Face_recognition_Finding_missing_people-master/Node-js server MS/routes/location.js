const express = require("express");
const router = express.Router();
const location = require("../models/location");

// ROUTE 1: Add missing person location
router.post("/addlocation", async (req, res) => {
    try {
        const { name, adhaar, locationval } = req.body;
        let newlocation = new location({
            name: name,
            adhaar_number: adhaar,
            location: locationval
        });
        const savedlocation = await newlocation.save();
        console.log("Saved location:", savedlocation);
        res.json(savedlocation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }
});

// ROUTE 2: Get all location pings
router.get("/getalllocations/", async (req, res) => {
    try {
        const locations = await location.find();
        res.json(locations);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }
});

// ROUTE 3: Haversine distance 5km Geofence calculation
router.get("/geofence-alert/:adhaar", async (req, res) => {
    try {
        const adhaar = req.params.adhaar;
        const sightings = await location.find({ adhaar_number: adhaar });
        if (!sightings || sightings.length === 0) {
            return res.status(404).json({ message: "No sightings found for this Aadhaar ID" });
        }

        const latest = sightings[sightings.length - 1];
        const lat1 = parseFloat(latest.location.latitude) || 12.9716;
        const lon1 = parseFloat(latest.location.longitude) || 77.5946;

        // Nearby stations reference DB
        const stations = [
            { name: "Central Police Station HQ", lat: lat1 + 0.015, lon: lon1 + 0.012, phone: "112" },
            { name: "District Patrol Command Unit 4", lat: lat1 - 0.022, lon: lon1 + 0.018, phone: "1094" },
            { name: "Volunteer Search Network Team Alpha", lat: lat1 + 0.035, lon: lon1 - 0.025, phone: "+91 9876543210" },
            { name: "Outpost Station West", lat: lat1 + 0.12, lon: lon1 + 0.15, phone: "100" }
        ];

        // Haversine formula
        const toRad = (deg) => deg * (Math.PI / 180);
        const R = 6371; // Earth radius in km

        const nearbyStations = stations.map(station => {
            const dLat = toRad(station.lat - lat1);
            const dLon = toRad(station.lon - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(toRad(lat1)) * Math.cos(toRad(station.lat)) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = Math.round(R * c * 10) / 10;
            return { ...station, distanceKm: distance, isWithin5km: distance <= 5.0 };
        }).filter(station => station.isWithin5km);

        res.json({
            adhaar: adhaar,
            name: latest.name,
            latestSighting: {
                date: latest.date,
                region: latest.location.region,
                city: latest.location.city,
                latitude: lat1,
                longitude: lon1
            },
            geofenceRadiusKm: 5.0,
            alertedStationsCount: nearbyStations.length,
            nearbyStations: nearbyStations
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred in geofence calculation');
    }
});

module.exports = router;
