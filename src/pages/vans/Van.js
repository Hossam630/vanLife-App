import React from "react";
import "./styles/Van.css";
import { Link, useLocation } from "react-router-dom";

export default function Van({van,typeColor}) {

 const location = useLocation()

  return (
     <Link
      to={`${van.id}`}
      state={{searchParams:location.search, type:van.type,typeColor:typeColor }}
      aria-label={`view details on ${van.name} which is priced at ${van.price}`}
    >
      <div className="van-container">
        <img src={van.imageUrl} alt = {`image of ${van.name} van`}/>
        <div className="van-info-container">
          <h2 className="van-name">{van.name}</h2>
          <div className="van-price-container">
           <h2>${van.price}</h2>
            <p>/day</p>
          </div>
        </div>
        <div
          className="van-type-container"
          style={{ backgroundColor: typeColor }}
        >
          {van.type}
        </div>
      </div>
    </Link> 
  );
}
