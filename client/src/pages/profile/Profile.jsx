import './profile.css';
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';


export default function Profile() {
    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const username = useParams().username;

    useEffect(() => {
        if (username) {
            const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data)
            setIsLoaded(true)
            }
        fetchUser();
        }
    }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.coverPicture ? user.coverPicture : "https://th.bing.com/th/id/R.8600e4f3c25740f15d0705907ea2d97b?rik=EUp%2flJry31g%2fRg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fPhYXMFa.jpg&ehk=AQJuODNIdHBWjga9gImMlZ29%2bzLAAa28XDfJNJfZjpQ%3d&risl=&pid=ImgRaw&r=0"} alt="" />
                            <img className="profileUserImg" src={user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        {isLoaded && <Rightbar user={user} />}
                    </div>
                </div>
            </div>
        </>
    )
}
