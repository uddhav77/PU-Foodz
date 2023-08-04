import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Menu from "./pages/Menu";

import Detail from "./pages/Detail";
import { CartProvider } from "./components/ContextReducer";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <div className="bg-gray-200">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
