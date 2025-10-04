const mongoose = require('mongoose');
const Book = require('../models/Book');
const Review = require('../models/Review');

const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Page and limit must be positive integers' });
    }

    const skip = (page - 1) * limit;
    const total = await Book.countDocuments();

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('addedBy', 'name');

    res.json({
      books,
      page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviews = await Review.find({ bookId: book._id });
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    res.json({ ...book._doc, averageRating: avgRating, reviewsCount: reviews.length });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};


const getBookDetailsWithReviews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const book = await Book.findById(id).populate('addedBy', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const reviews = await Review.find({ bookId: id }).populate('userId', 'name');
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    res.json({
      book,
      reviews,
      averageRating: avgRating,
      reviewsCount: reviews.length,
    });
  } catch (error) {
    console.error('Error fetching book details and reviews:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (!book.addedBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, author, description, genre, year } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.genre = genre || book.genre;
    book.year = year || book.year;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (!book.addedBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Review.deleteMany({ bookId: book._id });
    await book.deleteOne(); 
    res.json({ message: 'Book removed' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user._id })
      .populate('addedBy', 'name')
      .sort({ createdAt: -1 });
    res.json({ books });
  } catch (error) {
    console.error('Error fetching user books:', error.message);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

module.exports = { addBook, getBooks, getBookById, getBookDetailsWithReviews, updateBook, deleteBook ,getMyBooks};