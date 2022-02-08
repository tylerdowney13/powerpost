import './login.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginCall } from '../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import Modal from '../../components/modal/Modal';
import axios from 'axios';

export default function Login() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function closeModalHandler() {
        setModalIsOpen(false);
    }

    const email = useRef();
    const password = useRef();

    const { isFetching, dispatch } = useContext(AuthContext);

    async function handleClick (e) {
        e.preventDefault();

        try {
            axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
            const userEmail = await axios.get(`/users/email/${email.current.value}`);
            if (userEmail.data.email) {
                loginCall({email: email.current.value, password: password.current.value}, dispatch);
            } else  {
                setModalIsOpen(true);
            }
        } catch (error) {
            console.log(error)
            setModalIsOpen(true);
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
                            <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
                            { modalIsOpen && <Modal text="Invalid email address" onConfirm={closeModalHandler} />}
                            <input placeholder="Password" type="password" className="loginInput" ref={password} minLength="6" required/>
                            <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="primary" size="15px"/> 
                            ) : (
                                "Login"
                            )}</button>
                            
                        </form>
                        <div className="loginBottomButton">
                                <Link to="/register">
                                    <button className="loginRegisterButton">Create Account</button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
