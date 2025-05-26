const Review =require ('../models/Review.js');
const Book =require ('../models/Book.js');

exports.createReviewService = async ({ bookId, rating, comment, user }) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  const review = new Review({
    bookId,
    userId: user.id,
    rating,
    comment,
  });

  await review.save();
  return review;
};

exports.getReviewsByBookIdService = async (bookId) => {
  if (!bookId) {
    throw new Error('bookId is required');
  }

  const reviews = await Review.find({ bookId }).sort({ createdAt: -1 });
  return reviews;
};
