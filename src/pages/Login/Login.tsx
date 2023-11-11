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

  useEffect(() => {
    console.log(authUser);
  }, []);

  return (
    <div
      className={
        "flex flex-col h-full justify-center items-center bg-[#f1efe7]"
      }
    >
      <div className="spartan text-3xl text-amber-800">brownSugar</div>
      <div className="neotoric text-xl text-amber-800">Esthetics </div>
      <form onSubmit={handleSubmit} className={"flex flex-col space-y-4"}>
        <div className={"flex flex-col"}>
          <label>Email</label>
          <input
            className={""}
            type={"text"}
            name={"email"}
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={"flex flex-col"}>
          <label>Password</label>
          <input
            className={""}
            type={"password"}
            name={"password"}
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className={"flex"}>
          <button
            type={"submit"}
            className={"bg-amber-950 text-white w-full rounded"}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
