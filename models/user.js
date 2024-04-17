const { date } = require("joi");
const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {  
        //user name
        name: { type: String, required: true, max:255},
        //email address
        email: {type: String, required: true},
        //password
        password: {type: String, required: true, min: 8, max: 255},
        //account creation date
        date: {type: Date, default: Date.now},   
        //role
        role: {type: String, default: "user"}       
    }
);

module.exports = mongoose.model("user", userSchema);