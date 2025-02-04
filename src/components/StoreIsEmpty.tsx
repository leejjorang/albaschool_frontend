import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";

function StoreIsEmpty() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  return (
    <StoreIsEmptyStyle>
      <div style={{ marginBottom: "10px" }}>소속된 가게가 없습니다</div>
      <Button
        message="가게 추가하기"
        width={80}
        onClick={() => navigate(`/store/register/${role}`)}
      />
    </StoreIsEmptyStyle>
  );
}

const StoreIsEmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
`;

export default StoreIsEmpty;
