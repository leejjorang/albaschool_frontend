import styled from 'styled-components';
import Input from '@mui/joy/Input';

interface InputBoxProps {
  title: string;
  message?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({title, message}) => {
  return (
    <InputBoxStyle>
      <p>{title}</p>
      <Input
        disabled={false}
        placeholder={message}
        variant="outlined"
        sx={{ overflowY: 'hidden', width: '65%' }}
      />
    </InputBoxStyle>  
  )
}

export default InputBox;


const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;

  p {
    width: 25%;
    text-align: end;
  }
`