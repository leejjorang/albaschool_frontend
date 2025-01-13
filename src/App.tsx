import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import WritePost from "./pages/manager/WritePost";
import EduList from "./pages/manager/EduList";
import EduPost from "./pages/manager/EduPost";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        {/* <EduList /> */}
        {/* <EduPost /> */}
        <WritePost />
      </Layout>
    </>
  )
}

export default App;