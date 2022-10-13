
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

function Perfumes() {

    const url = 'http://perfume-store-fm.herokuapp.com/inventory'

    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const dataa = await response.json();

            return dataa;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchData()
            .then(setData)
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
    }, []);



    return (

        <section className="container" >
            <div className="card">
                <div className="card-image">

                    {data.map((perfume, idx, results) => {
                        // let perfume.key = idx;
                        // const {name, brand} = perfume
                        return (
                            <Link>{perfume.name}</Link>

    // <Link to={`${idx}`}> <h1>{perfume.name}</h1> 
    // </Link>

                            
                        )
                    })}

                </div>
            </div>
        </section>
    )


}




export default Perfumes;







                            //  {/* <Link><img src={perfume.image} alt={perfume.name} /> </Link> */}   
                                    
                                
                            // </div>
                            // <div class="card-title">
                            // <h3>{perfume.name}</h3>
                            //     </div>
                            // {/* <h1>{perfume.brand}</h1> */}