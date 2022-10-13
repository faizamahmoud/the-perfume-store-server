import { Route, Routes } from "react-router-dom";
import Perfumes from "../pages/Perfumes"
import Product from "../pages/Product"
import React, { useState, useEffect } from 'react';

  


const Main = () => {

    const url = 'http://perfume-store-fm.herokuapp.com/inventory';
    const [data, setData] = useState({});


    return (
        <main>
            <Routes>
                {/* <Route path="/" element={<Perfumes url={url} data={data} setData={setData}/>} /> */}
                <Route path="/" element={<Perfumes/>} />
                <Route path="/:id" element={<Product/>}/>
            </Routes>
        </main>
    )
}

export default Main;