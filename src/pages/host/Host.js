import React from "react";
import { Outlet } from "react-router-dom";
import HostNav from "./HostNav";

export default function Host() {
  return (
    <main className="host-main" style={{ alignItems: "center" }}>
      <div
        className="host-container"
        style={{
          width: "min(500px,100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <HostNav />
        <Outlet />
      </div>
    </main>
  );
}






