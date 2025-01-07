import styled from "styled-components";
import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        "test"
      </Layout>
    </>
  )
}

export default App;