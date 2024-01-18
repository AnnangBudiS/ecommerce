import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import CartContextProvider from "./context/CartContext";

export default function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartContextProvider>
  );
}
