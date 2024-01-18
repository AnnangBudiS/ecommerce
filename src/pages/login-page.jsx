import loginImg from "../assets/images/login.jpg";
import FormLogin from "../components/FormLogin";

export default function LoginPage() {
  return (
    <div
      className="flex items-center h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${loginImg})` }}
    >
      <div className="w-1/2 flex flex-col text-gray-700 h-screen justify-center items-center">
        <h2 className="text-5xl font-bold ">HEllO ...!</h2>
        <h1 className="text-6xl font-bold my-2 ">Wellcome Back</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          aperiam.
        </p>
      </div>
      <div className="w-1/2">
        <div className="rounded-l-[60px] bg-gray-100 flex items-center justify-center h-screen shadow-xl">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
