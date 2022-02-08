import "./comment.css";
import { format } from 'timeago.js';
import { useNavigate } from 'react-router';

const Comment = ({comment}) => {

  const navigate = useNavigate();


  const gotoUserProfile = () => {
    navigate(`/profile/${comment.username}`)
  }


  return (
  <div className="comment">
    <div className="commentprofilePictureContainer">
      <img className="commentProfilePicture" src={comment.userProfilePicture} alt="" onClick={gotoUserProfile}/>
      <span className="commentUsername" onClick={gotoUserProfile}>{comment.username}</span>
      <span className="commentDate">{format(comment.commentDate)}</span>
    </div>
    <div className="commentContainer">
      <div className="commentTextContainer">
        {comment.comment}
      </div>
    </div>
  </div>
  )
};

export default Comment
