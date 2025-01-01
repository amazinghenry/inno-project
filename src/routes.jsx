import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Store from "./pages/store/Store";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Dashboard from "./pages/dashboard/UserDashboard";
import Profile from "./pages/dashboard/profile/Profile";
import AddressForm from "./pages/dashboard/addressform/AddressForm";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PasswordReset from "./pages/passwordreset/PasswordReset";
import AdminDashboard from "./admin/admindashboard/AdminDashboard";
import AddProduct from "./admin/addproduct/AddProduct";
import AdminRoute from "./components/adminroute/AdminRoute";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import ContactUs from "./pages/contact/ContactUs";
import NoPage from "./pages/404/NoPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:productId" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Protected User Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addresses"
        element={
          <ProtectedRoute>
            <AddressForm />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default AppRoutes;
