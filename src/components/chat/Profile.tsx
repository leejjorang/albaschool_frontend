import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

interface ProfileProps {
  name: string;
  profile?: string;
  my?: boolean;
}

const Profile: React.FC<ProfileProps> = ({name, profile, my}) => {
  return (
    <ProfileBoxStyle>
      <ProfileStyle>  
        <Avatar alt={name} src={profile} />
        <p>{name}</p>
      </ProfileStyle>
      
      {my && <span>나</span>}
    </ProfileBoxStyle>
  );
}

export default Profile;


const ProfileBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.7rem;

  span {
    background-color: #FF9D3C;
    padding: 0.4rem;
    border-radius: 50%;
    font-size: 0.8rem
  }
` 

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  p {
    font-size: 1.3rem;
  }
`