import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import WritePost from "./pages/manager/WritePost";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <WritePost />
      </Layout>
    </>
  )
}

export default App;