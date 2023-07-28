import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
