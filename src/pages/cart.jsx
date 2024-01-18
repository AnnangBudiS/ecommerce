import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { currencyFormatter } from "../utils/Formatting";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import ProductItem from "../components/ProductItem";
import Modal from "../components/UI/Modal";
import Input from "../components/UI/Input";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const [openModal, setOpenModal] = useState("");
  const [topProduct, setTopProduct] = useState([]);
  const navigate = useNavigate();

  async function getTopProduct() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const data = await response.data.products;
      setTopProduct(data.filter((item) => item.rating > 4.6));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTopProduct();
  }, []);

  const subTotal = cartCtx.items.reduce(
    (subTotal, item) => subTotal + item.quantity * item.price,
    0
  );

  const totalQTY = cartCtx.items.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0
  );

  const taxValue = 5;

  function handleCheckout() {
    setOpenModal("open");
  }

  function handleHideModal() {
    setOpenModal("");
  }

  function handleFinish() {
    cartCtx.clearCart();
    setOpenModal("");
    navigate("/");
    return alert("success");
  }

  return (
    <>
      <Modal open={openModal === "open"} onClose={openModal === ""}>
        <form onSubmit={handleFinish} className="p-5 shadow-xl rounded-xl">
          <h2 className="mb-2 font-semibold text-xl">Billing Info</h2>
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="e.g john Doe"
          />
          <Input
            label="Phone Number"
            id="phone"
            type="text"
            placeholder="e.g +12 1234 1234 1234"
          />
          <div className="flex items-center gap-2">
            <Input
              label="Address"
              type="text"
              id="address"
              placeholder="Your address"
            />
            <Input
              label="Post Code"
              type="text"
              id="post-code"
              placeholder="Post Code"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2 text-xl">Credit Card Info</h2>
            <div>
              <Input
                label="CardHolder Name"
                type="text"
                placeholder="e.g John Doe"
              />
              <div className="flex item-center gap-2">
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="324-424-132-322"
                />
                <Input label="CVC Number" type="text" placeholder="324" />
              </div>
              <div className="flex item-center gap-2">
                <Input label="Exp. Month" type="text" placeholder="12" />
                <Input label="Exp.Year" type="text" placeholder="2023" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleHideModal}
              className="text-center mt-5 py-2 px-4 bg-gray-700 text-gray-50 hover:bg-gray-600 "
            >
              Cancel
            </button>
            <button className="text-center mt-5 py-2 px-4 bg-gray-700 text-gray-50 hover:bg-gray-600 ">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {cartCtx.items.length > 0 ? (
        <div className="container mx-auto p-5">
          <h2 className="text-xl text-gray-700 font-bold">Cart ({totalQTY})</h2>
          <p className="my-2">Your Detail Cart</p>
          <div className="flex flex-col lg:flex-row gap-3">
            <ul className="flex flex-col gap-4 lg:w-3/4">
              {cartCtx.items.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  onIncrease={() => cartCtx.addItem(item)}
                  onDecrease={() => cartCtx.removeItem(item.id)}
                />
              ))}
            </ul>
            <ul className="p-4 rounded-xl lg:w-1/4">
              <li className="bg-gray-50 p-4 rounded-xl shadow">
                <h2 className="text-xl font-bold text-gray-700 mb-5">
                  Subtotal
                </h2>
                <div className="flex items-center justify-between py-5 border-t">
                  <p className="font-semibold">subtotal ({totalQTY})</p>
                  <p>{currencyFormatter.format(subTotal)}</p>
                </div>
                <div className="flex items-center justify-between py-5 border-t">
                  <p className="font-semibold">Tax</p>
                  <p>{currencyFormatter.format(taxValue)}</p>
                </div>
                <div className="flex items-center justify-between py-5 border-t">
                  <p className="font-semibold">Total</p>
                  <p>{currencyFormatter.format(subTotal + taxValue)}</p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={handleCheckout}
                    className="bg-gray-700 w-full p-2 rounded text-gray-50 font-semibold hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          {" "}
          <h2 className="text-3xl font-semibold text-gray-700">
            No Product In cart...
          </h2>
          <Link to="/">
            <button className="px-4 py-2 bg-gray-700 font-semibold text-gray-50 mt-5 hover:bg-gray-600">
              Go Shop
            </button>
          </Link>
        </div>
      )}
      <div className="container mx-auto px-2 lg:px-32">
        <h2 className="text-2xl font-bold text-gray-700 pb-5 border-b">
          Top Product
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="py-10"
        >
          {topProduct.map((item) => (
            <SwiperSlide key={item}>
              <ProductItem product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
