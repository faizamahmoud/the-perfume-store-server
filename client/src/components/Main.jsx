import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register"


const Main = () => {
    return (
        <main>
            <h1>Hello World</h1>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </main>
    )
}

export default Main;