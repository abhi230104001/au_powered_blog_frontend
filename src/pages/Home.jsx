import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, resetPosts } from '../redux/slices/postSlice';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());

    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center mt-10">{message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Blog</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover amazing AI-generated content, share your thoughts, and connect with a community of tech enthusiasts.
        </p>
      </motion.div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No posts available yet. Be the first to write one!
        </div>
      )}
    </div>
  );
};

export default Home;
