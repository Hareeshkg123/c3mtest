/**
 * Schema for books
 */
import { Schema } from "mongoose";

const mongoose = require('mongoose');

const  bookSchema:Schema = new Schema({
    
    bookId: {
        type: String
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

const Book=mongoose.model("Book",bookSchema);

export default Book;