import './liftlogdata.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LiftLogDataStatHeader from './liftlogDataStatHeader/LiftLogDataStatHeader';
import LiftLogDataBox from './liftlogDataBox/LiftLogDataBox';

const LiftLogData = ({ liftlogid }) => {

    const [liftlogData, setLiftlogData] = useState();

    useEffect(() => {
        const fetchLiftlog = async () => {
            axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
            const data = await axios.get(`/liftlog/${liftlogid}`)
            setLiftlogData(data.data)
        }
        fetchLiftlog();
    }, [liftlogid]);

    return (
        <div className="liftlogData">
            <div className="liftlogDataStatHeaderDiv">
                {liftlogData && <LiftLogDataStatHeader liftlogdata={liftlogData}/>}
            </div>
            <div className="liftlogDataDataboxDiv">
                {liftlogData && <LiftLogDataBox liftlogdata={liftlogData}/>}
            </div>
        </div>
        
    )
}

export default LiftLogData
