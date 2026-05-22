import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/slices/postSlice';
import { toast } from 'react-toastify';
import api from '../services/api';
import { motion } from 'framer-motion';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const { title, content, tags } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGenerateAI = async () => {
    if (!imageFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsGenerating(true);
    try {
      const data = new FormData();
      data.append('image', imageFile);
      if (aiPrompt) data.append('prompt', aiPrompt);

      const response = await api.post('/ai/generate', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setFormData({
          title: response.data.data.title || '',
          content: response.data.data.content || '',
          tags: response.data.data.tags ? response.data.data.tags.join(', ') : '',
        });
        toast.success('Content generated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      const postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      postData.append('tags', JSON.stringify(tagsArray));
      
      if (imageFile) {
        postData.append('image', imageFile);
      }

      await dispatch(createPost(postData)).unwrap();
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Failed to publish post');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create New Post</h1>
        
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">✨ AI Auto-Generate</h2>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
            Upload an image and optionally provide a prompt. Our Gemini AI will generate a complete blog post for you!
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Context (Optional)</label>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Focus on the sunset..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors outline-none"
              />
            </div>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating || !imageFile}
              className={`px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg transition-all shadow-md ${isGenerating || !imageFile ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'}`}
            >
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="h-32 rounded-lg object-cover shadow-sm" />
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors outline-none text-xl font-semibold"
              placeholder="Post title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors outline-none"
              placeholder="technology, ai, future"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
            <textarea
              name="content"
              value={content}
              onChange={onChange}
              required
              rows="12"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-colors outline-none font-mono text-sm"
              placeholder="Write your post content here..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isPublishing}
              className={`px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-md ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPublishing ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
