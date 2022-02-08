import './sidebar.css';
import { RssFeed, FitnessCenter, EmojiEvents, Equalizer, MenuBook, Settings, ExitToApp, Create } from "@material-ui/icons";
import CloseFriend from '../closeFriend/CloseFriend';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar() {
    const { user: currentUser } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);

    const logout = () => {
        localStorage.setItem("user", null);
        window.location.reload();
    }
    
    useEffect(() => {  
    if (currentUser) {
        const getFriends = async () => {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                const friendList = await axios.get("/users/friends/" + currentUser._id);
                setFriends(friendList.data);
            } catch (err) {
            console.log(err);
            }
        };
        getFriends();
    }
  }, [currentUser]);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/powerfeed" className="sidebarLink">
                            <RssFeed className="sidebarIcon" />
                            <span className="sidebarListItemText">PowerFeed</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/toppowerposts" className="sidebarLink">
                            <EmojiEvents className="sidebarIcon" />
                            <span className="sidebarListItemText">Top PowerPosts</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/liftlog" className="sidebarLink">
                            <Equalizer className="sidebarIcon" />
                            <span className="sidebarListItemText">LiftLog</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/onermcalculator" className="sidebarLink">
                            <FitnessCenter className="sidebarIcon" />
                            <span className="sidebarListItemText">1RM Calculator</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/articles" className="sidebarLink">
                            <MenuBook className="sidebarIcon" />
                            <span className="sidebarListItemText">Articles</span>
                        </Link>
                    </li>
                    {currentUser.isAdmin && <li className="sidebarListItem">
                        <Link to="/articles/create" className="sidebarLink">
                            <Create className="sidebarIcon" />
                            <span className="sidebarListItemText">Create Article</span>
                        </Link>
                    </li>}
                    <li className="sidebarListItem">
                        <Link to="/settings" className="sidebarLink">
                            <Settings className="sidebarIcon" />
                            <span className="sidebarListItemText">Settings</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/login" onClick={logout} className="sidebarLink">
                            <ExitToApp className="sidebarIcon" />
                            <span className="sidebarListItemText">Logout</span>
                        </Link>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <div className="sidebarFriendsListTitleBox">
                    <span className="sidebarFriendsListTitle">Friends</span>
                </div>
                <ul className="sidebarFriendList">
                    {friends.map(u => (
                        <CloseFriend key={u.id + "friend"} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
