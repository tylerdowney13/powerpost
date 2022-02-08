import './topPowerposts.css';
import TopPowerposts from "../../components/topPowerposts/TopPowerposts";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from '../../components/rightbar/Rightbar';


export default function TopPowerpostsPage() {

    return (
        <>
            <Topbar />
            <div className="topPowerposts">
                <Sidebar />
                <TopPowerposts />
                <Rightbar />
            </div>
        </>
    )
}
