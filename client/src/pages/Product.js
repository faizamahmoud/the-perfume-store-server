import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
// import clipLoader - react spinners 

export default function StarshipPage({}) {

const params = useParams();
const perfumeId = `${params.perfumeId}` //from the path that we're setting (/:id) log params
const [starShip, setStarShip] = useState({}) //returns an object 
    

        useEffect(() => {
            const url = `https://swapi.dev/api/starships/`
            fetch(url + shipId)
                .then((res) => res.json())
                .then((data) => setStarShip(data))
                .catch(console.log)
    
    
            //useEffect hook with fetch to get data from API
        }, []);
    
    //this will render as long as bird is null
if (!starShip) {
    return <p>Loading Starship information ...</p>
  }
  
    
        return (
            <section className="container" >
                <>
             <h3>{starShip.name}</h3>
             <p>{starShip.model}</p>
             <p>{starShip.manufacturer}</p>
             </>
            </section>
        )
    }
    
    
    
    


