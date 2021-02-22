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
        const user:userType = await User.findOne({ email:email });
        if(!user){
            throw new Error ('user not found')
        }
        const books = Book.find({ bookId: { $in: user.rentedBooks }},{isbn:1,title:1,subtitle:1,author:1,_id:0});        
        const addresses = Address.findOne({addressId:user.address});
        const userData = await Promise.all([books, addresses]);
        const rentedBooks: bookType[] = userData[0];
        const address:addressType= userData[1];
        const userDetails:data = {
            name: user.firstname + user.lastname,
            phone: user.phone,
            email: user.email,
        }
        if(!address){
            return {
                ...userDetails,
                rentedBooks: rentedBooks
            }
        }
        if(rentedBooks.length==0){
            return {
                ...userDetails,
                address : `${address.house},${address.street}, ${address.city} - ${address.postalCode}`,
                country : address.country            
            }
        }
        userDetails.rentedBooks = rentedBooks,
        userDetails.address = `${address.house},${address.street}, ${address.city} - ${address.postalCode}`,
        userDetails.country = address.country
        return userDetails;
    }
}
export { UserService };