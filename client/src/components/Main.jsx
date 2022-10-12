import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";


const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/match" element={<Match />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/profile" element={<Profile />} />

            </Routes>
        </main>
    )
}

export default Main;