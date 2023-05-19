import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_PORT } = import.meta.env;
const LOGIN_URL = `http://localhost:${VITE_PORT}/users/loginUser`;
const REGISTER_URL = `http://localhost:${VITE_PORT}/users/registerUser`;
const USERNAME_URL = `http://localhost:${VITE_PORT}/users/putUser`;

export const loginUser = createAsyncThunk(
  "user/login", 
  async (payload) => {
    try {
      const response = await axios.post(
        LOGIN_URL, 
        payload.user
    );
      return { 
        data: response.data, 
        setMessage: payload.setMessage || undefined 
    };
  } catch (error) {
    return { error: error, setMessage: payload.setMessage };
  }
});

export const changeUserProperty = createAsyncThunk(
  "user/setUsername",
  async (payload) => {
    try {
      let response = await axios.put(
        USERNAME_URL,
        payload
      );
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/register",
  async (payload) => {
    try {
      const response = await axios.post(REGISTER_URL, payload.user);
      return { data: response.data, setMessage: payload.setMessage };
    } catch (error) {
      return { error: error, setMessage: payload.setMessage };
    }
  }
);

const initialState = {
  userLogged: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
  
        if (!action.payload.setMessage) {
          state.userLogged = [action.payload.data.user]
        }
        else if (action.payload.error) {
          action.payload.setMessage(action.payload.error.response.data.response);
          state.error = action.payload.error.message;
        }
        else {
          action.payload.setMessage(action.payload.data.response);
          state.userLogged = [action.payload.data.user];
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
  
        action.payload.setMessage(action.payload.error.response.data.response);
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.error) {
          action.payload.setMessage(
            action.payload.error.response.data.response
          );
          state.error = action.payload.error.message;
        } else {
          action.payload.setMessage(action.payload.data.response);
          state.userLogged = [action.payload.data.user];
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        action.payload.setMessage(action.payload.error.response.data.response);
        state.error = action.error.message;
      })
      .addCase(changeUserProperty.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(changeUserProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userLogged = action.payload
      })
      .addCase(changeUserProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// export const { setUser } = userSlice.actions;

export const getUserLogged = (state) => state.user.userLogged;
export const getUserError = (state) => state.user.error;
export const getUserStatus = (state) => state.user.status;

export default userSlice.reducer;
