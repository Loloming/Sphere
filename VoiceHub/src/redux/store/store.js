import thunkMiddleware from "redux-thunk";
import userReducer from "../reducers/userReducer";
import postReducer from "../reducers/postReducer";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  devTools: true,
  middleware: [thunkMiddleware]
})
export default store;
