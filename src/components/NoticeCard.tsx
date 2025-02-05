import React from "react";
import styled from "styled-components";

interface NoticeCardProps {
  storeName: string;
  message: string;
  time: string;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  storeName,
  message,
  time,
}) => {
  return (
    <NoticeBoxStyle>
      <div style={{ maxWidth: "60%" }}>
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "0.3rem",
          }}
        >
          {storeName}
        </p>
        <p style={{ color: "#565656" }}>{message}</p>
      </div>
      <TimeBoxStyle>
        <p style={{color: "#7E7E7E"}}>{time}</p>
      </TimeBoxStyle>
    </NoticeBoxStyle>
  );
};

export default NoticeCard;

const NoticeBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #cdcdcd;
  width: 93%;
  padding: 0.7rem 1rem;
  border-radius: 10px;

  p {
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const TimeBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;
