const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



function doesExist(username) {
    return users.some(user => {
        return user.username === username; 
    });
}
public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author=req.params.author;
   /* Object.values(books).forEach( book => {
        if (book.author==author)
        {
            res.send(book) 
        }
    })*/
    /*Object.key(books).forEach(isbn =>
        { 
            const book=books[isbn];
            if(book.author==author)       
            {
                res.send(book) 
            }
            
        })*/
   const filteredbooks = Object.values(books).filter(book =>
    {                 
        /*if(book.author==author)       
        {
                    return true;
        }
         return false;*/
         return book.author==author;
     })
     res.send(filteredbooks)
     
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
const title=req.params.title;
const filteredbooks = Object.values(books).filter(book =>
{                 
            /*if(book.author==author)       
            {
                        return true;
            }
             return false;*/
             return book.title==title;
         })
         res.send(filteredbooks)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn=req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
module.exports.doesExist = doesExist;
