import './articlespage.css';
import Articles from "../../components/articles/Articles";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function ArticlesPage() {

    return (
        <>
            <Topbar />
            <div className="articlesPageContainer">
                <Sidebar />
                <Articles />
                <Rightbar />
            </div>
        </>
    );
}
