// const mongoose=require('mongoose');
// const mongoURI="mongodb+srv://Garvit_Batra:!Ramprakash123@cluster0.eklye.mongodb.net/Face_Recognition?retryWrites=true&w=majority"

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongo successfully");
//     })
// }
// module.exports=connectToMongo;


const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Face_Recognition";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
module.exports = connectToMongo;

