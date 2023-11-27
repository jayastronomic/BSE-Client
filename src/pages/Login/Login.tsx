import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
} from "react";
import { AuthContext } from "../../App";
type NewUser = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Login = () => {
  const { authUser } = useContext(AuthContext);

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

  return (
    <div className={"flex flex-col h-full pt-12 px-20 items-center bg-white"}>
      {/* <div className="spartan text-3xl text-amber-800">brownSugar</div>
      <div className="neotoric text-xl text-amber-800">Esthetics </div> */}
      <div className="font-semibold text-2xl">Log in</div>
      <form
        onSubmit={handleSubmit}
        className={"flex flex-col space-y-4 mt-10 w-full"}
      >
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
            CONTINUE
          </button>
        </div>{" "}
      </form>
    </div>
  );
};

export default Login;
