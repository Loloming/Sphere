import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const { VITE_PORT } = import.meta.env;
const POSTS_URL = `http://localhost:${VITE_PORT}/posts/getPost`

export const getPosts = createAsyncThunk(
    'post/get',
    async () => {
        try {
            const response = await axios.get(
                POSTS_URL,
            )
            return {
                posts: response.data
            }
        } catch (error) {
            return {message: error.message}
        }
    }
);

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload.posts
            })
    }
})

export const getAllPosts = (state) => state.post.posts

export default postsSlice.reducer;