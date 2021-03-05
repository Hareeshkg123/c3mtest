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
    public static async getUserDetails(email: string): Promise<Data> {
        const user: UserType = await UsersModel.findOne(
            {
                email: email
            }
        ).lean();
        if (!user) {
            throw new Error('User not found');
        }
        const userBooks: Promise<BookType[]> = UserService.getBookData(user.rentedBooks);
        const userAddress: Promise<AddressType> = UserService.getAddressData(user.address);
        const result: [BookType[], AddressType] = await Promise.all([userBooks, userAddress]);
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
        if (rentedBooks.length>0) {
            userDetails.rentedBooks = rentedBooks;
        }
        return userDetails;
    }
  /**
   * Method to get the Book data
   * @param  { string[] } rentedBooks
   * @returns { Promise< BookType[] > }
   */
    public static async getBookData(rentedBooks: string[]): Promise<BookType[]> {
        const bookData: BookType[] = await BooksModel.find(
            {
                bookId: {
                    $in: rentedBooks
                }
            },
            {
                isbn: 1,
                title: 1,
                subtitle: 1,
                author: 1,
                _id: 0
            }
        ).lean();
        return bookData;
    }
  /**
   * Method to get the Book data
   * @param  { string } address
   * @returns { Promise< AddressType > }
   */
    public static async getAddressData(address: string): Promise<AddressType> {
        const addressData: AddressType = await AddressModel.findOne(
            { 
                addressId: address
            }
        ).lean();
        return addressData;
    }
}

export { UserService };