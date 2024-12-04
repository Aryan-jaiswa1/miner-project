const express = require('express');
const app = express();
const mongoDB = require("./db");
const path = require("path");
require('dotenv').config();
mongoDB();

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/api/', require("./routes/createuser"));
app.use('/api/', require("./routes/display"));

// Serve static files from the 'build' folder
app.use(express.static(path.resolve(__dirname, "test", "build")));

// Route to handle the root URL and serve the index.html
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "test", "build", "index.html"));
});

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});