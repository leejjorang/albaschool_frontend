import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import ManagerEduPost from "./pages/manager/ManagerEduPost";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <ManagerEduPost />
      </Layout>
    </>
  )
}

export default App;