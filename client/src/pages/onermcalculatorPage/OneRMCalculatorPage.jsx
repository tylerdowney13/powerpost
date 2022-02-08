import './onermcalculatorpage.css';
import OneRMCalculator from '../../components/oneRMCalculator/OneRMCalculator';
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function OneRMCalculatorPage() {

    return (
        <>
            <Topbar />
            <div className="oneRMCalculatorContainer">
                <Sidebar />
                <OneRMCalculator />
                <Rightbar />
            </div>
        </>
    );
}
