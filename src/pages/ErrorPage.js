import React from 'react'
import {Link} from 'react-router-dom'

export default function ErrorPage(){
    return(
        <main style={{justifyContent:'center',textAlign:'center',padding:'50px'}}>
            <h1>Sorry, page not found or Expired</h1>
            <h1 style={{fontSize:'4rem'}}>🕵🏽</h1>
            <Link to={'.'}
                style={{
                    width:'min(100%,500px)',
                    padding:'20px',
                    fontSize:'1.5rem',
                    fontWeight:'bold',
                    color:'#FFF',
                    backgroundColor:'#FF8C38',
                    border:'none',
                    borderRadius:'5px',
                    marginTop:'20px'
    
                }}
            >
                Go to home
            </Link>
        </main>

    )
}