import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom';


const Login = () => {
    const { login, error, isLoading, succes } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlelogin = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">🏋️</div>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Continue your fitness journey</p>
                </div>
                <form className="auth-form login" onSubmit={handlelogin}>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            className="modern-input"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="modern-input"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="auth-button" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loading-spinner">⏳</span>
                        ) : (
                            <>
                                <span className="btn-icon">🔑</span>
                                Login
                            </>
                        )}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                    {succes && <div className="success-message">Logged in successfully! 🎉</div>}
                </form>
                <div className="auth-footer">
                    <p>
                        Don't have an account? <Link to="/signup" className="auth-link-text">Sign up here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login
