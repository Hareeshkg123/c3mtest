/**
 * Service class and methods for user APIs
 */

const mongoose = require('mongoose');
var User = mongoose.model("User",{});


class UserService {

    /**
     * Method to get list of dummies
     * @returns {Promise<string[]>}
     */
    public static async get(email: String): Promise<string[]> {

        //NOTE: Add validators and types as required.
        //      Refer playbooks API service for examples
        const users = await User.aggregate([
           
            { $match: { email: email } },
            
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "addressId",
                    as: "address"
                }
            },

            {
                
                $unwind: { 
                    path: "$address",
                    preserveNullAndEmptyArrays: true
                 }

            },

            {
                $lookup: {
                    from: "books",
                    localField: "rentedBooks",
                    foreignField: "bookId",
                    as: "rentedBooks"
                }
            },

            {
                $project: {

                    "_id": 0,
                    "name": { $concat: ["$firstname", " ", "$lastname"] },
                    "email": 1,
                    "phone": 1,
                    "country": "$address.country",
                    "address": { $concat: ["$address.house", " , ", "$address.street", ",", "$address.city", "- ", "$address.postalCode"] },
                    "rentedBooks.isbn": 1,
                    "rentedBooks.title": 1,
                    "rentedBooks.subtitle": 1,
                    "rentedBooks.author": 1
                       
                }
            }
        ]);

        console.log('users fetched', users);

        return users;
    }
}

export { UserService };