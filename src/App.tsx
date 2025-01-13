import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import StaffRegisterStore from "./pages/staff/RegisterStore";
import ManagerRegisterStore from "./pages/manager/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/common/Home";
import ManagerSchedule from "./pages/manager/schedule/ManagerSchedule";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Notice from "./pages/common/Notice";
import ShopList from "./pages/common/ShopList";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/store/register/staff"
              element={<StaffRegisterStore />}
            />
            <Route
              path="/store/register/manager"
              element={<ManagerRegisterStore />}
            />
            <Route path="/schedule/manager" element={<ManagerSchedule />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/shop-list" element={<ShopList />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
