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
import OrderInfo from "./pages/Admin/OrderInfo";
import AdminMenu from "./pages/Admin/AdminMenu";
import Update from "./pages/Admin/Update";
import AddMenu from "./pages/Admin/AddMenu";

function App() {
  return (
    <div className="bg-gray-200 w-fit">
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
