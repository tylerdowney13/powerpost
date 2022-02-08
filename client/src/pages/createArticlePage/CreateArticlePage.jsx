import './createarticlepage.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import CreateArticle from '../../components/articles/createArticle/CreateArticle';

export default function CreateArticlePage() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Topbar />
            <div className="createArticleContainer">
                <Sidebar />
                <CreateArticle user={user}/>
                <Rightbar />
            </div>
        </>
    );
}
