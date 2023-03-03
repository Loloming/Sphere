import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const POSTS_URL = 'http://localhost:6942/posts/getPost'

export const getPosts = createAsyncThunk(
    'post/get',
    async (payload) => {
        try {
            const response = await axios.get(
                POSTS_URL,
            )
        } catch (error) {
            
        }
    }
)