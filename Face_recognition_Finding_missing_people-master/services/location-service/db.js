const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/facetrace_location";

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB successfully (Location Service)");
    }).catch((err) => {
        console.error("MongoDB Connection Error (Location Service):", err);
    });
};

module.exports = connectToMongo;
