const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/facetrace_person";

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB successfully (Person Service)");
    }).catch((err) => {
        console.error("MongoDB Connection Error (Person Service):", err);
    });
};

module.exports = connectToMongo;
