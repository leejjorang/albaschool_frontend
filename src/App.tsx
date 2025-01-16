import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import StaffRegisterStore from "./pages/staff/RegisterStore";
import ManagerRegisterStore from "./pages/manager/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/common/Home";
import StaffUser from "./pages/staff/User";
import ManagerUser from "./pages/manager/User";
import UserEdit from "./pages/common/UserEdit";
import ChatList from "./pages/common/ChatList";
import ChatRoom from "./pages/common/ChatRoom";
import ManagerSchedule from "./pages/manager/schedule/ManagerSchedule";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Notice from "./pages/common/Notice";
import ShopList from "./pages/common/ShopList";
import Login from "./pages/common/Login";
import StaffSignUp from "./pages/staff/StaffSignUp";
import ManagerSignUp from "./pages/manager/ManagerSignUp";
import StaffEduList from "./pages/staff/StaffEduList";
import ManagerEduList from "./pages/manager/ManagerEduList";
import ChangePwd from "./pages/common/ChangePwd";
import StaffEduPost from "./pages/staff/StaffEduPost";
import ManagerEduPost from "./pages/manager/ManagerEduPost";
import WritePost from "./pages/manager/WritePost";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route path="/" element={<ManagerSchedule />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup/staff" element={<StaffSignUp />} />
              <Route path="/signup/manager" element={<ManagerSignUp />} />

              <Route
                path="/store/register/staff"
                element={<StaffRegisterStore />}
              />
              <Route
                path="/store/register/manager"
                element={<ManagerRegisterStore />}
              />

              <Route path="/user/staff" element={<StaffUser />} />
              <Route path="/user/manager" element={<ManagerUser />} />
              <Route path="/user/edit" element={<UserEdit />} />
              <Route path="/user/changepwd" element={<ChangePwd />} />

              <Route path="/shoplist" element={<ShopList />} />
              <Route path="/edulist/staff" element={<StaffEduList />} />
              <Route path="/edulist/manager" element={<ManagerEduList />} />
              <Route path="/edupost/staff" element={<StaffEduPost />} />
              <Route path="/edupost/manager" element={<ManagerEduPost />} />
              <Route path="/post/manager" element={<WritePost />} />

              <Route path="/chats" element={<ChatList />} />
              <Route path="/chats/:id" element={<ChatRoom />} />

              <Route path="/notice" element={<Notice />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
