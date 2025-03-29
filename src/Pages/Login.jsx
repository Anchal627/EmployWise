import logo from "../images/logo.jpeg";
import image from "../images/Login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderCircle } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);

      navigate("/users");
      setTimeout(() => {
        toast.success("Login successfull!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }, 600);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full w-full bg-gradient-to-r from-sky-300 to-pink-300 flex justify-center items-center">
      <ToastContainer />
      <div className="h-[560px] w-80 rounded-md sm:w-[715px] md:w-[815px] shadow-2xl shadow-slate-700 flex flex-col sm:flex-row bg-white">
        <img src={image} alt="login" className="w-96 rounded-md" />
        <div className=" w-80 h-96 sm:mt-20 shadow-lg flex flex-col items-center sm:ml-8 ">
          <img src={logo} alt="logo" className="h-14 w-14 mt-7" />
          <form className="space-y-4 mt-10 text-center" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-72 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              <span className="flex justify-center">
                {loading ? <LoaderCircle /> : "Login"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
