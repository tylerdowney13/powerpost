import './articledisplay.css'
import { Link } from 'react-router-dom';

const ArticleDisplay = ({articleData}) => {
    const dateData = new Date(articleData.createdAt);
    const dateCreated = dateData.getDate() + "/" + dateData.getMonth() + "/" + dateData.getFullYear();

    const contentData = articleData.contents;
    const splitContentData = contentData.split("\n");

    return (
        <div className="articleDisplay">
            <div className="articleDisplayAuthorInfoContainer">
                <Link to={`/profile/${articleData.username}`} className="articleDisplayAuthorInfoContainer">
                    <div className="articleDisplayAuthorInfoProfilePictureContainer">
                        <img className="articleDisplayAuthorInfoProfilePicture" src={articleData.profilePicture} alt="" />
                    </div>
                    <div className="articleDisplayAuthorInfoUsernameContainer">
                        <span className="articleDisplayAuthorInfoUsernameSpan">{articleData.username}</span>
                    </div>
                </Link>
            </div>
            <div className="articleDisplayTitleContainer">
                <span className="articleDisplayTitleSpan">{articleData.title}</span>
            </div>
            <div className="articleDisplayDateCreatedContainer">
                <span className="articleDisplayDateCreatedSpan">{dateCreated}</span>
            </div>
            <div className="articleDisplayImageContainer">
                <img className="articleDisplayImage" src={articleData.img} alt=""/>
            </div>
            <div className="articleDisplayContentContainer">
                {splitContentData.map(p => (
                    <div key={Math.random()}>
                        <p className="articleDisplayContentParagraph">{p}</p>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}

export default ArticleDisplay
