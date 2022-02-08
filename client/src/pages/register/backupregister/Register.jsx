import './register.css';
import {useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const handleClick = async (e) => {
        e.preventDefault();

        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3 className="loginLogo">POWERPOST</h3>
                        <span className="loginDesc">Lift Together</span>
                    </div>
                    <div className="loginRight">
                        <form className="loginBox" onSubmit={handleClick}>
                            <input placeholder="Username" className="loginInput" ref={username} required/>
                            <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
                            <input placeholder="Password" type="password" className="loginInput" minLength="6" ref={password} required/>
                            <input placeholder="Repeat Password" type="password" className="loginInput" minLength="6" ref={passwordAgain} required/>
                            <button className="loginButton" type="submit">Sign Up</button>
                            <span className="loginForgot">Forgot Password?</span>
                            <div className="loginBottomButton">
                                <Link to="/login">
                                    <button className="loginRegisterButton" >Login to Account</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
