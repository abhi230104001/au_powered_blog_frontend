import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/slices/postSlice';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion';
import { FaBook, FaHeart, FaEye } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const userPosts = posts.filter((post) => post.author?._id === user._id);
  const totalLikes = userPosts.reduce((acc, post) => acc + (post.likes?.length || 0), 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8"
      >
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl text-white font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Posts</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userPosts.length}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-primary">
            <FaBook size={24} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Likes</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalLikes}</h3>
          </div>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-500">
            <FaHeart size={24} />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Profile Views</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">--</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500">
            <FaEye size={24} />
          </div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Posts</h2>
      {userPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
          <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
