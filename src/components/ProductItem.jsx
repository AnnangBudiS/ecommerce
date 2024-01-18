import { useContext } from "react";
import { currencyFormatter } from "../utils/Formatting";
import { CartContext } from "../context/CartContext";

import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  const CartCtx = useContext(CartContext);

  function handleAddCart() {
    CartCtx.addItem(product);
  }

  return (
    <li className="w-40 md:w-48">
      <article className="shadow rounded-md">
        <Link to={`/products/${product.id}/detail`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-32 w-full object-cover rounded-t-md"
          />
        </Link>
        <div className="p-2 text-sm">
          <h2>{product.title}</h2>
          <p className="flex items-center gap-2 text-orange-500 my-2">
            <span>
              <FaStar />
            </span>
            <span>{product.rating}</span>
          </p>
          <p className="font-semibold">
            {currencyFormatter.format(product.price)}
          </p>
          <p className="mt-2">
            <button
              onClick={handleAddCart}
              className="bg-gray-700 w-full py-1 rounded text-gray-50 hover:bg-gray-600"
            >
              Add to cart
            </button>
          </p>
        </div>
      </article>
    </li>
  );
}
