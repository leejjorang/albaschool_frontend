export interface Message {
  content: string;
  createdAt: string;
  id: string;
  name: string;
  senderId: string;
}

export interface Messages {
  messages: Message[];
}

export interface IChatRoom {
  createdAt: string;
  id: string;
  lastMessage: string;
  notReadCount: number;
  memberCount: number;
  title: string;
}
