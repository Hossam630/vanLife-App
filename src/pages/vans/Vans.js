import React from "react";
import "./styles/Vans.css";
import Van from "./Van";
import { Await, defer, useLoaderData } from "react-router";
import { useSearchParams } from "react-router-dom";
import getVans from "../../api";

export function loader() {
  const vansPromise = getVans();
  return defer({ vansPromise });
}

export default function Vans() {
  const { vansPromise } = useLoaderData();

  return (
    <main className="vans-main">
      <h1 style={{ marginBottom: "20px" }}>explore our Vans options.</h1>
      <React.Suspense
        fallback={
          <h1
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              transform: "translateY(20vh)",
            }}
          >
            Loading vans...
          </h1>
        }
      >
        <Await resolve={vansPromise}>
          {(vans) => <RenderVansElements data={vans} />}
        </Await>
      </React.Suspense>
    </main>
  );
}

function RenderVansElements({ data }) {
  const typeColors = {
    simple: "#E17654",
    rugged: "#115E59",
    luxury: "#161616",
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const typesArray = data.map((van) => van.type);
  const vanTypes = typesArray.filter(
    (type, index) => index === typesArray.indexOf(type)
  );
  const filterBtns = vanTypes.map((type) => (
    <button
      style={{
        backgroundColor:
          type == searchParams.get("type") ? typeColors[type] : "#FFEAD0",
        color: type == searchParams.get("type") ? "#FFF" : "#000",
      }}
      onClick={() =>
        setSearchParams((searchParams) => {
          return { ...searchParams, type: type };
        })
      }
    >
      {type}
    </button>
  ));
  const vans = data.map((van, index) => {
    return searchParams.get("type") ? (
      van.type === searchParams.get("type") && (
        <Van van={van} typeColor={typeColors[van.type]} />
      )
    ) : (
      <Van van={van} typeColor={typeColors[van.type]} />
    );
  });

  return (
    <>
      <div className="filterBtns-container">
        {filterBtns}{" "}
        <button
          className={"clearFiltersBtn"}
          onClick={() => setSearchParams({})}
        >
          clear filters
        </button>
      </div>
      <div className="vans-container">{vans}</div>
    </>
  );
}
