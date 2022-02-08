import './message.css';
import axios from 'axios';
import { useState } from 'react';
import { format } from 'timeago.js';

export default function Message({message, own, user}) {
    const [senderProfilePicture, setSenderProfilePicture] = useState(null);

    const getProfilePic = async () => {
        if (message.sender !== user._id) {
        axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api/'
        const sender = await axios.get(`users/?userId=${message.sender}`)
        setSenderProfilePicture(sender.data.profilePicture);
        }
    }
    getProfilePic();

    

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={senderProfilePicture ? senderProfilePicture : user.profilePicture} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
