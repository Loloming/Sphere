import axios from "axios";

// Usuarios

export const GET_POSTS = "GET_POSTS";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";


export const loginUser = (setMessage, payload) => {
    // payload es un obj con mail y password
    return async function (dispatch) {
      try {
        const data = await axios.post(
          `http://localhost:3001/users/loginUser`,
          payload
        );
        setMessage(data.data.response);
        if (data.data.response === "User logged!") {
          localStorage.setItem("user", data.data.user); // por ahora sólo guardamos el user_id en localStorage
        }
        console.log(data)
        dispatch({
          type: LOGIN_USER,
          payload: [data.data.user],
        });
      } catch (error) {
        console.log(error);
      }
    };
  };