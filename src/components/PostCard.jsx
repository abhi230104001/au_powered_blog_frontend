import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {post.content}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {post.author?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author?.username}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
