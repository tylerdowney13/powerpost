import './liftlogpage.css';
import LiftLog from "../../components/liftlog/LiftLog";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Home() {

    return (
        <>
            <Topbar />
            <div className="liftlogContainer">
                <Sidebar />
                <LiftLog />
                <Rightbar />
            </div>
        </>
    );
}
