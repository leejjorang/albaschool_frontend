import styled from 'styled-components';
import Input from '@mui/joy/Input';

interface InputBoxProps {
  title: string;
  message?: string;
  disabled?: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({title, message, disabled}) => {
  return (
    <InputBoxStyle>
      <p style={{width: '25%'}}>{title}</p>
      <Input
        disabled={disabled}
        placeholder={message}
        variant="outlined"
        sx={{ overflowY: 'hidden', width: '65%' }}
      />
    </InputBoxStyle>  
  )
}

export const WideInputBox: React.FC<InputBoxProps> = ({title, message, disabled}) => {
  return (
    <InputBoxStyle>
      <p style={{width: '20%'}}>{title}</p>
      <Input
        disabled={disabled}
        placeholder={message}
        variant="outlined"
        sx={{ overflowY: 'hidden', width: '75%' }}
      />
    </InputBoxStyle>  
  )
}


const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;

  p {
    text-align: end;
  }
`