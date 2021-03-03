/**
 * types
 */

export interface Data{  
    name: string,
    phone: string,
    email: string,
    rentedBooks?: Array<BookType>,
    address?: string,
    country?: string 
}

export interface UserType{
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    rentedBooks: Array<BookType>,
    address: string
}

export interface BookType{
    isbn: string,
    author: string,
    title: string,
    subtitle: string 
}

export interface AddressType{    
    street: string,
    postalCode: string,
    city: string,
    country: string,
    house: string
}
