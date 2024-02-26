import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Route, redirect } from "react-router";
import AppLayout from "./pages/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Host  from "./pages/host/Host";
import HostVans, { loader as hostVansLoader } from "./pages/host/HostVans";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetails from "./pages/vans/VanDetails";
import HostVanDetails, {
  Details,
  Pricing,
  Photos,
} from "./pages/host/HostVanDetails";
import  {getVan, getHostVan } from "./api";
import Error from "./components/Error";
import Login, { loginAction } from "./pages/Login";
import Dashboard,{loader as dashboardLoader} from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import requireAuth from "./utils/requireAuth";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />} errorElement={<Error/>}>
        <Route index element={<Home />} />

        <Route
          path="host"
          element={<Host />}
          loader={({ request }) =>
            requireAuth(JSON.parse(localStorage.getItem("loggedIn")), request)
          }
        >
          <Route index element={<Dashboard />} loader={dashboardLoader} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} loader={hostVansLoader} />

          <Route
            path="vans/:id"
            element={<HostVanDetails />}
            loader={({ params }) => getHostVan(params.id)}
          >
            <Route index element={<Details />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="photos" element={<Photos />} />
          </Route>
        </Route>

        <Route path="about" element={<About />} />

        <Route
          path="vans"
          errorElement={<Error />}
          element={<Vans />}
          loader={vansLoader}
        />

        <Route
          path="vans/:id"
          element={<VanDetails />}
          loader={({ params }) => getVan(params.id)}
        />
        <Route path="login" element={<Login />} action={loginAction} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
