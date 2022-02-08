import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove} from "@material-ui/icons";
import NewConversation from "../newConversation/NewConversation";

export default function Rightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id));

  useEffect(() => {
    if (user) {
      const getFriends = async () => {
        try {
          axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else if (!followed) {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const goToWebsite = (link) => {
    window.open(link);
  }

  const HomeRightbar = () => {
    return (
      <>
          <img className="rightbarAd" src="https://thebarbellspin.com/wp-content/uploads/2016/12/rogue-usaw.jpg" alt="" onClick={() => goToWebsite("http://www.roguecanada.ca")}/>
          <img className="rightbarAd" src="http://cdn.shopify.com/s/files/1/0550/8949/6221/files/Social-sharing-1200x628_b1090b4f-31c1-4c2b-a680-feab73ac4d2d.jpg?v=1620228124" alt="" onClick={() => goToWebsite("http://www.sbdapparel.ca")}/>
          <img className="rightbarAd" src="https://www.fit-health.ru/images/manufacturers/inzer-logo.png" alt="" onClick={() => goToWebsite("http://www.inzernet.com/")}/>      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="rightbarTop">
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
          {currentUser._id !== user._id && <NewConversation currentUser={currentUser} user={user}/>}
        </div>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        </div>
        <h4 className="rightbarTitleUserFriends">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <a href={`https://powerpost.netlify.app/#/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </a>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}