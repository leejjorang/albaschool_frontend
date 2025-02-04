import styled from "styled-components";
import { BigButton, Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  const handleManagerClick = () => {
    navigate('/signup/manager');
  };

  const handleStaffClick = () => {
    navigate('/signup/staff');
  }
 
  return (
    <SelectRoleStyle>
      <p>이용 목적에 맞는 회원 유형을 선택하세요.</p>
      <BigButton message="사업자" width={70} onClick={handleManagerClick}/>
      <BigButton message="직원 / 알바" width={70} onClick={handleStaffClick} />
    </SelectRoleStyle>
  );
}
const SelectRoleStyle = styled.div`
  width: 100%;
  height: calc(100vh - 7.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;

  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;
export default SelectRole;