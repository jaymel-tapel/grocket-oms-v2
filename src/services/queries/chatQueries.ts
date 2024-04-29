import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ConversationData,
  ConversationParams,
  MessagesData,
} from "./chatQueriesType";
import { getHeaders } from "../../utils/utils";

const API_URL = import.meta.env.VITE_API_URL;
const CONVERSATIONS_URL = API_URL + "/conversations";
// const CHATS_URL = API_URL + "/chats";
const MESSAGES_URL = API_URL + "/messages";

const getAllConversations = async (
  pageParam?: ConversationParams
): Promise<ConversationData> => {
  const params = pageParam ?? {};

  const response = await axios.get(CONVERSATIONS_URL, {
    headers: getHeaders(),
    params,
  });

  return response.data;
};

export const useGetAllConversations = () => {
  return useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: ({ pageParam }) =>
      getAllConversations({ first: 10, after: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
  });
};

const getMessages = async (
  pageParam: ConversationParams & { conversationId?: number }
): Promise<MessagesData> => {
  const params = pageParam;

  const response = await axios.get(MESSAGES_URL, {
    headers: getHeaders(),
    params,
  });

  return response.data;
};

export const useGetMessagesQuery = (conversationId?: number) => {
  return useInfiniteQuery({
    enabled: conversationId ? true : false,
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam }) =>
      getMessages({ conversationId, first: 10, after: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
  });
};
