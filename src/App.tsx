import { GlobalStyle } from "./styles/global";
import Layout from "./components/layout/Layout";
import RegisterStore from "./pages/staff/RegisterStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/common/Home";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/register/staff" element={<RegisterStore />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;