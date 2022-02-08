import './articlepreview.css';
import { Link } from 'react-router-dom';

const ArticlePreview = ({articleData}) => {
    const dateData = new Date(articleData.createdAt);
    const dateCreated = dateData.getDate() + "/" + dateData.getMonth() + "/" + dateData.getFullYear();

    return (
        <div className="articlePreviewContainer">
            <div className="articlePreviewBox">
                <div className="articlePreviewTitleContainer">
                    <span className="articlePreviewTitle">{articleData.title}</span>
                </div>
                <div className="articlePreviewDateCreatedContainer">
                    <span className="articlePreviewDateCreatedSpan">{dateCreated}</span>
                </div>
                <div className="articlePreviewImageContainer">
                    <img className="articlePreviewImage" src={articleData.img} alt="" />
                </div>
                <div className="articlePreviewAuthorInfoContainer">
                    <Link to={"/profile/" + articleData.username} className="articlePreviewAuthorInfoContainer">
                        <div className="articlePreviewAuthorInfoProfilePictureContainer">
                            <img className="articlePreviewAuthorInfoProfilePicture" src={articleData.profilePicture} alt=""/>
                        </div>
                        <div className="articlePreviewAuthorInfoUsernameContainer">
                            <span className="articlePreviewAuthorInfoUsername">{articleData.username}</span>
                        </div>
                    </Link>
                </div>
                <div className="articlePreviewDescriptionContainer">
                    <span className="articlePreviewDescription">{articleData.description}</span>
                </div>
                <div className="articlePreviewReadMoreContainer">
                    <Link to={`/articles/${articleData._id}`} className="articlePreviewReadMore">
                        <span className="articlePreviewReadMore">
                            continue reading...
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ArticlePreview
