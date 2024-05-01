import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuthContext } from "./UserAuthContext";
import { Socket, io } from "socket.io-client";
import { getHeaders } from "../utils/utils";

// const API_URL = import.meta.env.VITE_API_URL;

export type SocketContext = {
  onlineUsers: string[];
  socket: Socket | null;
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
};

export const SocketContext = createContext<SocketContext>({
  onlineUsers: [],
  socket: null,
  setOnlineUsers: () => {},
  setSocket: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { user } = useUserAuthContext();

  useEffect(() => {
    if (user) {
      const { Authorization } = getHeaders();

      const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
        // autoConnect: false,
        transports: ["websocket"],
        query: {
          type: "user",
        },
        extraHeaders: {
          authorization: Authorization,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: string[]) => {
        console.log(users);
        setOnlineUsers(users);
      });

      return () => {
        if (socket.connected) {
          socket.close();
        }
      };
    } else {
      if (socket?.connected) {
        socket.close();
        setSocket(null);
      }
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        onlineUsers,
        socket,
        setOnlineUsers,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
