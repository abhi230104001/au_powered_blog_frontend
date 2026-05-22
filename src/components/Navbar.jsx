import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { FaPen, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              AI Blog
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/create-post" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center">
                  <FaPen className="mr-2" /> Write
                </Link>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center">
                  <FaUser className="mr-2" /> Dashboard
                </Link>
                <button onClick={onLogout} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors flex items-center">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
