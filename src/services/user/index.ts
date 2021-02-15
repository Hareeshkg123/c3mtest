/**
 * Service class and methods for user APIs
 */

import {Document} from 'mongoose';
import User from '../../model/user';
import Address from '../../model/address';
import Book  from '../../model/book';

import {data,addressType,userType} from '../../Interface';



class UserService {

    /**
     * @returns {Promise<string[]>}
     */
    public static async get(email: String){

        //NOTE: Add validators and types as required.
        //      Refer playbooks API service for examples
    try{
        const user:userType= await User.findOne({ email:email }) ;

        const books= Book.find({ bookId: { $in: user.rentedBooks } })
        .select('isbn title subtitle author -_id') ;
        
        const addresses:addressType=Address.findOne({addressId:user.address}) ;

 
        const userData = await Promise.all([books, addresses]) ;

        const rentedbook =userData[0] ;
        const address=userData[1] ; 

        
        if(address==null){

            return{

                name: user.firstname + user.lastname,
                phone: user.phone,
                email: user.email,
                rentedBooks: rentedbook
            };
            
        }

      
        let userDetails :data= { 
            name: user.firstname + user.lastname,
            phone: user.phone,
            email: user.email,
            address: `${address.house},${address.street}, ${address.city} - ${address.postalCode}`,
            country: address.country,
            rentedBooks: rentedbook
            }
    
        console.log(userDetails) ;
        return userDetails ;
        }
    
    catch(err){
        console.log("user not found",err) ;
        return `user not found` ;
    }

 }

};
export { UserService };