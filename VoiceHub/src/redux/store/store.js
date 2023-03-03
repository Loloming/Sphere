import thunkMiddleware from "redux-thunk";
import userReducer from "../reducers/userReducer";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {userReducer},
  devTools: true,
  middleware: [thunkMiddleware]
})
export default store;
