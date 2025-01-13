import styled from "styled-components";

interface AlertChatProps {
  message: string;
}

const AlertChat: React.FC<AlertChatProps> = ({ message }) => {
  return (
    <AlertStyle>
      <p>{message}</p>
    </AlertStyle>
  );
}

export default AlertChat;


const AlertStyle = styled.div`
  display: flex;
  justify-content: center;

  p {  
    text-align: center;
    padding: 0.5rem;
    background-color: #ffffff;
    border: 1px solid #CDCDCD;
    border-radius: 20px;
    width:50%
  }
`