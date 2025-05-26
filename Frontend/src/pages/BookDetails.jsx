import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const bookRes = await axios.get(`http://localhost:5000/api/books/${id}`);
        const reviewsRes = await axios.get(`http://localhost:5000/api/reviews?bookId=${id}`);
        console.log(reviewsRes);
        
        setBook(bookRes.data);
        setReviews(reviewsRes.data.reviews);
      } catch (err) {
        console.error('Failed to fetch book or reviews', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await axios.post(
        `http://localhost:5000/api/reviews`,
        { bookId: id, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setComment('');
      setRating(5);

      const updatedReviews = await axios.get(`http://localhost:5000/api/reviews?bookId=${id}`);
      setReviews(updatedReviews.data.reviews);
    } catch (err) {
      console.error('Failed to submit review', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!book) return <div className="p-4 text-red-600">Book not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Book Info */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow rounded p-6">
        <img
          src={book.imageUrl ||book.coverImage|| '/default-book.jpg'}
          alt={book.title}
          className="w-full md:w-60 h-80 object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg mb-1">Author: <span className="font-medium">{book.author}</span></p>
          <p className="text-gray-600 mb-4">Genre: <span className="capitalize">{book.genre}</span></p>
          <p className="text-gray-700">{book.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev) => (
              <li key={rev._id} className="border border-gray-100 rounded p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700 font-medium">{rev.user?.name || 'Anonymous'}</span>
                  <span className="text-yellow-500 font-semibold">⭐ {rev.rating}</span>
                </div>
                <p className="text-gray-700">{rev.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Review */}
      {user && (
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label htmlFor="rating" className="block mb-1 font-medium text-gray-700">
                Rating
              </label>
              <select
                id="rating"
                className="w-full border rounded p-2"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} - {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'][5 - num]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="comment" className="block mb-1 font-medium text-gray-700">
                Comment
              </label>
              <textarea
                id="comment"
                className="w-full border rounded p-2"
                rows="4"
                placeholder="Write your thoughts about the book..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
