import axios from "axios";

// Usuarios

export const GET_POSTS = "GET_POSTS";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";


export const loginUser = (login, payload) => {
    // payload es un obj con mail y password
    return async function (dispatch) {
      try {
        const data = await axios.post(
          `http://localhost:3001/users/loginUser`,
          { email: payload.email, password: payload.password }
        );
        console.log(data)
        localStorage.setItem("User_ID", data.data.user.id); // por ahora sólo guardamos el user_id en localStorage
        dispatch({
          type: LOGIN_USER,
          payload: data.user,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };