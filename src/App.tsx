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
export const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  setAuthUser: () => {},
  setToken: () => {},
  token: null,
});

function App(): JSX.Element {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const authContextProps = {
    authUser,
    setAuthUser,
    setToken,
    token,
  };

  console.log(authUser);

  useEffect(() => {
    AuthEndPoint.loggedIn().then((response) => {
      const { message, data: user } = response;
      if (message === "success") {
        setAuthUser(user as AuthUser);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={authContextProps}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
