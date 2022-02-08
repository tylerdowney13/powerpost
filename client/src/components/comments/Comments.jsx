import './comments.css'
import { useRef, useEffect, useState } from 'react';
import Comment from '../comment/Comment';
import axios from 'axios';

const Comments = ({postid, currentUser}) => {
    const commentText = useRef();
    

    const [comments, setComments] = useState()
    const [, updateComments] = useState();

    const postComment = async (e) => {
        e.preventDefault();

        const commentDate = Date.now()
        const commentTextValue = commentText.current.value;
        const username = currentUser.username;
        const userProfilePicture = currentUser.profilePicture;

        const commentObject = {
            commentDate: commentDate,
            username: username,
            userProfilePicture: userProfilePicture,
            comment: commentTextValue,
        }

        const res = await axios.post(`/posts/addcomment/${postid}`, commentObject);
        setComments([res.data, ...comments])
    }

    useEffect(() => {
        const getPost = async () => {
            try {
                const postData = await axios.get(`/posts/${postid}`);
                setComments(postData.data.comments.sort((c1, c2) => {return c2.commentDate - c1.commentDate}))
            } catch (error) {
                
            }
        }
        getPost();
    }, [postid, updateComments])



    return (
        <>
        <div className="commentsTitleContainer">
            <span className="commentsTitle">{comments && comments.length} {comments?.length === 1 ? "Comment" : "Comments"}</span>
        </div>
        <div className="commentsHr">
            <hr />
        </div>
        <form className="newCommentContainer" onSubmit={postComment}>
            <textarea className="newCommentTextArea" ref={commentText} maxLength="250"></textarea>
            <button type="submit" onClick={updateComments}>Comment</button>
        </form>
        <div className="commentsContainer">
            {comments && comments.map(c => (
                <Comment key={c.commentDate} comment={c}/>
            ))}
        </div>
        
        </>
    )
}

export default Comments
