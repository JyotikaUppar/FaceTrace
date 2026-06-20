// const mongoose=require('mongoose');
// const mongoURI="mongodb+srv://Garvit_Batra:!Ramprakash123@cluster0.eklye.mongodb.net/Face_Recognition?retryWrites=true&w=majority"

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongo successfully");
//     })
// }
// module.exports=connectToMongo;


const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://vbhandary129_db_user:NhgPxXj85Z2h4LYN@cluster0.ubzsqwd.mongodb.net/?appName=Cluster0";

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

