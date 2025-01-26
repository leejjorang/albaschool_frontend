import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import StaffRegisterStore from "./pages/staff/RegisterStore";
import ManagerRegisterStore from "./pages/manager/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import SelectRole from "./pages/common/SelectRole";
import StaffSchedule from "./pages/staff/schedule/StaffSchedule";
import ProtectedRoute from "./components/RouteProtection/ProtectedRoute";
import AuthProtected from "./components/RouteProtection/AuthProtected";

const queryClient = new QueryClient();

function App() {
  const managerRoutes = [
    { path: "/manager", element: <ManagerSchedule /> },
    { path: "/store/register/manager", element: <ManagerRegisterStore /> },
    { path: "/user/manager", element: <ManagerUser /> },
    { path: "/edulist/manager", element: <ManagerEduList /> },
    { path: "/edupost/manager", element: <ManagerEduPost /> },
    { path: "/post/manager", element: <WritePost /> },
  ];

  const staffRoutes = [
    { path: "/staff", element: <StaffSchedule /> },
    { path: "/store/register/staff", element: <StaffRegisterStore /> },
    { path: "/user/staff", element: <StaffUser /> },
    { path: "/edulist/staff", element: <StaffEduList /> },
    { path: "/edupost/staff", element: <StaffEduPost /> },
  ];
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup/role" element={<SelectRole />} />
              <Route path="/signup/manager" element={<ManagerSignUp />} />
              <Route path="/signup/staff" element={<StaffSignUp />} />
              
              {/* 로그인이 필요한 경우 */}
              <Route element={<AuthProtected />}>
                <Route path="/user/edit" element={<UserEdit />} />
                <Route path="/user/changepwd" element={<ChangePwd />} />
                <Route path="/chats" element={<ChatList />} />
                <Route path="/chats/:id" element={<ChatRoom />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/shoplist" element={<ShopList />} />

                {/* Manager Routes */}
                {managerRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <ProtectedRoute role="manager">
                        {route.element}
                      </ProtectedRoute>
                    }
                  />
                ))}

                {/* Staff Routes */}
                {staffRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <ProtectedRoute role="staff">
                        {route.element}
                      </ProtectedRoute>
                    }
                  />
                ))}
              </Route>
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
