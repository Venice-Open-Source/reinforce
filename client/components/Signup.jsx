import React, { useState, Component } from "react";
import { NavLink } from "react-router-dom";

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="auth-form">
            <div className="form-control">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="form-actions">
                <NavLink to="/login">Already Have An Account?</NavLink>
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    const user = { email, password }
                    // console.log(user);
                    props.signupHandler(user)
                }}>SignUp</button>
            </div>
        </form>
    )
}

export default Signup;