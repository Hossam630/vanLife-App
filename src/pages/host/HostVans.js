import React from "react";
import "./styles/HostVans.css";
import { Await, Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";

export function loader() {
  const vansListPromise = getHostVans(localStorage.getItem("userID"));
  return { vansListPromise };
}

export default function HostVans() {
  const { vansListPromise } = useLoaderData();

  return (
    <div className="hostVans-container">
      <h1 style={{marginBottom:"30px"}}>Here are your listed vans</h1>
        <React.Suspense fallback={(<h2 style={{width:"100%",textAlign:"center"}}>Loading host vans...</h2>)}>
      <Await resolve={vansListPromise}>
        {data=>displayHostVans(data)}
      </Await>
      </React.Suspense>
    </div>
  );
}

function displayHostVans(vansList) {
  if(!vansList.length){
    return <h1>No vans to list yet...</h1>
}
  const vanItems = vansList?.map((van) => {
    return (
      <Link to={`/Host/vans/${van.id}`}>
        <div className="hostVan-container">
          <img src={van.imageUrl} />
          <div>
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    );
  });
  return vanItems;
}
