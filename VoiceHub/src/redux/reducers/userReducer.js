import { GET_POSTS, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../actions/actions";

const initialState = {
    user: [],
    posts: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POSTS:
        return { ...state, posts: action.payload };
      case LOGIN_USER:
        return { ...state, user: action.payload };
      case LOGOUT_USER:
        return { ...state, user: [] };
      case REGISTER_USER:
        return state;
      default:
        return state;
    }
  };

export default userReducer;