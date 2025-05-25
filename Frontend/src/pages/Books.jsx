import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books', {
        params: {
          search,
          genre,
          page,
          limit: 4,
        },
      });
console.log(res);

      setBooks(res.data.books);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, genre, page]);

  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-bold">Browse Books</h2>

      <div className="flex gap-4 ">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
            <Link
              to={`/books/${book._id}`}
              className="text-blue-500 hover:underline block mt-2"
            >
              View Book
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded ${
              i + 1 === page ? 'bg-blue-600 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
