import './newConversation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chat } from '@material-ui/icons';

export default function NewConversation({currentUser, user}) {
    const navigate = useNavigate();
    var conversationExists = false

    const createNewConversation = async () => {
        axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
        console.log(user._id);
        const res = await axios.get("/conversations/" + user._id);
        console.log(res.data);
        const conversationsData = res.data;
        await conversationsData.forEach(conversation => {
            console.log(conversation.conversationId === currentUser._id + user._id || conversation.conversationId === user._id + currentUser._id )
            if (conversation.conversationId === currentUser._id + user._id || conversation.conversationId === user._id + currentUser._id ) {
                conversationExists = true
            }
        })

        if (!conversationExists) {
            try {
            const newConversation = {
                senderId: currentUser._id,
                receiverId: user._id,
                conversationId: currentUser._id + user._id,
            }
            axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
            await axios.post("/conversations/", newConversation);
            console.log("Conversation created");
            navigate('/messenger')
        } catch (error) {
            console.log(error);
        }
        } else {
            navigate("/messenger")
        }
        
    }

    return (
        <button className="newConversationButton" onClick={createNewConversation}>Message <Chat /></button>
    )
};