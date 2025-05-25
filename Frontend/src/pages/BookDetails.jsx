import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const { user } = useSelector((state) => state.auth);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      console.log(res);
      
      setBook(res.data);
    } catch (err) {
      console.error('Failed to load book:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews?bookId=${id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/reviews',
        { bookId: id, rating, comment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <p className="text-gray-600">Author: {book.author}</p>
        <p className="mt-2 text-gray-700">{book.description}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Reviews</h3>
        {reviews && (
          <p>No reviews yet.</p>
        ) && (
          <ul className="space-y-4 mt-4">
            {reviews.map((rev) => (
              <li key={rev._id} className="bg-gray-100 p-4 rounded">
                <p className="text-sm text-gray-700">By: {rev.user?.name}</p>
                <p className="text-yellow-600">⭐ {rev.rating}</p>
                <p>{rev.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mt-6">
          <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
          <label className="block mb-2">
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="ml-2 border p-1 rounded"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <textarea
            className="w-full border p-2 rounded mt-2"
            placeholder="Write your review here..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white mt-3 px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default BookDetails;
