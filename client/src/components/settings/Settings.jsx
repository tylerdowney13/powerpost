import './settings.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Settings() {
    const {user} = useContext(AuthContext);

    // PROFILE PICTURE
    const [profilePicture, setProfilePicture] = useState();
    const [picLoading, setPicLoading] = useState(false);

    const handleClickProfilePicture = async (e) => {
        e.preventDefault();
        const currentUser = user._id;

        if (!picLoading) {
            await axios.put(`/users/${currentUser}`, {userId: currentUser, profilePicture: profilePicture})
            .then(res => console.log(res))
        }
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData.profilePicture)
        userData.profilePicture = profilePicture;
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.reload();
    }

    const postDetailsProfilePicture = (pic) => {
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
                setProfilePicture(pictureData);
                console.log(pictureData);
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


    // COVER PICTURE
    const [coverPicture, setCoverPicture] = useState();
    const [coverPictureLoading, setCoverPictureLoading] = useState(false);

    const handleClickCoverPicture = async (e) => {
        e.preventDefault();
        const currentUser = user._id;

        if (!coverPictureLoading) {
            await axios.put(`/users/${currentUser}`, {userId: currentUser, coverPicture: coverPicture})
            .then(res => console.log(res))
        }

        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData.coverPicture)
        userData.coverPicture = coverPicture;
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.reload();
    }

    const postDetailsCoverPicture = (pic) => {
        setCoverPictureLoading(true);

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
                setCoverPicture(pictureData);
                console.log(pictureData);
                setCoverPictureLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setCoverPictureLoading(false);
            });
        } else {
            alert("Please choose a .jpeg or .png")
        }
        setCoverPictureLoading(false);
        return;
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <p className="settingsTitle">Profile Settings</p>
                <hr />
                <div className="settingsProfilePicture">
                    <div className="settingsProfilePictureTitle">
                        <p className="settingsProfilePictureTitleText">Profile Picture:</p>
                        <hr />
                    </div>
                    <img className="settingsCurrentProfilePicture" src={user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" />
                    <div className="settingsCurrentProfilePictureUpdateButtonContainer">
                        {profilePicture ? <button onClick={handleClickProfilePicture}>Update Profile Picture</button> : <input type="file" accept="image/jpeg image/jpg image/png" onChange={(e) => postDetailsProfilePicture(e.target.files[0])}/>}
                    </div>
                </div>
                <div className="settingsCoverPicture">
                    <div className="settingsCoverPictureTitle">
                        <p className="settingsCoverPictureTitleText">Cover Picture:</p>
                        <hr />
                    </div>
                    <img className="settingsCurrentCoverPicture" src={user.coverPicture? user.coverPicture : "https://th.bing.com/th/id/R.8600e4f3c25740f15d0705907ea2d97b?rik=EUp%2flJry31g%2fRg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fPhYXMFa.jpg&ehk=AQJuODNIdHBWjga9gImMlZ29%2bzLAAa28XDfJNJfZjpQ%3d&risl=&pid=ImgRaw&r=0"} alt="" />
                    <div className="settingsCurrentCoverPictureUpdateButtonContainer">
                        {coverPicture ? <button onClick={handleClickCoverPicture}>Update Cover Picture</button> : <input type="file" accept="image/jpeg image/jpg image/png" onChange={(e) => postDetailsCoverPicture(e.target.files[0])}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
