import './liftlogcreate.css'
import { useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const LiftLogCreate = () => {
    const { user } = useContext(AuthContext);
    

    const liftlogSquatRef = useRef();
    const liftlogBenchRef = useRef();
    const liftlogDeadliftRef = useRef();
    const liftlogWeightclassRef = useRef();
    
    
    const handleLiftlogFormSubmit = async (e) => {
        e.preventDefault();
        const liftlogSquatValue = parseInt(liftlogSquatRef.current.value);
        const liftlogBenchValue = parseInt(liftlogBenchRef.current.value);
        const liftlogDeadliftValue = parseInt(liftlogDeadliftRef.current.value);
        const liftlogWeightclassValue = parseInt(liftlogWeightclassRef.current.value);
        const liftlogTotalValue = liftlogSquatValue + liftlogBenchValue + liftlogDeadliftValue;
        const liftlogDate = Date.now();

        
        
        const newLiftlog = {
            userId: user._id,
            weightclass: liftlogWeightclassValue,
            maxSquat: liftlogSquatValue,
            maxBench: liftlogBenchValue,
            maxDeadlift: liftlogDeadliftValue,
            squat: [{weight: liftlogSquatValue, date: liftlogDate}],
            bench: [{weight: liftlogBenchValue, date: liftlogDate}],
            deadlift: [{weight: liftlogDeadliftValue, date: liftlogDate}],
            total: [{weight: liftlogTotalValue, date: liftlogDate}]
        }

        try {
            const liftlog = await axios.post('/liftlog', newLiftlog);
            const userData = JSON.parse(localStorage.getItem("user"));
            userData.liftlogid = liftlog.data._id;
            localStorage.setItem("user", JSON.stringify(userData));
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="liftlogCreate">
            <div className="liftlogCreateTitleContainer">
                <span className="liftlogCreateTitleText">LiftLog Maxes:</span>
            </div>
            <form className="liftlogCreateFormContainer" onSubmit={handleLiftlogFormSubmit}>
                <div className="liftlogInputContainer">
                    <label className="liftlogSquatFormLabel" htmlFor="liftlogSquat">Squat: </label>
                    <input className="liftlogFormInput" type="text" id="liftlogSquat" ref={liftlogSquatRef} ></input>
                    <span className="liftlogFormSpan">kg</span>
                </div>
                <div className="liftlogInputContainer">
                    <label className="liftlogBenchFormLabel" htmlFor="liftlogSquat">Bench: </label>
                    <input className="liftlogFormInput" type="text" id="liftlogSquat" ref={liftlogBenchRef}></input>
                    <span className="liftlogFormSpan">kg</span>
                </div>
                <div className="liftlogInputContainer">
                    <label className="liftlogDeadliftFormLabel" htmlFor="liftlogSquat">Deadlift: </label>
                    <input className="liftlogFormInput" type="text" id="liftlogSquat" ref={liftlogDeadliftRef}></input>
                    <span className="liftlogFormSpan">kg</span>
                </div>
                    <div className="liftlogInputContainer">
                        <label className="liftlogWeightclassFormLabel" htmlFor="liftlogWeightclassSelect">Weightclass: </label>
                        <select className="liftlogFormSelect" id="liftlogWeightclassSelect" ref={liftlogWeightclassRef}>
                            <option value="47">47kg / 104lbs</option>
                            <option value="52">52kg / 115lbs</option>
                            <option value="57">57kg / 126lbs</option>
                            <option value="59">57kg / 130lbs</option>
                            <option value="63">63kg / 139lbs</option>
                            <option value="66">66kg / 145lbs</option>
                            <option value="72">72kg / 159lbs</option>
                            <option value="74">74kg / 163lbs</option>
                            <option value="83">83kg / 183lbs</option>
                            <option value="84">84kg / 185lbs</option>
                            <option value="84+">84kg+ / 185lbs+</option>
                            <option value="93">93kg / 205lbs</option>
                            <option value="105">105kg / 231lbs</option>
                            <option value="120">120kg / 265lbs</option>
                            <option value="120+">120kg+ / 265lbs+</option>
                        </select>
                </div>
                <div className="liftlogFormSubmitButtonContainer">
                    <button className="liftlogFormSubmitButton" type="submit">Create Lift Log</button>
                </div>
            </form>
            
        </div>
    )
}

export default LiftLogCreate
