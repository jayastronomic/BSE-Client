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
import Services from "./pages/Services/Services";
import Book from "./pages/Book/Book";
import Schedule from "./pages/Schedule/Schedule";
import { useContext } from "react";
import { AuthContext } from "./App";

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
        <Route path={"/services"} element={<Services />} />
        <Route path={"/book"} element={<Book />} />
        <Route path={"/book/:id"} element={<Schedule />} />
      </Route>
    </Route>
  )
);
