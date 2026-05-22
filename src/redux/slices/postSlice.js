import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  posts: [],
  post: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all posts
export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/posts');
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single post
export const getPost = createAsyncThunk(
  'posts/getPost',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    clearPost: (state) => {
      state.post = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPosts, clearPost } = postSlice.actions;
export default postSlice.reducer;
