import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">📚 BookVerse</Link>
      <div className="space-x-4">
        <Link to="/books" className="hover:text-blue-600 font-medium">Books</Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-600 font-medium">Profile</Link>
            <button
              onClick={() => dispatch(logout())}
              className="text-red-500 hover:underline font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
            <Link to="/signup" className="hover:text-blue-600 font-medium">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
