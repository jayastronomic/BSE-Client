import AppWrapper from "./AppWrapper";
import {
  Outlet as Content,
  createRoutesFromElements as CRFE,
  createBrowserRouter as CBR,
  Route,
} from "react-router-dom";
import SideNav from "./components/SideNav";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

const Root = () => {
  return (
    <AppWrapper>
      <Content />
      <SideNav />
    </AppWrapper>
  );
};

const App = () => {
  return (
    <>
      <Nav />
      <Content />
    </>
  );
};
export const router = CBR(
  CRFE(
    <Route path={"/"} element={<Root />}>
      <Route index element={<Home />} />
      <Route path={"/"} element={<App />}>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
      </Route>
    </Route>
  )
);
