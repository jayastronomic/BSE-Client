import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { AlertBoxContext, AuthContext } from "../../App";
import AlertBox from "../../components/AlertBox";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
type NewUser = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Login = () => {
  const { authUser } = useContext(AuthContext);
  const { loginAlert, setLoginAlert } = useContext(AlertBoxContext);
  const location = useLocation();

  const [user, setUser] = useState<NewUser>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { email, password } = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: NewUser) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const response =  await AuthEndpoint.register({email, password})
    //  console.log(response)
  };

  // useEffect(() => {
  //   console.log(authUser);
  // }, []);

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
