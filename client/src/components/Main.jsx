// import { Link } from "react-router-dom"
// import '../styles/Header.scss'
import Home from "../pages/Home";

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/" element={<Register />} />
            <Route path="/" element={<Match />} />
            <Route path="/" element={<Basket />} />
            <Route path="/" element={<Profile />} />

        </Routes>
    )
}

export default Main;