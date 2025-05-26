const {
  createReviewService,
  getReviewsByBookIdService,
} =require ('../services/reviewService.js');

exports.createReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const review = await createReviewService({
      bookId,
      rating,
      comment,
      user: req.user,
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.getReviewsByBookId = async (req, res) => {
  try {
    const reviews = await getReviewsByBookIdService(req.query.bookId);
    res.status(200).json({ reviews });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
