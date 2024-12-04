const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../user'); 
const user_signup = require('../user_signup');
const nodemailer = require("nodemailer");
const dotenv = require("../.env");
// dotenv.config();

const jwtSecret = "WED+!@#$%^&*()_+BnaquetWebsite+_)(*&^%$#@!CreatedBYAryan";

// Route to create or update a user
router.post("/createOrUpdateUser", async (req, res) => {
    const { email, Address, Banquet, City, Details, Price, State, imagePreviewUrl } = req.body;

    try {
        let existingUser = await user.findOne({ email });
        if (existingUser) {
            existingUser.Address = Address;
            existingUser.Banquet = Banquet;
            existingUser.City = City;
            existingUser.Details = Details;
            existingUser.Price = Price;
            existingUser.State = State;
            existingUser.imagePreviewUrl = imagePreviewUrl;

            await existingUser.save();
            return res.json({ success: true, message: "User data updated", user: existingUser });
        } else {
            const newUser = await user.create({
                email,
                Address,
                Banquet,
                City,
                Details,
                Price,
                State,
                imagePreviewUrl,
            });

            return res.json({ success: true, message: "New user created", user: newUser });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to process request", error: error.message });
    }
});

// ********************************************Route to create a user_signup*************************************************************
router.post("/createuser_signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password, salt);
        const newUser_signup = await user_signup.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
            admin:req.body.admin
        });

        res.json({ success: true, user_signup: newUser_signup });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create user signup", error: error.message });
    }
});

// ****************************************************Route for user login**************************************************************
router.post("/createuser_login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await user_signup.findOne({ email });
        if (!userData) {
            return res.status(400).json({ success: false, message: "Email does not exist" });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Password does not match" });
        }

        const payload = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);
        return res.json({ 
            success: true, 
            authToken, 
            admin: userData.admin 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
});


// ************************************************Configure nodemailer transporter***********************************************************
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    logger: true,
    debug: true,
    secureConnection:false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    tls:{
        rejectUnauthorized: true
    }
});

// *****************************************************oute to send email*********************************************************************
router.post("/email", async (req, res) => {
    const { email, subject, message } = req.body;


    try {
        const mailoption = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            text: message
        };
        const info = await transporter.sendMail(mailoption);
        console.log('Email sent: %s', info.messageId);
        res.json({ success: true, mailoption });
    } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).json({ success: false, error_createuser: error.message });
    }
});


module.exports = router;