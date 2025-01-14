import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';

interface UserProfileProps {
  userName: string;
  profile?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({userName, profile}) => {
  return (
    <UserProfileStyle>
      <Avatar src={profile} sx={{ width: '6.5rem', height: '6.5rem' }} />
      <div>
        <h3>{userName} 님</h3>
        <span>
          <SettingsIcon sx={{ color: '#5F6368' }}/>
          <p>회원 정보</p>
        </span>
      </div>
    </UserProfileStyle>
  )
}

export default UserProfile;


const UserProfileStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 1.5rem 3.5rem 1.5rem;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 1.3rem;
    color: #5F6368;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`