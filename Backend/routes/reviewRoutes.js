const express = require('express');
const {
  createReview,
  getReviewsByBookId,
} =require ('../controllers/reviewController.js');
const { protect } =require('../middleware/authMiddleware.js');

const router = express.Router();

// GET /api/reviews?bookId=xyz
router.get('/', getReviewsByBookId);

// POST /api/reviews (requires login)
router.post('/', protect, createReview);

module.exports = router;
