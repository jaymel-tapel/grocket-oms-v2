type User = {
  id: number;
  name: string;
  email: string;
};

type Client = {
  id: number;
  name: string;
  email: string;
};

type Participant = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  conversationId: number;
  userId: number;
  clientId: number;
  user: User;
  client: Client;
};

export type Message = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  content: string;
  conversationId: number;
  senderId: number;
};

export type ConversationNode = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  participantCount: number;
  participants: Participant[];
  messages: Message[];
};

export type ConversationEdge = {
  cursor: string;
  node: ConversationNode;
};

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: number;
  endCursor: number;
};

export type ConversationData = {
  edges: ConversationEdge[];
  pageInfo: PageInfo;
  totalCount: number;
};

export type ConversationParams = {
  keyword?: string;
  first?: number;
  after?: number;
  last?: number;
  before?: number;
};

export type MessagesEdge = {
  cursor: string;
  node: Message;
};

export type MessagesData = {
  edges: MessagesEdge[];
  pageInfo: PageInfo;
  totalCount: number;
};
