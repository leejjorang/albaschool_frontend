export interface Message {
  content: string;
  createdAt:  string;
  id: string;
  name: string;
  senderId: string;
}

export interface Messages {
  messages: Message[];
}
