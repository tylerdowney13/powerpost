import './articles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ArticlePreview from './articlePreview/ArticlePreview';

const Articles = () => {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const getAllArticles = async () => {
            const articleData = await axios.get('/articles/allarticles')
            setArticles(articleData.data);
        };
        getAllArticles();
    }, []);


    return (
        <div className="articlesFlexbox">
            <div className="articlesPageContainer">
                <div className="articlesContainerContainer">
                    <div className="articlesContainer">
                        {articles && articles.map(article => (
                        <ArticlePreview key={article._id} articleData={article} />
                    ))}
                    </div> 
                </div>
            </div>
        </div>
        
    )
}

export default Articles
