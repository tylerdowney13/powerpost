import './liftlogdatabox.css';
import { useState } from 'react';
import LiftLogDataGraphContainer from '../liftlogDataGraphContainer/LiftLogDataGraphContainer';
import LiftLogAddData from '../liftlogAddData/LiftLogAddData';

const LiftLogDataBox = ({liftlogdata}) => {
    const [graphSelect, setGraphSelect] = useState("total")

    return (
        <div className="liftlogDataboxContainer">
            <div className="liftlogDatabox">
                <div className="liftlogDataBoxContent">
                    <div className="liftlogDataboxButtonContainer">
                        {graphSelect === "squat" ? <button className="liftlogDataboxButtonSelected">SQUAT</button> : <button className="liftlogDataboxButton" onClick={() => setGraphSelect("squat")}>SQUAT</button>}
                        {graphSelect === "bench" ? <button className="liftlogDataboxButtonSelected">BENCH</button> : <button className="liftlogDataboxButton" onClick={() => setGraphSelect("bench")}>BENCH</button>}
                        {graphSelect === "deadlift" ? <button className="liftlogDataboxButtonSelected">DEADLIFT</button> : <button className="liftlogDataboxButton" onClick={() => setGraphSelect("deadlift")}>DEADLIFT</button>}
                        {graphSelect === "total" ? <button className="liftlogDataboxButtonSelected">TOTAL</button> : <button className="liftlogDataboxButton" onClick={() => setGraphSelect("total")}>TOTAL</button>}
                    </div>
                </div>
                {graphSelect !== "total" && 
                    <div className="liftlogDataboxAddDataContainer">
                        <div className="liftlogDataboxAddData">
                            {graphSelect === "squat" && <LiftLogAddData liftType={"Squat"} liftlogId={liftlogdata._id}/>}
                            {graphSelect === "bench" && <LiftLogAddData liftType={"Bench"} liftlogId={liftlogdata._id}/>}
                            {graphSelect === "deadlift" && <LiftLogAddData liftType={"Deadlift"} liftlogId={liftlogdata._id}/>}
                        </div>
                    </div>
                }
                <div className="liftlogDataboxGraphboxContainer">
                    <div className="liftlogDataboxGraphbox">
                        {graphSelect === "squat" && <LiftLogDataGraphContainer graphSelect={"squat"} liftlogData={liftlogdata}/>}
                        {graphSelect === "bench" && <LiftLogDataGraphContainer graphSelect={"bench"} liftlogData={liftlogdata}/>}
                        {graphSelect === "deadlift" && <LiftLogDataGraphContainer graphSelect={"deadlift"} liftlogData={liftlogdata}/>}
                        {graphSelect === "total" && <LiftLogDataGraphContainer graphSelect={"total"} liftlogData={liftlogdata}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiftLogDataBox
