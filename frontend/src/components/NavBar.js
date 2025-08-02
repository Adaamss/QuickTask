import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/"> Workout Buddy</Link>
                <nav>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>

                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavBar