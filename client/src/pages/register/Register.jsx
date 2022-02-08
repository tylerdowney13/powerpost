import './register.css';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/modal/Modal';

export default function Register() {
    const navigate = useNavigate();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const [picture, setPicture] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    

    const handleClick = async (e) => {
        e.preventDefault();

        var userExists = null;

        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match");
        } else {
            if (!picLoading) {
                const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                profilePicture: picture,
            }
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                await axios.post("/auth/register", user)
                .then(res => userExists = res.data)
                console.log(userExists);
                if (userExists === 11000) {
                    setModalIsOpen(true);
                    return;
                } else {
                    navigate('/login');
                }
            }
        }
    }

    const postDetails = (pic) => {
        setPicLoading(true);
        
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "powerpost");
            data.append("cloud_name", "powerpost");
            fetch("https://api.cloudinary.com/v1_1/powerpost/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    const pictureData = data.url.toString();
                    setPicture(pictureData);
                    console.log(pictureData);
                    console.log(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
            } else {
                alert("Please choose a .jpeg or .png")
            }
            setPicLoading(false);
            return;
    }

    return (
        <div>
            <div className="register">
                <div className="registerWrapper">
                    <div className="registerLeft">
                        <h3 className="registerLogo">POWERPOST</h3>
                        <span className="registerDesc">Lift Together</span>
                    </div>
                    <div className="registerRight">
                        <form className="registerBox" onSubmit={handleClick}>
                            <input placeholder="Username" className="registerInput" ref={username} required/>
                            { modalIsOpen && <Modal text="Username already exists" onConfirm={closeModalHandler} />}
                            <input placeholder="Email" type="email" className="registerInput" ref={email} required/>
                            <input placeholder="Password" type="password" className="registerInput" minLength="6" ref={password} required/>
                            <input placeholder="Repeat Password" type="password" className="registerInput" minLength="6" ref={passwordAgain} required/>
                            <div className="registerFileInputBox">
                                <label className="registerFileInputBoxLabel" htmlFor="profilePicture">Profile Picture: </label>
                                <input className="registerFileInput" type="file" accept="image/jpeg image/png" onChange={(e) => postDetails(e.target.files[0])} />
                            </div>
                            <button className="registerButton" type="submit">Sign Up</button>
                            <div className="loginBottomButton">
                                <Link to="/login">
                                    <button className="loginRegisterButton">Login to Account</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
