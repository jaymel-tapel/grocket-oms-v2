import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import { useGetMessagesQuery } from "../../../../services/queries/chatQueries";

const useGetMessages = () => {
  const { selectedConversation, messages, setMessages } = useChatContext();
  const { data, isFetching, fetchNextPage } = useGetMessagesQuery(
    selectedConversation?.id
  );

  useEffect(() => {
    if (!data || data?.pages[0].edges.length === 0) {
      setMessages([]);
      return;
    }

    const _messages = data.pages.flatMap((page) =>
      page.edges.map((edge) => edge.node)
    );

    setMessages(_messages);
  }, [data, setMessages]);

  return { messages, isFetching, fetchNextPage };
};

export default useGetMessages;
