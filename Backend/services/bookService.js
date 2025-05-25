const Book = require('../models/Book');

async function getAllBooks(queryParams) {
  const { search, genre, page = 1, limit = 10 } = queryParams;

  const filter = {};

  // Search by title or author
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by genre
  if (genre) {
    filter.genre = genre;
  }

  const skip = (page - 1) * limit;

  const books = await Book.find(filter)
    .skip(skip)
    .limit(Number(limit));

  const total = await Book.countDocuments(filter);
  

  return {
    books,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    totalItems: total
  };
}


async function getBookById(id) {
  return await Book.findById(id);
}

async function createBook(bookData) {
  return await Book.create(bookData);
}

async function updateBook(id, bookData) {
  return await Book.findByIdAndUpdate(id, bookData, { new: true });
}

async function deleteBook(id) {
  return await Book.findByIdAndDelete(id);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
