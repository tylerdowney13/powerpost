import './article.css';
import ArticleDisplay from '../../components/articles/articleDisplay/ArticleDisplay';
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';


export default function Article() {
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const articleId = useParams().articleId;

    useEffect(() => {
       if (articleId) {
            const fetchArticle = async () => {
           const res = await axios.get(`/articles/${articleId}`);
            setArticleData(res.data)
            setLoading(false)
            }
            fetchArticle()
        }
    }, [articleId]);

    return (
        <>
            <Topbar />
            <div className="article">
                <Sidebar />
                {loading ? <div className="articleLoading"><span>Loading Article...</span></div> : <ArticleDisplay articleData={articleData} />}
                <Rightbar/>
            </div>
        </>
    )
}
