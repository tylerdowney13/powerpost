import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

import Post from '../post/Post';
import Share from '../share/Share';
import './powerfeedfeed.css';

export default function PowerFeedFeed({username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api/';
            const res = await axios.get("posts/timeline/" + user._id);
            setPosts(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
            setIsLoaded(true);
        }
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {isLoaded && posts.map(p => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}
