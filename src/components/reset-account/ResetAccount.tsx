import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./reset-account.scss"

export default function ResetAccount() {
    const navigate = useNavigate();

    function onSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        event.preventDefault();
        navigate("/login");
    }

    return (
        <div className="reset-account">
            <form action="" onSubmit={onSubmit}>
                <div className="form">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Your email" />
                </div>

                <p style={{
                    textAlign: "center"
                }}>
                    <button className='btn-reset'>Reset password</button>
                </p>
            </form>
        </div>
    );
}
