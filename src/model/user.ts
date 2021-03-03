/**
 * Schema for user
 */
import { Schema } from "mongoose";

const mongoose = require('mongoose');

const userSchema: Schema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true
    },
    phone: { 
        type: String,
        required: true
    },
    rentedBooks: {
        type: [String]
    },
    address: {
        type: String
    }
});
const User = mongoose.model('User', userSchema);

export default User;