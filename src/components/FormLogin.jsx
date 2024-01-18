import axios from "axios";
import Input from "./UI/Input";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { MdWavingHand } from "react-icons/md";

export default function FormLogin() {
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const { username, password } = Object.fromEntries(fd);
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      })
      .then(async (res) => {
        if (res.status === 200) {
          window.location.href = "/";
        }
      });
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Login</h2>
        <span className="text-orange-400 text-2xl">{<MdWavingHand />}</span>
      </div>

      <div className="flex gap-4 my-5 text-4xl items-center">
        <button className="p-2 rounded-full hover:bg-gray-200/50 hover:shadow">
          <FcGoogle />
        </button>
        <button className="text-blue-600 p-2 rounded-full hover:bg-gray-200/50 hover:shadow">
          <IoLogoFacebook />
        </button>
      </div>
      <div className="flex items-center gap-4 my-2 ">
        <span className="text-gray-400">atau</span>
        <div className="w-full h-[2px] bg-gray-300"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          id="username"
          type="text"
          placeholder="username"
        />
        <Input
          type="password"
          label="Password"
          id="password"
          placeholder="password"
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <p>remember me</p>
        </div>
        <button className="mt-4 px-5 py-2 bg-gray-700 text-gray-50 font-semibold rounded hover:bg-gray-600">
          Login
        </button>
      </form>
    </div>
  );
}
