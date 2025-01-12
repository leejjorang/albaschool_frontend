import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import StaffRegisterStore from "./pages/staff/RegisterStore";
import ManagerRegisterStore from "./pages/manager/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/common/Home";
import ManagerSchedule from "./pages/manager/ManagerSchedule";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

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
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
