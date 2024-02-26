import React from 'react'
import {NavLink} from 'react-router-dom'

export default function HostNav(){
    const activeStyle = {
        fontWeight:'bold',
        textDecoration:'underline',

    }

    return(
        <nav className='host-nav'>
            <NavLink style={({isActive})=>isActive?activeStyle:null} to='.' end >Dashboard</NavLink>
            <NavLink style={({isActive})=>isActive?activeStyle:null} to='income'>Income</NavLink>
            <NavLink style={({isActive})=>isActive?activeStyle:null} to='reviews'>Reviews</NavLink>
            <NavLink style={({isActive})=>isActive?activeStyle:null} to='vans'>Vans</NavLink>
        </nav>
    )
}