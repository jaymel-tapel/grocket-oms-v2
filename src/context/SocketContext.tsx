import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuthContext } from "./UserAuthContext";
import { Socket } from "socket.io-client";

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
      console.log("websocket trigger");
      // const socket = io(API_URL, {
      //   query: {
      //     userId: user.id,
      //   },
      // });

      // setSocket(socket);

      // socket.on("getOnlineUsers", (users: string[]) => {
      //   setOnlineUsers(users);
      // });

      // return () => {
      //   socket.close();
      // };
    } else {
      if (socket) {
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