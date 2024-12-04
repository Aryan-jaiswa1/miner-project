const mongoose = require('mongoose');

// MongoDB URI
const URI = "mongodb+srv://Banquet:Kakashi2004@cluster0.jsvzq.mongodb.net/Banquet?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection function
const mongoDB = async () => {
    try {
        await mongoose.connect(URI); 
        console.log("MongoDB connected successfully");
        const fetchData = await mongoose.connection.db.collection("users");
        console.log("Fetching data from 'users' collection...");
        global.userdata = await fetchData.find({}).toArray();
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = mongoDB;