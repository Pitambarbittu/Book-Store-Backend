## _Backend BookStore API Documentation_
 
# Use node index.js to start the Application
Node.js: Ensure you have Node.js installed, preferably version v20.16.0.
_node version v20.16.0_

## Installation
git clone with HTTPS - https://github.com/Pitambarbittu/try.git

git clone with SSH - git@github.com:Pitambarbittu/try.git

## Install dependencies
npm install

dependencies
```
 "dependencies": {
    "backend": "file:",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.3",
    "nodemon": "^3.1.4"
  }
 
```
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# BookStore all the API's Details
## Register
Endpoint: [https://bookstore-a8ci.onrender.com/api/v1/auth/register]\
Method: Post\
Request Payload:
```
{
    "email": "GIVE YOUR EMAIL ID",
    "password": "YOUR PASSWORD"
}
 
```

Response:
```
{
    "success": true,
    "msg": "User registered successfully",
    "data": {
        "email": "demo@gmail.com",
        "_id": "66ca47bed1b3acc8dfb0f145"
    }
}
```
Description: Register a new user. This endpoint creates a new user with a unique user ID. You must register before you can log in and use the other endpoints.

------------------------------------------------------------------------------------------------------------------------

## LOGIN
Endpoint: [https://bookstore-a8ci.onrender.com/api/v1/auth/login] \
Method: POST \
Request Payload:
```
{
    "email": "ENTER YOUR REGISTERED EMAIL ID",
    "password": "YOUR PASSWORD"
}
 
```

response:
```
{
    "success": true,
    "msg": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNhNDdiZWQxYjNhY2M4ZGZiMGYxNDUiLCJpYXQiOjE3MjQ1MzI4MDgsImV4cCI6MTcyNDUzNjQwOH0.GP2V0ll18V5uGMkQX9vJNyJSiRbrqgyD3RAZx5Tq0Mg"
}
```
Description: Log in with your registered email and password. This will generate a JWT access token, which is required to access protected endpoints. The token is valid for 1 hour.

------------------------------------------------------------------------------------------------------------------------ 
 
## Add Book
Endpoint: [https://bookstore-a8ci.onrender.com/api/v1/books] \
Method: POST \
Autorization: header as Bearer <token> 
Request Payload:
```
{
  "title": "Add Title",
  "author": "Add Author Name",
  "gender": "Gender"
}
 
```

Response:
```
{
    "success": true,
    "msg": "Book added successfully",
    "data": {
        "title": "Harry Potter",
        "author": "J. K. Rowling",
        "gender": "male",
        "_id": "66ca49cbd1b3acc8dfb0f148",
        "publishedDate": "2024-08-24T20:59:55.249Z",
        "createdAt": "2024-08-24T20:59:55.250Z",
        "updatedAt": "2024-08-24T20:59:55.250Z",
        "__v": 0
    }
}
```
Description: Add a new book to the database. The request must include the book's title, author, and gender. Ensure you provide a valid JWT access token in the Authorization header.

-----------------------------------------------------------------------------------------------------------------------
 
## Get the list of the book
Endpoint: [https://bookapp-7mbb.onrender.com/api/v1/books] \
Method: GET \
Autorization: header as Bearer <token> 
Description: It will show all the added Book's List.
 
-----------------------------------------------------------------------------------------------------------------------
## Delete Book
Endpoint: [https://bookapp-7mbb.onrender.com/api/v1/books/:id] \
Method: DELETE \
Autorization: header as Bearer <token> 
Description: It will Delete the book by giving the Book id.

------------------------------------------------------------------------------------------------------------------------
 
Note: 
## JWT Token: Most of the API requests require a JWT token for authentication. Ensure to include the token in the Authorization header as Bearer <token>.

Error Handling:
## Handle errors gracefully. If an error occurs, the API will return a message explaining the issue, such as "User already exists" or "Invalid credentials".

Additional Information:
## Deployment: For deployment purposes, `nodemon` has been commented out. It is recommended to use `node index.js` to start the application in a production environment.

## Environment Variables: Ensure to set up our `.env` file with the necessary environment variables such as `MONGODB_URI`, `JWT_SECRET`, etc.
 

# Application Hosted on render.com and the Database is mongoDB Atlas
- Backend hosted URL [click here](https://bookstore-a8ci.onrender.com)