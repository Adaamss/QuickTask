import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const { login, error, isLoading, succes } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlelogin = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handlelogin}>
            <h3>login</h3>
            <label>Email </label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Login</button>
            {error ? <div className="error">{error}</div> : succes && <div className="succces">Logged in succsefully</div>}

        </form>
    )
}
export default Login