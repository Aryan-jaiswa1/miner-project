const mongoose = require('mongoose')

const { Schema } =mongoose;

const UserSchema = new Schema ({
    email :{
        type:String,
        required: true
    } ,
    Address :{
        type:String,
        required: true
    } ,
    Banquet :{
        type:String,
        required: true
    },
    City :{
        type:String,
        required: true
    },
    Details :{
        type:String,
        required: true
    },
    Price :{
        type:String,
        required: true
    },
    State :{
        type:String,
        required: true
    } ,
    imagePreviewUrl :{
        type:String,
        required: true
    },
})
module.exports = mongoose.model('user',UserSchema)
