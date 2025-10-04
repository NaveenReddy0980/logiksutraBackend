const express = require('express');
const router = express.Router();
const { addReview, updateReview, getReviewsByBook, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');
const validateObjectId = (req, res, next) => {
  const id = req.params.id || req.params.bookId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid ${req.params.id ? 'review' : 'book'} ID` });
  }
  next();
};

router.route('/')
  .post(protect, addReview);
router.route('/:id')
  .put(protect, validateObjectId, updateReview)
  .delete(protect, validateObjectId, deleteReview);
router.route('/book/:bookId')
  .get(validateObjectId, getReviewsByBook);

module.exports = router;