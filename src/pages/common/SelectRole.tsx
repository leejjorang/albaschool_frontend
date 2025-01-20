import styled from "styled-components";
import { Button } from "../../components/Button";
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
      <Button message="사업자" width={60} onClick={handleManagerClick}/>
      <Button message="직원" width={60} onClick={handleStaffClick} />
    </SelectRoleStyle>
  );
}
const SelectRoleStyle = styled.div`
  width: 100%;
  height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
`;
export default SelectRole;