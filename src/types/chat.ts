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
  id: string;
  title: string;
  lastMessage: string;
  notReadCount: number;
  memberCount: number;
}
