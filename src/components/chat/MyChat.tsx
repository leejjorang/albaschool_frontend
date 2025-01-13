import Chat from "./Chat";

interface MyChatProps {
  message: string;
  time: string;
}

const MyChat: React.FC<MyChatProps> = ({message, time}) => {
  return (
    <Chat sender="my" message={message} time={time} />
  );
}

export default MyChat;
