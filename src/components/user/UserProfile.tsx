import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

interface UserProfileProps {
  userName: string;
  profile?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({userName, profile}) => {
  return (
    <UserProfileStyle>
      <Avatar src={profile} sx={{ width: '6.3rem', height: '6.3rem' }} />
      <div>
        <h3>{userName} 님</h3>
        <Link to={'/user/edit'}>
          <SettingsIcon sx={{ color: '#5F6368' }}/>
          <p>회원 정보</p>
        </Link>
      </div>
    </UserProfileStyle>
  )
}

export default UserProfile;


const UserProfileStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 1.5rem 2.5rem 1.5rem;

  h3 {
    font-size: 1.35rem;
    margin-bottom: 0.1rem;
  }

  p {
    font-size: 1.15rem;
    color: #5F6368;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    text-decoration: none;
  }
`