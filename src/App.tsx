import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import Login from "./pages/common/Login";
import SignupS from "./pages/staff/SignupS";
import SignupM from "./pages/manager/SignupM";
import ChangePwd from "./pages/common/ChangePwd";
import EduList from "./pages/manager/EduList";
import EduPost from "./pages/manager/EduPost";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        {/* <Login /> */}
        {/* <SignupS /> */}
        {/* <SignupM /> */}
        {/* <ChangePwd /> */}
        {/* <EduList /> */}
        <EduPost />
      </Layout>
    </>
  )
}

export default App;