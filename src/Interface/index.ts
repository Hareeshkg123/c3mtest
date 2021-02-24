/**
 * types
 */

export interface data{  
    name: string,
    phone: string,
    email: string,
    rentedBooks?: Array<bookType>,
    address?: string,
    country?: string 
}

export interface userType{
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    rentedBooks: Array<bookType>,
    address: string
}

export interface bookType{
    isbn: string,
    author: string,
    title: string,
    subtitle: string 
}

export interface addressType{    
    street: string,
    postalCode: string,
    city: string,
    country: string,
    house: string
}
