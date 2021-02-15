/**
 * Schema for user
 */
import { Schema } from "mongoose";

const mongoose = require('mongoose');

const userSchema:Schema = new Schema({

    firstname: {
        type: String
    },
    lastname: {
        type: String 
    },
    email: { 
        type: String
    },
    phone: { 
        type: String
    },
    rentedBooks: {
        type: [String]
    },
    address: {
        type: String
    }
});

const User=mongoose.model("User",userSchema);

export default User;