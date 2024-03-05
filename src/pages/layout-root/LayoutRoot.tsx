import React, {useEffect} from "react";
import './layout-root.scss'
import { Outlet, useNavigate } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
export default function LayoutRoot(){
    const navigate = useNavigate()

    useEffect(function () {
        const userToken = localStorage.getItem("userToken")
        if (!userToken) {
            navigate("/login")
        } else {
            navigate("/")
        }
    }, [])
    return(
        <div>
            <Header/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}