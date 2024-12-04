const express = require('express');
const router = express.Router();
const mongoDB = require("../db");

router.get('/userdata', async (req,res)=>{
    try{
        await mongoDB();
        res.send([global.userdata])
        console.log()
    }catch{
        console.log(error)
    }
})

module.exports = router;