/**
 * Schema for books
 */
import { required } from "@hapi/joi";
import { Schema, model } from "mongoose";

const  bookSchema: Schema = new Schema({    
    bookId: {
        type: String,
        required:true
    },
    isbn: {
        type: String
    },
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    author: {
        type: String
    },
    published: {
        type: String
    },
    publisher: {
        type: String
    },
    pages: {
        type: Number
    },
    description: {
        type: String
    },
    website: {
        type: String
    }
});

export default model('Book', bookSchema);
