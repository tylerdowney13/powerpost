import './powerfeed.css';
import PowerFeedFeed from "../../components/powerfeed/PowerFeedFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";


export default function PowerFeedPage() {

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <PowerFeedFeed />
                <Rightbar />
            </div>
        </>
    )
}
