import { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import { useGetMessagesQuery } from "../../../../services/queries/chatQueries";
import { chatRoute } from "../../../../pages/routeTree";

const useGetMessages = () => {
  const { messages, setMessages } = useChatContext();
  const { chatId } = chatRoute.useParams();
  const { data, isFetching, fetchNextPage } = useGetMessagesQuery(chatId);

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
