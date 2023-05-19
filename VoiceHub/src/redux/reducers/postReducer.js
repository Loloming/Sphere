import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_PORT } = import.meta.env;
const POSTS_URL = `http://localhost:${VITE_PORT}/posts/getPost`;

var defaultProfilePosts;

export const getPosts = createAsyncThunk("post/get", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return {
      posts: response.data,
    };
  } catch (error) {
    return { message: error.message };
  }
});

const initialState = {
  posts: [],
  profilePosts: [],
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setProfilePosts(state, action) {
      defaultProfilePosts = action.payload;
      state.profilePosts = action.payload;
    },
    filterProfilePosts(state, action) {
      if (
        action.payload.date === false &&
        action.payload.likes === false &&
        action.payload.comments === false
      ) {
        state.profilePosts = defaultProfilePosts;
      }
      if (action.payload.date === "recent") {
        state.profilePosts = state.profilePosts
          .sort((a, b) => a.id - b.id)
          .reverse();
      }
      if (action.payload.date === "older") {
        state.profilePosts = state.profilePosts.sort((a, b) => a.id - b.id);
      }
      if (action.payload.comments === "most_commented") {
        state.profilePosts = state.profilePosts.sort(
          (a, b) => b.Comments.length - a.Comments.length
        );
      }
      if (action.payload.comments === "less_commented") {
        state.profilePosts = state.profilePosts.sort(
          (a, b) => a.Comments.length - b.Comments.length
        );
      }
      if (action.payload.likes === "most_liked") {
        state.profilePosts = state.profilePosts.sort(
          (a, b) => b.Likes.length - a.Likes.length
        );
      }
      if (action.payload.likes === "less_liked") {
        state.profilePosts = state.profilePosts.sort(
          (a, b) => a.Likes.length - b.Likes.length
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      });
  },
});

export const { setProfilePosts, filterProfilePosts } = postsSlice.actions;

export const getAllPosts = (state) => state.post.posts;
export const getProfilePosts = (state) => state.post.profilePosts;

export default postsSlice.reducer;
