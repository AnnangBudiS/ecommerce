import { useEffect, useState } from "react";
import axios from "axios";

import ProductItem from "../components/ProductItem";
import bannerImg from "../assets/images/barner-product.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";

export default function Product() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setLoading] = useState(true);

  function handleOnChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleAllProduct() {
    setSelectedCategory("");
  }

  async function getProduct() {
    setLoading(true);
    try {
      const respose = await axios.get("https://dummyjson.com/products");
      setProduct(respose.data.products);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getProductByCategory() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      setProduct(response.data.products);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getCategory() {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCategory();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      getProduct();
    } else {
      getProductByCategory();
    }
    setLoading(false);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 lg:px-80">
      <figure className="mt-5">
        <img src={bannerImg} alt="banner promotion " />
      </figure>

      <div className="my-5">
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={2}
          breakpoints={{
            500: {
              slidesPerView: 2,
            },
            756: {
              slidesPerView: 4,
            },
          }}
          scrollbar={{ hide: true }}
          modules={[Scrollbar]}
          className="p-4"
        >
          <SwiperSlide className="shadow rounded-full p-2 mr-2 text-center">
            <button onClick={handleAllProduct}>All</button>
          </SwiperSlide>
          {categories?.map((item, index) => (
            <SwiperSlide
              key={index}
              className="shadow rounded-full p-2 mr-2 text-center"
            >
              <button onClick={handleOnChange} value={item}>
                {item}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="h-1 w-full bg-pink-500"></div>
      <div className=" mt-5">
        {isLoading ? (
          <div>Loading data ... </div>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  mt-5 mb-10 gap-5">
            {" "}
            {product.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
