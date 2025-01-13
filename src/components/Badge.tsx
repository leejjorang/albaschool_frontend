import styled from "styled-components";

interface BadgeProps {
  message: string | number;
}

const Badge: React.FC<BadgeProps> = ({message}) => {
  return (
    <BadgeStyle>
      {message}
    </BadgeStyle>
  )
}

export default Badge;


const BadgeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF9D3C;
  color: white;
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 0.8rem
`