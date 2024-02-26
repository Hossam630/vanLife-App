import React from "react";
import {
  Link,
  NavLink,
  useParams,
  Outlet,
  useOutletContext,
  useLoaderData,
} from "react-router-dom";
import "./styles/HostVanDetails.css";

export default function HostVanDetails() {
  const typeColors = {
    simple: "#E17654",
    rugged: "#115E59",
    luxury: "#161616",
  };
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
  };

  const idParam = useParams().id;
  const hostVan = useLoaderData(idParam);

  return (
    <div className="hostVanDetails-container">
      <Link
        to=".."
        relative="path"
        style={{ marginBottom: "20px", textDecoration: "underline" }}
      >
        ← back to host vans
      </Link>
      <div className="host-van-container">
        <img src={hostVan.imageUrl} />
        <div>
          <div
            className="van-type-container"
            style={{ backgroundColor: typeColors[hostVan.type?.toLowerCase()] }}
          >
            {hostVan.type}
          </div>
          <h1>{hostVan.name}</h1>
          <div className="van-price-container">
            <h2>${hostVan.price}</h2>
            <p>/day</p>
          </div>
        </div>
      </div>
      <nav className="hostVanDetailsNav">
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          to=""
          end
        >
          Details
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          to="pricing"
        >
          Pricing
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : null)}
          to="photos"
        >
          Photos
        </NavLink>
      </nav>
      <Outlet context={{ hostVan }} />
    </div>
  );
}

export function Details() {
  const { hostVan } = useOutletContext();
  return (
    <div className="details-info-container">
      <p>
        <span>Name:</span> {hostVan.name}
      </p>
      <p>
        <span>Category:</span> {hostVan.type}
      </p>
      <p>
        <span>Description:</span> {hostVan.description}
      </p>
      <p>
        <span>Visibility:</span> public
      </p>
    </div>
  );
}
export function Pricing() {
  const { hostVan } = useOutletContext();
  return (
    <div className="price-info-container">
      <h1>
        ${hostVan.price}
        <span>/day</span>
      </h1>
    </div>
  );
}
export function Photos() {
  const { hostVan } = useOutletContext();

  return <img src={hostVan.imageUrl} width="100px" />;
}
