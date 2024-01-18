import { Route, Routes } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import Product from "../pages/product";
import Cart from "../pages/cart";
import LoginPage from "../pages/login-page";
import ProductDetail from "../pages/detail-product";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Product />} />
        <Route path="products/:id/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="/user-login" element={<LoginPage />} />
    </Routes>
  );
}
