import React from "react"
import { Link, defer, Await, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { BsStarFill } from "react-icons/bs"
import "./styles/generalHost.css"

 export async function loader() {
    const hostID = localStorage.getItem("userID")
    const vans = getHostVans(hostID)
    return defer({ vans }) 

} 

export default function Dashboard() {
    const loaderData = useLoaderData()

    
    return (
        <>
            <section className="host-dashboard-earnings" style={{width:"100%"}}>
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews" style={{width:"100%"}}>
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans" style={{width:"100%"}}>
                <div className="top" style={{marginBottom:"40px"}}>
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                <React.Suspense fallback={<h3>Loading...</h3>}>
                    { <Await resolve={loaderData.vans}>{renderVanElements}</Await> }
                </React.Suspense>
            </section>
        </>
    )
}

function renderVanElements(vans) {
    if(!vans.length){
        return <h1>No vans to list yet</h1>
    }
    const hostVansEls = vans.map((van) => (
        <div className="host-van-single" key={van.id}>
            <img src={van.imageUrl} alt={`Photo of ${van.name}`}/>
            <div className="host-van-info">
                <h3>{van.name}</h3>
                <p>${van.price}/day</p>
            </div>
            <Link to={`vans/${van.id}`} style={{flexGrow:"1", textAlign:"right", padding:"0 30px"}}>View</Link>
        </div>
    ))

    return (
        <div className="host-vans-list">
            <section>{hostVansEls}</section>
        </div>
    )
}