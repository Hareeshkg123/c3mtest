/**
 * Schema for address
 */
import { Schema, model } from "mongoose";

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

export default model('Address', addressSchema);