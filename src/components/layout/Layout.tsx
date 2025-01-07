import styled from "styled-components";
import Bottom from "./Bottom";
import Header from "./Header";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutStyle>
      <Header />
      <MainStyle>
        {children}
      </MainStyle>
      <Bottom />
    </LayoutStyle>
  );
}

export default Layout;


const LayoutStyle = styled.div`
  width: 100vw;
  height: 100vh;
`
const MainStyle = styled.div`
  margin-top: 3.5rem;
  margin-bottom: 4.5rem;
`
