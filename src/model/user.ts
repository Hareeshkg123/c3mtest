import { model } from "mongoose";

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type:String},
    lastname: {type:String },
    email: { type:String},
    phone: { type:String},
    rentedBooks: {type:Array},
    address: {type:String }
});


export default model('User',userSchema);