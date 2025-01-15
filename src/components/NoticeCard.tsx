import React from "react";
import styled from "styled-components";

interface NoticeCardProps {
  id: number;
  storeName: string;
  message: string;
  time: string;
}


const NoticeCard: React.FC<NoticeCardProps> = ({id, storeName, message, time}) => {
  return (
    <NoticeBoxStyle>
      <div style={{maxWidth: '60%'}}>
        <p style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.3rem'}}>{storeName}</p>
        <p style={{color: '#565656'}}>{message}</p>
      </div>
      <TimeBoxStyle>
        <p>{time}</p>
      </TimeBoxStyle>
    </NoticeBoxStyle>
  );
};

export default NoticeCard;


const NoticeBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #000000;
  width: 93%;
  padding: 0.7rem 1rem;
  border-radius: 10px;

  p {
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const TimeBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`