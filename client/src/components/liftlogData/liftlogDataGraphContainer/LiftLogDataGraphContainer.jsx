import './liftlogdatagraphcontainer.css'
import LiftLogGraph from '../liftlogGraph/LiftLogGraph';

const LiftLogDataGraphContainer = ({graphSelect, liftlogData}) => {
    const squatData = liftlogData.squat;
    const benchData = liftlogData.bench;
    const deadliftData = liftlogData.deadlift;
    const totalData = liftlogData.total;

    return (
        <div className="liftlogGraphContainer">
            <div className="liftlogGraphTitleContainer">
                <div className="liftlogDataGraphTitle">
                    {graphSelect === "squat" && <span>SQUAT</span>}
                    {graphSelect === "bench" && <span>BENCH</span>}
                    {graphSelect === "deadlift" && <span>DEADLIFT</span>}
                    {graphSelect === "total" &&  <span>TOTAL</span>}
                </div>
            </div>
            <div className="liftlogGraphGraphContainer">
                <div className="liftlogGraph">
                    {graphSelect === "squat" && <LiftLogGraph graphData={squatData} />}
                    {graphSelect === "bench" && <LiftLogGraph graphData={benchData} />}
                    {graphSelect === "deadlift" && <LiftLogGraph graphData={deadliftData} />}
                    {graphSelect === "total" && <LiftLogGraph graphData={totalData} />}
                </div>
            </div>
        </div>
        
    )
}

export default LiftLogDataGraphContainer
