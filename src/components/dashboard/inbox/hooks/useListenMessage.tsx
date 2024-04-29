import { useEffect } from "react";
import { useSocketContext } from "../../../../context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useChatContext } from "../context/ChatContext";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChatContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, queryClient, messages, setMessages]);

  return { messages };
};

export default useListenMessage;
