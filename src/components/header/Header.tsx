import React, {useEffect, useState} from "react";
import './header.scss'
import { request } from "http";
import { Link, useNavigate } from "react-router-dom"


export default function Header(){
    const [token, setToken] = useState<string | null>()
    const navigate = useNavigate()

    useEffect(function () {
        const userToken = localStorage.getItem("userToken")
        setToken(userToken)
    }, [])

    function handleSignout() {
        localStorage.removeItem("userToken")
        navigate("/login")
    }

    return(
        <div className="header">
            <div >
                <Link to="/">
                    <img src={require("../../images/vti-logo.png")} alt="" width={150}/>
                </Link>
            </div>

            <div >
                <div className="header-login">
                    {
                        !token && <>
                        <Link to='login'> 
                            <button className="login">Login</button>
                        </Link>
                        </>
                    }

                    {
                        token && <>
                        <button className="sign-out" onClick={handleSignout}>Sign out</button>
                        <p className="avatar">
                            <img src={require("../../images/avatar.png")} alt="" width={50} height={50}/>
                        </p>
                        </>
                    }

                </div>

                
            </div>
        </div>
    )
}