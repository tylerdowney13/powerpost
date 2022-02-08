import './toppowerposts.css';
import Post from '../post/Post';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TopPowerposts = () => {
    const [posts, setPosts] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const topPosts = await axios.get("/posts/toppowerposts/posts");
            setPosts(topPosts.data.sort((p1, p2) => {return p2.likes.length - p1.likes.length}));
            
            setIsLoaded(true);
        }
        if (!isLoaded) {
            fetchPosts();
        }
    }, [isLoaded]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {isLoaded && posts.map(p => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}

export default TopPowerposts
