import './post.css';
import { Delete } from '@material-ui/icons';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';
import Comments from '../comments/Comments';

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {userId: currentUser._id});
        } catch (error) {
            
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }

    const deletePost = () => {
        try {
            axios.delete("/posts/" + currentUser._id + "/" + post._id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`} style={{textDecoration: "none", color: "black"}}>
                            <img className="postProfileImg" src={user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" />
                            <span className="postUsername">
                                {user.username}
                            </span>
                            <span className="postDate">{format(post.createdAt)}</span>
                        </Link>
                    </div>
                    <div className="postTopRight">
                        {currentUser._id === post.userId && 
                        <div className="postTopRightDeleteButton" onClick={deletePost}>
                            <Delete />
                        </div>}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img className="postImg" src={post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={'https://clipground.com/images/like-icon-png-7.png'} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                </div>
                <div className="postCommentSection">
                    {<Comments postid={post._id} currentUser={currentUser} />}
                </div>
            </div>
        </div>
    )
}
