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
        <header className="modern-header">
            <div className="nav-container">
                <Link to="/" className="logo-link">
                    <div className="logo">
                        <span className="logo-icon">💪</span>
                        <span className="logo-text">Workout Buddy</span>
                    </div>
                </Link>
                <nav className="nav-menu">
                    {user && ( // when its null we get a null error
                        <div className="user-section">
                            <div className="user-info">
                                <div className="user-avatar">
                                    {user.email.charAt(0).toUpperCase()}
                                </div>
                                <span className="user-email">{user.email}</span>
                            </div>
                            <button className="logout-btn" onClick={handleClick}>
                                <span className="btn-icon">🚪</span>
                                Logout
                            </button>
                        </div>
                    )

                    }
                    {!user && (
                        <div className="auth-links">
                            <Link to="/login" className="auth-link login-link">Login</Link>
                            <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
                        </div>
                    )}

                </nav>
            </div>
        </header >
    )
}

export default NavBar
