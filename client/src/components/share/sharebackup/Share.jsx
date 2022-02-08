import './share.css';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons';
import { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {
    const { user } = useContext(AuthContext);
    
    const desc = useRef();

    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            
            try {
              await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
          }
          try {
            await axios.post("/posts", newPost);
            window.location.reload();
          } catch (err) {
              console.log(err)
          }
        };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture : "https://i1.wp.com/immersivelrn.org/wp-content/uploads/no_avatar.jpg?fit=250%2C250&ssl=1"} alt="" />
                    <input placeholder={`What's on your mind ${user.username}?`} className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <label htmlFor="file" className="shareOptions" >
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo</span>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg" style={{display: "none"}} onChange={(e) => {setFile(e.target.files[0])}}/>
                        </div>
                    </label>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod"className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
