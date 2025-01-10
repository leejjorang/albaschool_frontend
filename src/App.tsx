import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import StaffRegisterStore from "./pages/staff/RegisterStore";
import ManagerRegisterStore from "./pages/manager/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/common/Home";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/register/staff" element={<StaffRegisterStore />} />
          <Route path="/store/register/manager" element={<ManagerRegisterStore />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;