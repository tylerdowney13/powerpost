import './closeFriend.css'
import { Link } from 'react-router-dom';

export default function CloseFriend({user}) {

    return (
        <li className="sidebarFriend">
            <Link className="sidebarFriend" to={`/profile/${user.username}`} onClick={window.location.reload} style={{textDecoration: "none", color: "black"}}>
                <img className="sidebarFriendImg" src={user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" />
                <span className="sidebarFriendName">{user.username}</span>
            </Link>
        </li>
    )
}
