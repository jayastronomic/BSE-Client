import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import AuthUser from "../../interfaces/AuthUser";
type UserDetailsProps = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  setNewUser: Dispatch<SetStateAction<AuthUser>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  emailError: { isError: boolean; errorMessage: string };
};

const UserDetails = ({
  email,
  password,
  passwordConfirmation,
  setNewUser,
  setDisabled,
  emailError,
}: UserDetailsProps) => {
  const checkFields = useCallback(() => {
    if (email && password && passwordConfirmation) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, passwordConfirmation, setDisabled]);

  useEffect(() => {
    checkFields();
  }, [email, password, passwordConfirmation, checkFields]);

  useEffect(() => {}, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className={"flex flex-col space-y-2"}>
        {emailError.isError && (
          <div className="text-xs text-red-600">{emailError.errorMessage}</div>
        )}
        <label className="text-sm text-gray-600">EMAIL*</label>
        <input
          placeholder="name@example.com"
          className={`border-b  pb-3 focus:outline-none focus:border-black transition ${
            emailError.isError ? "border-red-600" : "border-gray-300"
          }`}
          type={"email"}
          name={"email"}
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className={"flex flex-col space-y-2"}>
        <label className="text-sm text-gray-600">PASSWORD*</label>
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
      <div className={"flex flex-col space-y-2"}>
        <label className="text-sm text-gray-600">PASSWORD CONFIRMATION*</label>
        <input
          placeholder="Password Confirmation"
          className={
            "border-b border-gray-300 pb-3 focus:outline-none focus:border-black transition"
          }
          type={"password"}
          name={"passwordConfirmation"}
          value={passwordConfirmation}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UserDetails;
