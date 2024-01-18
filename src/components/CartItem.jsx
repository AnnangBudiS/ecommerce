import { currencyFormatter } from "../utils/Formatting";

export default function CartItem({ product, onDecrease, onIncrease }) {
  return (
    <li className="bg-gray-300 p-5 rounded-xl shadow">
      <article className="flex flex-col gap-4 md:flex-row md:items-center justify-between rounded-xl bg-gray-50 p-5">
        <div className="flex items-center gap-5 w-1/2 font-bold text-gray-700">
          <img src={product.thumbnail} alt={product.title} className="w-20" />
          <h2 className="max-w-md">{product.title}</h2>
        </div>
        <div className="flex w-1/2 justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onDecrease}
              className="w-5 text-gray-50 font-semibold bg-gray-400 rounded hover:bg-gray-300 "
            >
              -
            </button>
            <span className="font-semibold">{product.quantity}</span>
            <button
              onClick={onIncrease}
              className="w-5 text-gray-50 font-semibold bg-gray-400 rounded hover:bg-gray-300 "
            >
              +
            </button>
          </div>
          <p className="font-semibold">
            {currencyFormatter.format(product.price * product.quantity)}
          </p>
        </div>
      </article>
    </li>
  );
}
