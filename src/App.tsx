import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import ManagerEduList from "./pages/manager/ManagerEduList";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <ManagerEduList />
      </Layout>
    </>
  )
}

export default App;