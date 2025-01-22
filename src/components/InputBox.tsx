import styled from 'styled-components';

interface InputProps {
  id: string;
  type: 'text'|'number'|'password'|'email'|'tel';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  width?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputBoxProps extends InputProps {
  title: string;
  titleWidth?: number;
}

export const Input: React.FC<InputProps> = ({id, type, placeholder, disabled, required, width , value, onChange}) => {
  return(
    <InputStyle style={{width: `${width}%`}}
      id={id}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      value= {value}
      onChange={onChange}
    />
  )
}

export const InputBox: React.FC<InputBoxProps> = ({title, titleWidth, id, type, placeholder, disabled, required, width}) => {
  return (
    <InputBoxStyle>
      <p style={{width: `${titleWidth}%`}}>{title}</p>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        width={width}
      />
    </InputBoxStyle>  
  )
}


const InputStyle = styled.input`
  font-size: 1rem;
  padding: 0.6rem 0.5rem;
  border: 1px solid #CDCDCD;
  border-radius: 10px;

  &:focus {
    outline: none;
    border: 1px solid #FFD400;
  }
`

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