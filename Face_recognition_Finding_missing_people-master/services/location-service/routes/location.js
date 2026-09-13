const express = require("express");
const router = express.Router();
const location = require("../models/location");

// ROUTE 1: Add missing person location sighting
router.post("/addlocation", async (req, res) => {
    try {
        const { name, adhaar, locationval } = req.body;
        let newlocation = new location({
            name: name,
            adhaar_number: adhaar,
            location: locationval
        });
        const savedlocation = await newlocation.save();
        console.log("Saved Location Sighting:", savedlocation._id);
        res.status(201).json(savedlocation);
    } catch (error) {
        console.error("Error in addlocation:", error.message);
        res.status(500).send('An error occurred while saving location data');
    }
});

// ROUTE 2: Get all location sightings
router.get("/getalllocations", async (req, res) => {
    try {
        const locations = await location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error in getalllocations:", error.message);
        res.status(500).send('An error occurred while fetching locations');
    }
});

module.exports = router;
