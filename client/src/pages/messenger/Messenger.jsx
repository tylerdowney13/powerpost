import './messenger.css'
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Topbar from "../../components/topbar/Topbar";
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Sidebar from '../../components/sidebar/Sidebar'
import { AuthContext } from '../../context/AuthContext';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState("");


    const scrollRef = useRef();

    const {user} = useContext(AuthContext);

    useEffect(() => {
        const getConversations = async () => {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api/';
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getConversations();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                const res = await axios.get('/messages/' + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        }

        try {
            axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api/';
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Topbar />
            <div className="messenger">
                <Sidebar />
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <span className="chatMenuTitle">Conversations</span>
                        {conversations.map(c => (
                            <div key={c._id} onClick={() => setCurrentChat(c)}>
                                <Conversation  conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? 
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(m => (
                                        <div key={m._id} ref={scrollRef}>
                                            <Message  message={m} own={m.sender === user._id} user={user}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatMessageInput" placeholder="Write something..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div>
                            </>
                            :
                            <span className="noConversationText">Open a conversation to start a chat</span>}
                    </div>
                </div>
            </div>
        </>
    )
}
