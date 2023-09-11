import { JSX } from "react";
import {
  createBrowserRouter as CBR,
  createRoutesFromElements as CRFE,
  Outlet as Content,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home/Home";
import AppWrapper from "./AppWrapper";
import SideNav from "./components/SideNav";
import SignUp from "./pages/SignUp/SignUp";

const queryClient = new QueryClient();

function App(): JSX.Element {
  const router = CBR(
    CRFE(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route index element={<SignUp />} />
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
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
