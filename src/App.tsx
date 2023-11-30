import {
  JSX,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AuthUser from "./interfaces/AuthUser";

import AuthEndPoint from "./network/endpoints/AuthEndpoint";

type AuthContextProps = {
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  token: string | null;
};

type AlertBoxContextProps = {
  setLoginAlert: Dispatch<SetStateAction<boolean>>;
  loginAlert: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  setAuthUser: () => {},
  setToken: () => {},
  token: null,
});

export const AlertBoxContext = createContext<AlertBoxContextProps>({
  setLoginAlert: () => {},
  loginAlert: false,
});

function App(): JSX.Element {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const authContextProps = {
    authUser,
    setAuthUser,
    setToken,
    token,
  };

  const alertBoxContextProps = {
    loginAlert,
    setLoginAlert,
  };

  // useEffect(() => {
  //   try {
  //     AuthEndPoint.loggedIn().then(({ data }) => {
  //       setAuthUser(data as AuthUser);
  //     });
  //   } catch (e) {
  //     console.log(here);
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={authContextProps}>
      <AlertBoxContext.Provider value={alertBoxContextProps}>
        <RouterProvider router={router} />
      </AlertBoxContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
