import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { AuthContext } from "../../App";
import AuthUser from "../../interfaces/AuthUser";
import AuthEndPoint from "../../network/endpoints/AuthEndpoint";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<AuthUser>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { email, password, passwordConfirmation } = newUser;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthEndPoint.create(newUser).then((res) => {
      const { message, data: token } = res;
      if (message === "success") {
        localStorage.setItem("token", token as string);
        setToken(token as string);
        navigate("/");
      }
    });
  };

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
        <div className={"flex flex-col"}>
          <label>Password Confirmation</label>
          <input
            className={""}
            type={"password"}
            name={"passwordConfirmation"}
            value={passwordConfirmation}
            onChange={handleChange}
          />
        </div>
        <div className={"flex"}>
          <button
            type={"submit"}
            className={"bg-amber-950 text-white w-full rounded"}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
