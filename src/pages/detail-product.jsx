import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { FaStar } from "react-icons/fa";
import { currencyFormatter } from "../utils/Formatting";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const cartCtx = useContext(CartContext);

  function handleAddCart() {
    cartCtx.addItem(detail);
  }

  useEffect(() => {
    setIsLoading(true);
    async function getDetail() {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        const data = await response.data;
        setDetail(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }
    getDetail();
  }, [id]);

  return (
    <div className="flex flex-col px-2 md:flex-row gap-5 justify-center pt-20">
      {isLoading && <>Loading...</>}
      <div className="md:w-96">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="w-full shadow rounded-lg"
        >
          {detail?.images.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item} className="w-full h-96 object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-5 md:mb-0">
        <h2 className="text-2xl font-bold text-gray-700">{detail?.title}</h2>
        <div className="flex gap-2">
          <span>{detail?.stock}</span>.
          <span className="font-bold">{detail?.brand}</span>.
          <span className="flex items-center gap-2 text-orange-500">
            <FaStar />
            {detail?.rating}
          </span>
        </div>
        <div className="my-3 max-w-md">
          <p className="font-bold text-gray-700 ">Description</p>
          <p>{detail?.description}</p>
        </div>
        <div>
          <p className="text-2xl font-bold">
            {currencyFormatter.format(detail?.price)}
          </p>
        </div>
        <div className="mt-10">
          <button
            onClick={handleAddCart}
            className="text-gray-100 bg-gray-700 py-2 px-4 rounded hover:bg-gray-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
