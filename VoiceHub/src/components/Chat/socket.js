import io from "socket.io-client";

const { VITE_PORT } = import.meta.env;

const socket = io(`http://localhost:${VITE_PORT}`);

export default socket;
