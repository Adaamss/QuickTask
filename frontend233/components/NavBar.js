import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const NavBar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()


    const handleClick = () => {
        logout()
    }
    return (
        <header>

            <div className="container">
                <Link to="/"> Workout Buddy</Link>
                <nav>
                    {user && ( // when its null we get a null error
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>
                                Logout
                            </button>
                        </div>
                    )

                    }
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>

                        </div>
                    )}

                </nav>
            </div>
        </header >
    )
}

export default NavBar