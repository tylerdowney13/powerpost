import './settingspage.css';
import Settings from "../../components/settings/Settings";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";


export default function SettingsPage() {

    return (
        <>
            <Topbar />
            <div className="settings">
                <Sidebar />
                <Settings />
            </div>
        </>
    )
}
