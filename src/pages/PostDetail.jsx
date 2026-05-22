import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, clearPost } from '../redux/slices/postSlice';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, isLoading, isError, message } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost(id));
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, id]);

  if (isLoading || !post) {
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
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover"
        />
      )}
      
      <div className="p-8 md:p-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400 mb-10 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <span className="font-medium">{post.author?.username}</span>
          </div>
          <div className="flex items-center">
            <FaCalendar className="mr-2" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
