import './share.css';
import { PermMedia, Cancel } from '@material-ui/icons';
import { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const dotenv = require("dotenv");
dotenv.config();

const uploadURL = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Share() {
    const { user } = useContext(AuthContext);
    
    const desc = useRef();

    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: "",
        }

        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "powerpost");
            data.append("cloud_name", "powerpost");
            fetch(uploadURL, {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(async (data) => {
                    const pictureData = data.url.toString();
                    newPost.img = pictureData;
                    try {
                        await axios.post("/posts", newPost);
                        console.log("Posted")
                        window.location.reload();
                    } catch (err) {
                        console.log(err)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const cancelUpload = () => {
        setFile(null);
        window.location.reload();
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" />
                    <input placeholder={`What's on your mind ${user.username}?`} className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancelImg" onClick={() => cancelUpload()}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <label htmlFor="file" className="shareOptions" >
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo</span>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg" style={{display: "none"}} onChange={(e) => {setFile(e.target.files[0])}}/>
                        </div>
                    </label>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
