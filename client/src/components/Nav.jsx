import { Link } from "react-router-dom"
import '../styles/Header.scss'

const Nav = () => {
    return (
        <div className='header'>
            <nav>
                <ul className="ul-list">
                    <div className="list">
                        <li> <Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/fragrancefinder'>Quiz</Link></li>

                    </div>
                </ul>
                <ul className="ul-list">
                    <div className="list">
                        <li><Link to='/login'>Login</Link> </li>
                        <li><Link to='/logout'>Logout</Link></li>
                        <li><Link to='/register'>Sign up</Link></li>
                        <li><Link to='/account'>Profile</Link></li>
                        <li><Link to='/basket'>Basket</Link></li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;