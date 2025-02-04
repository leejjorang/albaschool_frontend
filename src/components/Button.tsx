import styled from 'styled-components';

interface ButtonProps {
  type?: 'submit'|'reset';
  message: string;
  width?: number;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({type, message, width, onClick}) => {
  return (
    <ButtonStyle type={type} style={{width: `${width}%`}} onClick={onClick} >
      {message}
    </ButtonStyle>
  )
}

export const BigButton: React.FC<ButtonProps> = ({type, message, width, onClick}) => {
  return (
    <BigButtonStyle type={type} style={{width: `${width}%`}} onClick={onClick} >
      {message}
    </BigButtonStyle>
  )
}

export const NegativeButton: React.FC<ButtonProps> = ({message, width, onClick}) => {
  return (
    <NagativeButtonStyle style={{width: `${width}%`}} onClick={onClick}>
      {message}
    </NagativeButtonStyle>
  )
}


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

const BigButtonStyle = styled.button`
  background-color: #FAED7D;
  border: 1px solid #CDCDCD;
  border-radius: 15px;
  padding: 0.9rem 1rem;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FFD400;
  }
` 

const NagativeButtonStyle = styled.button`
  background-color: #F3F3F3;
  border: 1px solid #CDCDCD;
  border-radius: 15px;
  padding: 0.7rem 1.1rem;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FF9D3C;
  }
` 