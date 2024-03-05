import axios from "axios"
import { SyntheticEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./register.scss"

export default function RegisterPage() {

    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()

    async function onSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault()
        if (!username?.length || !password?.length) {
            setError("Please fullfill data!")
            return
        } else {
            navigate("/login")
        }
        const data = await axios({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                username: username,
                password: password
            })
        })
    }

    return (
        <div className="login">
            <h1 className="heading">Login Page</h1>
            <br />
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="username">User Name</label>
                        <input type="text" name="username" id="username" placeholder="Your user name" value={username} onChange={function (event) {
                            setUsername(event.target.value)
                            setError("")
                        }} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Your password" value={password} onChange={function (event) {
                            setPassword(event.target.value)
                            setError("")
                        }} />
                    </div>
                    <p className="error">{error}</p>
                    <p>
                        <button className="btn-sign-in">Register</button>
                    </p>
                </form>
            </div>

        </div>
    )
}