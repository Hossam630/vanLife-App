import React from 'react'
import './styles/Home.css'
import {Link} from 'react-router-dom'

export default function Home(){

    return(
        <main className='home-main'>
            <div className='content-container'>
            <h1>You got the travel plans, we got the travel vans.</h1>
            <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
            <Link to="/Vans"> <button>find your van</button></Link>
            </div>
        </main>
    )
}