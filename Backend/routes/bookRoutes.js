const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);

// Admin Only
router.post('/', protect, adminOnly, bookController.createBook);
router.put('/:id', protect, adminOnly, bookController.updateBook);
router.delete('/:id', protect, adminOnly, bookController.deleteBook);
router.post('/bulk', protect, bookController.bulkCreateBooks);

module.exports = router;
