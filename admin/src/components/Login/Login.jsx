import { backendURL } from "../../App"
import axios from "axios"
import { toast } from "react-toastify"
import "./login.css"
import React, { useState } from "react"
export default function Login({setToken}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleForm = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendURL + '/api/user/admin', { email, password })
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
            // console.log(response);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    return (
        <>
            <div className="adminLoginPage">
                <div className="loginBox">
                    <h2>Admin Panel</h2>
                    <form onSubmit={handleForm} className="adminLoginForm">
                        <li className="adminLoginLi">
                            <label htmlFor="email">Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="email" placeholder="your@email.com" />
                        </li>
                        <li className="adminLoginLi">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" type="password" placeholder="Enter your password" />
                        </li>
                        <button type="submit" id="login">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}