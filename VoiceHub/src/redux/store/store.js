import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "../reducers/userReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    user: userReducer
})

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
