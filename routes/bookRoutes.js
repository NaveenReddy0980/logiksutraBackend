const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById, getBookDetailsWithReviews, updateBook, deleteBook ,getMyBooks} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// Routes for /api/books
router.route('/')
  .get(getBooks)
  .post(protect, addBook);
router.route('/mybooks')
  .get(protect, getMyBooks);

// Routes for /api/books/:id
router.route('/:id')
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

// Route for /api/books/:id/reviews
router.route('/:id/reviews')
  .get(getBookDetailsWithReviews);

module.exports = router;