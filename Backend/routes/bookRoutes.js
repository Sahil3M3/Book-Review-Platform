const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Public
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);

// Admin Only
router.post('/', verifyToken, isAdmin, bookController.createBook);
router.put('/:id', verifyToken, isAdmin, bookController.updateBook);
router.delete('/:id', verifyToken, isAdmin, bookController.deleteBook);

module.exports = router;
