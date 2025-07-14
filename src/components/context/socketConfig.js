import { io } from "socket.io-client";
import { createContext } from "react";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

console.log(SOCKET_URL)

const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  autoConnect: false,
  transports: ["websocket"],
});

const socketContext = createContext(socket);
export default socketContext;
