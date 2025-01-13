import styled from 'styled-components';

interface ButtonProps {
  message: string;
}

export const Button: React.FC<ButtonProps> = ({message}) => {
  return (
    <ButtonStyle>
      {message}
    </ButtonStyle>
  )
}

export default Button;


const ButtonStyle = styled.button`
  background-color: #FAED7D;
  border: 1px solid #CDCDCD;
  border-radius: 15px;
  padding: 0.7rem 1.1rem;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FFD400;
  }
` 