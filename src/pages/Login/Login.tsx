import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { AlertBoxContext, AuthContext } from "../../App";
import AlertBox from "../../components/AlertBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthUser from "../../interfaces/AuthUser";
import AuthEndPoint from "../../network/endpoints/AuthEndpoint";
import { useNavigationState } from "../../AppWrapper";

const Login = () => {
  const { loginAlert, setLoginAlert } = useContext(AlertBoxContext);
  const navigate = useNavigate();
  const { toggleOpen } = useNavigationState();
  const { setAuthUser } = useContext(AuthContext);
  const [user, setUser] = useState<AuthUser>({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthEndPoint.login(user).then((response) => {
      const { data, status, token } = response;
      if (status === "success" && token && data) {
        localStorage.setItem("token", token);
        setAuthUser(data);
        toggleOpen();
        navigate("/");
      }
    });
  };

  useEffect(() => {
    return () => {
      setLoginAlert(false);
    };
  }, [setLoginAlert]);

  return (
    <motion.div
      className={"flex flex-col h-full pt-12 px-20 items-center bg-white"}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "circOut" }}
        className="w-full max-w-[30rem]"
      >
        {loginAlert && <AlertBox />}
        <div className="font-semibold text-2xl">Log in</div>
        <form onSubmit={handleSubmit} className={"flex flex-col mt-10 w-full"}>
          <div className="flex flex-col space-y-8">
            <div className={"flex flex-col space-y-2"}>
              <label className="text-sm text-gray-600">EMAIL</label>
              <input
                placeholder="name@example.com"
                className={
                  "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
                }
                type={"email"}
                name={"email"}
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className={"flex flex-col space-y-2"}>
              <label className="text-sm text-gray-600">PASSWORD</label>
              <input
                placeholder="Password"
                className={
                  "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
                }
                type={"password"}
                name={"password"}
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={"flex mt-10"}>
            <button
              type="submit"
              className={"bg-gray-200 text-gray-400 w-full rounded py-3"}
            >
              LOG IN
            </button>
          </div>{" "}
          <div className="text-center text-xs mt-4">
            Don't have an account?{" "}
            <Link
              className="text-blue-400 font-bold hover:underline"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
