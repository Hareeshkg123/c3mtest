/**
 * Schema for address
 */
import { Schema } from "mongoose";

const mongoose = require('mongoose');

const addressSchema: Schema = new Schema({   
    addressId: {
        type: String 
    },
    street: {
        type: String
    },
    postalCode: { 
        type: String
    },
    city: {
         type: String 
    },
    country: { 
        type: String 
    },
    house: { 
         type: String 
    },
});
const Address = mongoose.model( "Address" ,addressSchema);

export default Address;