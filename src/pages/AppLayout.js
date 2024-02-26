import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router-dom';

export default function AppLayout(){

    return(
        <>
       <Nav />
       <Outlet/>
       <footer style={
            {backgroundColor: "#252525",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
        }
       } >
            Ⓒ 2022 #VANLIFE
        </footer>
       </>
    );
}