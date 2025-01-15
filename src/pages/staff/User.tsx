import styled from 'styled-components';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import UserProfile from '../../components/user/UserProfile';
import { StaffStoreCard } from '../../components/user/Card';
import { Link } from 'react-router-dom';

const User = () => {
  return (
    <div>
      <UserProfile userName='홍길동' />
      <WorkplaceBoxStyle>
        <span>
          <h2>나의 근무지</h2>
          <Link to={'/store/register/staff'}><ControlPointIcon /></Link>
        </span>
        <CardBoxStyle>
          <StaffStoreCard storeName='솥뚜껑 삼겹살' />
          <StaffStoreCard storeName='서브웨이' />
          <StaffStoreCard storeName='CU 편의점' />
        </CardBoxStyle>
      </WorkplaceBoxStyle>
    </div>
  );
};

export default User;


const WorkplaceBoxStyle = styled.div`
  margin: 1rem 1.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  
  a {
    display: flex;
    color: #000000;
  }
`

const CardBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`