import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/"> Workout Buddy</Link>
                <p>test</p>
            </div>
        </header>
    )
}

export default NavBar