import './createarticle.css'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const dotenv = require("dotenv");
dotenv.config();

const uploadURL = process.env.REACT_APP_PUBLIC_FOLDER;

const CreateArticle = ({ user }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const titleRef = useRef();
    const descriptionRef = useRef();
    const contentsRef = useRef();

    const submitArticleHandler = (e) => {
        e.preventDefault();

        const userId = user._id;
        const username = user.username;
        const profilePicture = user.profilePicture;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const contents = contentsRef.current.value;

        const newArticle = {
            userId: userId,
            username: username,
            profilePicture: profilePicture,
            title: title,
            description: description,
            img: "",
            contents: contents,
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
                    newArticle.img = pictureData;
                    try {
                        await axios.post("/articles/newarticle", newArticle);
                        console.log("Article Posted")
                        window.location.reload();
                    } catch (err) {
                        console.log(err)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        navigate("/articles")
    }
    
    return (
        <div className="articlesCreateContainer">
            <div className="articlesCreateBox">
                <div className="articlesCreateTitleContainer">
                    <span className="articlesCreateTitle">Create Article</span>
                </div>
                <hr />
                <div className="articleCreateFormContainer">
                    <form className="articlesCreateForm" onSubmit={submitArticleHandler}>
                        <label className="articlesCreateFormLabel">Title: </label>
                        <textarea className="articlesCreateFormTitleTextarea" height="1" maxLength="100" ref={titleRef}/>
                        <label className="articlesCreateFormLabel">Description: </label>
                        <textarea className="articlesCreateFormDescriptionTextarea" rows="4" cols="100" maxLength="400" ref={descriptionRef}/>
                        <label className="articlesCreateFormLabel">Image: </label>
                        <input className="articlesCreateFormInputImage" type="file" id="file" accept=".jpeg, .jpg, .png" onChange={(e) => {setFile(e.target.files[0])}}/>
                        <label className="articlesCreateFormLabel">Contents: </label>
                        <textarea className="articlesCreateFormContentsTextarea" rows="36" cols="100" maxLength="3672" ref={contentsRef}/>
                        <button className="articleFormSubmitButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateArticle
