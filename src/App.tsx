import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import MangerSignUp from "./pages/manager/ManagerSignUp";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <MangerSignUp />
      </Layout>
    </>
  )
}

export default App;