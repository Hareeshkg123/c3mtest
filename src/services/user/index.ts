/**
 * Service class and methods for user APIs
 */
import AddressModel from './../../model/address';
import BooksModel from './../../model/book';
import UsersModel from './../../model/user';

import { AddressType, BookType, Data, UserType } from './../../Interface';

class UserService {
  /**
   * Method to get the user details
   * @param  { string } email
   * @returns { Promise< Data > }
   */
    public static async getUserDetails( email: String ): Promise<Data> {
        const user: UserType = await UsersModel.findOne(
            {
                email: email
            }
        );
        if (!user) {
            throw new Error('User not found');
        }
        const books = BooksModel.find(
            {
                bookId: {
                    $in: user.rentedBooks
                }
            },
            {
                isbn: 1,
                title: 1,
                subtitle: 1,
                author: 1,
                _id: 0
            }
        );     
        const addressData = AddressModel.findOne(
            { 
                addressId: user.address
            }
        );
        const result = await Promise.all([books,addressData]);
        const rentedBooks: BookType[] = result[0];
        const address: AddressType = result[1];
        const userDetails: Data = {
            name: `${ user.firstname } ${ user.lastname }`,
            phone: user.phone,
            email: user.email
        }
        if (address) {
            userDetails.address = `${ address.house },${ address.street }, ${ address.city } - ${ address.postalCode }`;
            userDetails.country = address.country;
        }
        if (rentedBooks.length) {
            userDetails.rentedBooks = rentedBooks;
        }
        return userDetails;
    }
}

export { UserService };