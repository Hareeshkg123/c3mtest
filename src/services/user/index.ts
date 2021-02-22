/**
 * Service class and methods for user APIs
 */

import User from '../../model/user';
import Address from '../../model/address';
import Book  from '../../model/book';

import {data,addressType,userType, bookType} from '../../Interface';



class UserService {

    /**
     * @returns {Promise<string[]>}
     */
    public static async get( email: String ):Promise<data>{

        //NOTE: Add validators and types as required.
        //      Refer playbooks API service for examples
    try{
        const user:userType = await User.findOne({ email:email });
        
        if(!user){
            throw 'user not found'
        }

        const books:Promise<bookType[]>= Book.find({ bookId: { $in: user.rentedBooks } })
        .select('isbn title subtitle author -_id');
        
        const addresses:Promise<addressType>= Address.findOne({addressId:user.address});

        const userData:Array<any>= await Promise.all([books, addresses]);

        const rentedBooks:bookType[]= userData[0];
        const address:addressType= userData[1];
        
        const userDetails:data= {
            name: user.firstname + user.lastname,
            phone: user.phone,
            email: user.email,
            rentedBooks: rentedBooks
        }
        
        if(!address){
            return userDetails    
        }
        userDetails.address= `${address.house},${address.street}, ${address.city} - ${address.postalCode}`,
        userDetails.country= address.country

        console.log(userDetails)
        return userDetails;
        
    }
    
    catch(err){
        console.error(err);
        return err;
    }

    }

}
export { UserService };