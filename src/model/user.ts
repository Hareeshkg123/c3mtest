/**
 * Schema for user
 */
import { Schema, model } from "mongoose";

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

export default model('User', userSchema);