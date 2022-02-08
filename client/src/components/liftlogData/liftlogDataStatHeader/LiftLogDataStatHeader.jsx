import './liftlogdatastatheader.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LiftLogDataStatHeader = ({liftlogdata}) => {
    const [lifterStats, setLifterStats] = useState(false);
    const liftlogId = liftlogdata._id;

    useEffect(() => {
        const fetchLifterStats = async () => {
            const data = await axios.get(`/liftlog/${liftlogId}`)
            setLifterStats(data.data)
        }
        fetchLifterStats();
    }, [liftlogId])

    return (
        <div className="liftlogDataStatHeader">
            <div className="liftlogDataStatHeaderTitleContainer">
                <span className="liftlogDataStatHeaderTitle">Lifter Stats:</span>
            </div>
            <div className="liftlogDataStatHeaderStatsTableContainer">
                {lifterStats ? <table className="liftlogDataStatHeaderStatsTable">
                    <thead>
                        <tr>
                            <td>Weightclass</td>
                            <td>Squat Max</td>
                            <td>Bench Max</td>
                            <td>Deadlift Max</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{liftlogdata.weightclass} kg</td>
                            <td>{liftlogdata.maxSquat} kg</td>
                            <td>{liftlogdata.maxBench} kg</td>
                            <td>{liftlogdata.maxDeadlift} kg</td>
                            <td>{parseInt(liftlogdata.maxSquat) + parseInt(liftlogdata.maxBench) + parseInt(liftlogdata.maxDeadlift)} kg</td>
                        </tr>
                    </tbody>
                </table>
                :
                <div className="liftlogDataStatHeaderLoadingStatsContainer"><span className="liftlogDataStatHeaderLoadingStatsSpan">Loading Stats...</span></div>}
            </div>
        </div>
    )
}

export default LiftLogDataStatHeader
