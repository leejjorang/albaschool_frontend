import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import Login from "./pages/common/Login";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Login />
      </Layout>
    </>
  )
}

export default App;