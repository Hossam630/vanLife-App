import React from "react";
import "./styles/VanDetails.css";
import { useParams, useLoaderData,useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function VanDetails() {
  const idParam = useParams().id;
  

  const van = useLoaderData(idParam)
  const locationState = useLocation().state
  return (
    <main className="vanDetails-main">
        <div className="vanDetails-container">
          <Link to= {`..${locationState? locationState.searchParams:""}`} relative="path">
            ← back to {locationState?.searchParams?locationState.type:"all"} vans
          </Link>
          <img src={van.imageUrl} />
          <div
            className="van-type-container"
            style={{ backgroundColor: locationState?.typeColor }}
          >
            {van.type}
          </div>
          <h1>{van.name}</h1>
          <div className="price-container">
            <h2>${van.price}</h2>
            <p>/day</p>
          </div>
          <p>{van.description}</p>
          <button>Rent this van</button>
        </div>
    </main>
  );
}
