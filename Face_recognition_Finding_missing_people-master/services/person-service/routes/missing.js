const express = require("express");
const router = express.Router();
const person = require("../models/person");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const orifilename = file.originalname;
        var idx = orifilename.lastIndexOf('.');
        var str = idx !== -1 ? orifilename.substring(idx) : '';
        cb(null, req.body.name + "_" + req.body.adhaar_number + str);
    }
});

var upload = multer({ storage: storage }).single('image');

// ROUTE 1: Add missing person
router.post("/addperson", upload, async (req, res) => {
    try {
        const { name, email, Gender, identification, nationality, height, datemissing, address, adhaar_number, phonenumber } = req.body;

        let imageObj = {};
        if (req.file) {
            imageObj = {
                data: fs.readFileSync(path.join(uploadDir, req.file.filename)),
                contentType: req.file.mimetype || "image/png"
            };
        }

        let newperson = new person({
            name, email, Gender, identification, nationality, height,
            Date_missing: datemissing, address, adhaar_number, phonenumber,
            image: imageObj
        });

        const savedperson = await newperson.save();
        res.status(201).json(savedperson);
    } catch (error) {
        console.error("Error in addperson:", error.message);
        res.status(500).send('An error occurred while saving missing person details');
    }
});

// ROUTE 2: Get all missing persons
router.get("/getallpersons", async (req, res) => {
    try {
        let missingpersons = await person.find();
        if (!missingpersons) {
            return res.status(404).send("Not Found");
        }
        res.status(200).send(missingpersons);
    } catch (error) {
        console.error("Error in getallpersons:", error.message);
        res.status(500).send('An error occurred while fetching missing persons');
    }
});

// ROUTE 3: Delete missing person by adhaar_number
router.delete("/deleteperson/:id", async (req, res) => {
    try {
        let requiredperson = await person.find({ adhaar_number: req.params.id });
        if (!requiredperson || requiredperson.length === 0) {
            return res.status(404).send("Not Found");
        }

        await person.deleteOne({ adhaar_number: req.params.id });
        res.json({ "success": "Person has been deleted successfully" });
    } catch (error) {
        console.error("Error in deleteperson:", error.message);
        res.status(500).send('An error occurred while deleting person');
    }
});

// ROUTE 4: Get missing person by adhaar_number
router.get("/getallpersons/:id", async (req, res) => {
    try {
        let missingpersons = await person.find({ adhaar_number: req.params.id });
        if (!missingpersons) {
            return res.status(404).send("Not Found");
        }
        res.status(200).send(missingpersons);
    } catch (error) {
        console.error("Error in getallpersons/:id:", error.message);
        res.status(500).send('An error occurred while fetching person');
    }
});

module.exports = router;
