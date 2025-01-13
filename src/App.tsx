import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import StaffRegisterStore from "./pages/staff/RegisterStore";
import ManagerRegisterStore from "./pages/manager/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/common/Home";
import StaffUser from "./pages/staff/User";
import ManagerUser from "./pages/manager/User";
import UserEdit from "./pages/common/UserEdit";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/register/staff" element={<StaffRegisterStore />} />
          <Route path="/store/register/manager" element={<ManagerRegisterStore />} />
          <Route path="/user/staff" element={<StaffUser />} />
          <Route path="/user/manager" element={<ManagerUser />} />
          <Route path="/user/edit" element={<UserEdit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;