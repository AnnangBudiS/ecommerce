import { useContext } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function Navbar() {
  const cartCtx = useContext(CartContext);

  const qty = cartCtx.items.reduce(
    (totalQTY, item) => totalQTY + item.quantity,
    0
  );

  return (
    <nav className="p-4 flex justify-between items-center container mx-auto">
      <Link to="/">
        <h2 className="text-xl font-bold">Ecommerce</h2>
      </Link>
      <ul className="flex gap-4 items-center font-semibold text-gray-400">
        <Link to="cart">
          <li className="relative p-2 rounded-full hover:bg-gray-300/40">
            <FaShoppingBag />
            {cartCtx.items.length > 0 ? (
              <span className="absolute bottom-5 left-4 bg-red-500 w-4 text-center text-white text-xs rounded-full">
                {qty}
              </span>
            ) : null}
          </li>
        </Link>
        {/* <Link to="/user-login">
          <li>
            <button className="hover:text-gray-700">Login/Sign Up</button>
          </li>
        </Link> */}
      </ul>
    </nav>
  );
}
