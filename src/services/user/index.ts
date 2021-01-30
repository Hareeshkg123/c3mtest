/**
 * Service class and methods for user APIs
 */


import User from '../../model/user';
import Address from '../../model/address';
import Book  from '../../model/book';



class UserService {

    /**
     * Method to get list of dummies
     * @returns {Promise<string[]>}
     */
    public static async get(email: String){

        //NOTE: Add validators and types as required.
        //      Refer playbooks API service for examples
       
        
    
        const user = User.find({ email: email }).then();
        const books = Book.find().then();
        const addresses = Address.find().then();


        const userData:any = await Promise.all([user, books, addresses]);

        if(userData){

            
               let user :any= { 
                name: userData[0][0].firstname + userData[0][0].lastname,
                phone: userData[0][0].phone,
                email: userData[0][0].email,
                rentedBooks:[],
                address:''
               }


               for(let i=0;i<userData[1].length;i++){

                   if (userData[0][0].rentedBooks.includes(userData[1][i].bookId)) {
                    user.rentedBooks.push({
                        isbn:userData[1][i].isbn,
                        author:userData[1][i].author,
                        title:userData[1][i].title,
                        subtitle:userData[1][i].subtitle
                    })
                }
               }
         

               for(let i=0;i<userData[2].length;i++){
                if (userData[2][i].addressId === userData[0][0].address) {
                    user.address = userData[2][i].street + userData[2][i].city + userData[2][i].postalCode;
               }
            }
            
            return user;
        }


}
        

        
  
    
      
    
    
};



export { UserService };