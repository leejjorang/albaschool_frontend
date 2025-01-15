import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Badge from '../Badge';

interface ProfileBoxProps {
  name: string;
  profile?: string;
  my?: boolean;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({name, profile, my}) => {
  return (
    <ProfileBoxStyle>
      <ProfileStyle>  
        <Avatar alt={name} src={profile} />
        <p>{name}</p>
      </ProfileStyle>
      
      {my && <Badge message={'나'} />}
    </ProfileBoxStyle>
  );
}

export default ProfileBox;


const ProfileBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.7rem;
` 

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  p {
    font-size: 1.05rem;
  }
`