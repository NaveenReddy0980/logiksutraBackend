Book Reviews Backend
Welcome! This is the backend for our Book Reviews app, the engine that lets users add, edit, delete, and review books. It’s built to be simple, secure, and easy to use. Here’s what you need to know to get started.
What It Does
This backend powers our Book Reviews website by:

Managing Books: Users can add, edit, delete, or view their own books.
Handling Reviews: Users can write, update, or delete reviews for books.
Keeping Things Secure: Uses login tokens to ensure only authorized users can edit or delete their content.
Storing Data: Saves books, reviews, and user info in a MongoDB database.
Supporting the Frontend: Works with pages like MyBooks.js, AddBook.js, and BookDetails.js.

Tech Stack

Node.js & Express: Handles web requests.
MongoDB: Stores all data.
Mongoose: Simplifies database interactions.
JWT: Secures user logins with tokens.
dotenv: Loads settings from a .env file.

Setup Guide
Let’s get the backend running on your computer!
Prerequisites

Node.js: Version 14 or higher.
MongoDB: Set up locally or use MongoDB Atlas (cloud).
Git: To clone the project.

Steps

Clone the Project:git clone <your-repo-url>
cd book-reviews-backend


Install Dependencies:npm install

This installs Express, Mongoose, JWT, and more from package.json.
Set Up Environment Variables:Create a .env file in the project folder with:PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key


PORT: Server port (e.g., 5000).
MONGO_URI: MongoDB connection string (from Atlas or local).
JWT_SECRET: A random, secure string (e.g., mysecret123).


Start the Server:npm start

The server runs at http://localhost:5000. Look for “Server running on port 5000” in the console.
Test It:Use Postman or your frontend to test endpoints like GET http://localhost:5000/api/books/mybooks with a JWT token.

Project Structure

models/: Defines data structures.
Book.js: Stores book info (title, author, etc.).
User.js: Stores user info (name, email, password).
Review.js: Stores reviews (rating, comment, user).


controllers/: Handles request logic.
bookController.js: For adding, editing, deleting books.
reviewController.js: For managing reviews.
authController.js: For user login.


routes/: Defines API endpoints.
bookRoutes.js: Book routes (e.g., /api/books/mybooks).
reviewRoutes.js: Review routes (e.g., /api/reviews).


middleware/: Security checks.
authMiddleware.js: Verifies JWT tokens.


server.js: Starts the server and connects to MongoDB.

API Endpoints
Books

GET /api/books/mybooks: List books added by the logged-in user.
POST /api/books: Add a new book (needs title, author).
PUT /api/books/:id: Update a book you added.
DELETE /api/books/:id: Delete a book you added.
GET /api/books/:id: Get book details.
GET /api/books/:id/reviews: Get reviews for a book.

Reviews

POST /api/reviews: Add a review (needs rating, comment).
PUT /api/reviews/:id: Update your review.
DELETE /api/reviews/:id: Delete your review.

Authentication

POST /api/auth/login: Log in to get a token.
Request: { "email": "user@example.com", "password": "123456" }
Response: { "token": "jwt-token", "user": { "_id": "123", "name": "John" } }



Most routes need a JWT token in the Authorization header (Bearer <token>), except GET /api/books/:id/reviews and /api/auth/login.
How It Works

Login: Users log in to get a JWT token, stored in the frontend’s localStorage.
Books: Users can add books, and only the addedBy user can edit or delete them.
Reviews: Anyone can review a book, but only the reviewer can edit or delete their review.
Security: The protect middleware checks tokens to keep actions secure.
Database: MongoDB stores everything, with Mongoose making queries easy.

Troubleshooting

Server Fails: Check if PORT is free or MONGO_URI is correct.
“Not authorized”: Ensure the Authorization: Bearer <token> header is sent.
Database Errors: Verify MongoDB is running and MONGO_URI is valid.
CORS Issues: Add app.use(cors()) in server.js if needed.

Future Ideas

Add pagination for long book or review lists.
Use express-validator for better input checks.
Add search to find books by title or author.
Set up rate limiting to prevent abuse.

Contributing
Want to improve the backend? Fork the repo, make changes, and submit a pull request with a clear description.
Contact
Have questions? Open an issue on the repo or reach out to the team. Happy coding!
