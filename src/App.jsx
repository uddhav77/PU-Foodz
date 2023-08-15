import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/ContextReducer";
import UserInfo from "./pages/Admin/UserInfo";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminCategories from "./pages/Admin/AdminCategories";
import OrderInfo from "./pages/Admin/OrderInfo";
import AdminMenu from "./pages/Admin/AdminMenu";
import Update from "./pages/Admin/Update";
import AddMenu from "./pages/Admin/AddMenu";
import Home from "./pages/userUI/Home";
import Order from "./pages/userUI/Order";
import Menu from "./pages/userUI/Menu";
import ContactUs from "./pages/userUI/ContactUs";
import UserDetails from "./pages/userUI/UserDetails";
import Detail from "./pages/userUI/Detail";
import RegisterPage from "./pages/userUI/RegisterPage";
import LoginPage from "./pages/userUI/LoginPage";
import ForgetPassword from "./pages/userUI/ForgetPassword";
import ResetPassword from "./pages/userUI/ResetPassword";
import OrderTracking from "./pages/userUI/OrderTracking";

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
            <Route path="/orderinfo" element={<OrderInfo />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/adminmenu" element={<AdminMenu />} />
            <Route path="/admincategories" element={<AdminCategories />} />
            <Route path="/addmenu" element={<AddMenu />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
