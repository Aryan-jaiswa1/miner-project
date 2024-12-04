const mongoose = require('mongoose')

const { Schema } =mongoose;

const User_signupSchema = new Schema ({
    name :{
        type:String,
        required: true
    } ,
    email :{
        type:String,
        required: true
    } ,
    password :{
        type:String,
        required: true
    },
    admin :{
        type:Boolean,
        required: true
    }
    
    
})
module.exports = mongoose.model('user_signup',User_signupSchema)
