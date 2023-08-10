import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Menu from "./pages/Menu";
import Detail from "./pages/Detail";
import { CartProvider } from "./components/ContextReducer";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./ResetPassword";
import ContactUs from "./pages/ContactUs";
import OrderTracking from "./pages/OrderTracking";
import UserDetails from "./pages/UserDetails";
import UserInfo from "./pages/Admin/UserInfo";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminCategories from "./pages/Admin/AdminCategories";

function App() {
  return (
    <div className="bg-gray-200">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/userDetails" element={<UserDetails />} />

            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/track/:orderId" element={<OrderTracking />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admincategories" element={<AdminCategories />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
