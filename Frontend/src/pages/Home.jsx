import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/api/books?limit=4`);
        
        setFeaturedBooks(res.data.books);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="space-y-8 px-5">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome to BookVerse</h1>
        <p className="text-gray-600">Discover, read, and review your favorite books</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Books</h2>
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
                 <Link key={book._id}
                  to={`/books/${book._id}`}
                  className="mt-2 inline-block  text-blue-600 hover:underline"
                >
              <div  className="bg-white rounded hover:bg-amber-100 shadow p-4">
                <img
                  src={book.coverImage || book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                
                  View Details
              </div>
                </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
