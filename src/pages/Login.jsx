import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../redux/slices/authSlice';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Welcome Back</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors outline-none"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
