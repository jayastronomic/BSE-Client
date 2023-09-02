import { JSX } from "react";
import {
  createBrowserRouter as CBR,
  createRoutesFromElements as CRFE,
  Outlet as Content,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import AppWrapper from "./AppWrapper";
import SideNav from "./components/SideNav";

function App(): JSX.Element {
  const router = CBR(
    CRFE(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

const Root = () => {
  return (
    <AppWrapper>
      <Content />
      <SideNav />
    </AppWrapper>
  );
};

export default App;
