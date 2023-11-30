import { useState, FormEvent, useContext } from "react";
import { AuthContext } from "../../App";
import AuthUser from "../../interfaces/AuthUser";
import AuthEndPoint from "../../network/endpoints/AuthEndpoint";
import { Link, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import Profile from "../../interfaces/Profile";
import ProfileDetails from "./ProfileDetails";
import { ThreeDots } from "react-loader-spinner";
import ProfileEndPoint from "../../network/endpoints/ProfileEndpoint";
import { motion } from "framer-motion";

const SignUp = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<AuthUser>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [newProfile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isAllInputsDirty, setIsAllInputsDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState({
    errorMessage: "",
    isError: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tabs = [
    <UserDetails
      {...newUser}
      setNewUser={setNewUser}
      setDisabled={setDisabled}
      emailError={emailError}
    />,
    <ProfileDetails {...newProfile} setProfile={setProfile} />,
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthEndPoint.create(newUser).then((res) => {
      const { status, data: token } = res;
      if (status === "success") {
        localStorage.setItem("token", token as string);
        setToken(token as string);
        console.log(newProfile);
        ProfileEndPoint.create(newProfile).then((response) => {
          const { status } = response;
          if (status === "success") navigate("/");
        });
      }
    });
  };

  const emailTaken = () => {
    setIsLoading(true);
    AuthEndPoint.emailAlreadyExists({ email: newUser.email! }).then(
      (response) => {
        const { status } = response;
        if (status === "success") {
          setTabIndex((prev) => prev + 1);
          setIsLoading(false);
        } else {
          const { errors, isError } = response;
          setEmailError({ isError, errorMessage: errors[0] });
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div className={"flex flex-col h-full pt-12 px-20 items-center bg-white"}>
      {/* <div className="spartan text-3xl text-amber-800">brownSugar</div>
      <div className="neotoric text-xl text-amber-800">Esthetics </div> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "circOut" }}
        className="w-full max-w-[30rem]"
      >
        <div className="font-semibold text-2xl">Create Your Account</div>
        <form onSubmit={handleSubmit} className={"flex flex-col w-full mt-10"}>
          {tabs[tabIndex]}
          <div className={"flex mt-10"}>
            {isLoading ? (
              <ThreeDots
                color="gray"
                radius="1"
                wrapperClass="flex justify-center w-full py-3"
                height={23}
                width={70}
              />
            ) : tabIndex === 0 ? (
              <button
                disabled={disabled}
                onClick={emailTaken}
                type="button"
                className={
                  disabled
                    ? "bg-gray-200 text-gray-400 w-full rounded py-3"
                    : "bg-black text-white w-full rounded py-3"
                }
              >
                CONTINUE
              </button>
            ) : (
              <button
                disabled={disabled}
                type="submit"
                className={
                  disabled
                    ? "bg-gray-200 text-gray-400 w-full rounded py-3"
                    : "bg-black text-white w-full rounded py-3"
                }
              >
                CREATE ACCOUNT
              </button>
            )}
          </div>
          {tabIndex === 0 ? null : (
            <div className="flex mt-4">
              <button
                onClick={() => setTabIndex((prev) => prev - 1)}
                type="submit"
                className={"bg-black text-white w-full rounded py-3"}
              >
                BACK
              </button>
            </div>
          )}
          <div className="text-center text-xs mt-4">
            Already have an account?{" "}
            <Link
              className="text-blue-400 font-bold hover:underline"
              to="/login"
            >
              Log in
            </Link>
          </div>
        </form>
        <div className="text-center text-gray-500 text-xs mt-8">
          By creating an account, you agree to our Terms of Service and have
          read and understood the Privacy Policy
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
