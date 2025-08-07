import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Navigate } from "react-router-dom"


const Signup = () => {
    const { signup, error, isLoading, succes } = useSignup()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">💪</div>
                    <h2 className="auth-title">Join Workout Buddy</h2>
                    <p className="auth-subtitle">Start your fitness journey today</p>
                </div>
                <form className="auth-form signup" onSubmit={handleSignup}>
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
                            placeholder="Create a password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="auth-button" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loading-spinner">⏳</span>
                        ) : (
                            <>
                                <span className="btn-icon">🚀</span>
                                Sign Up
                            </>
                        )}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                    {succes && <div className="success-message">Signed up successfully! 🎉</div>}
                </form>
                <div className="auth-footer">
                    <p>Already have an accountss? <Navigate to="/login" className="auth-link-text" /> Loginss here</p>
                </div>
            </div>
        </div >
    )
}

export default Signup
