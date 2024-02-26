import React from "react"
import { useRouteError } from "react-router"

export default function Error(){
    const error = useRouteError();
    return(
        <main style={{justifyContent:"center"}}>
            <h1>Error {error.status}</h1>
            <h3 style={{textAlign:"center"}}>{error.message}</h3>
            <h1>☠️</h1>
        </main>
    )
}