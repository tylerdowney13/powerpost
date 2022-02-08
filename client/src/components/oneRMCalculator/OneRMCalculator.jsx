import './onermcalculator.css';
import { useRef, useState, useEffect } from 'react';
import OneRMCalculatorTable from './oneRMCalculatorTable/OneRMCalculatorTable';


export default function OneRMCalculator() {
    const weightRef = useRef();
    const repsRef = useRef();

    const [oneRMData, setOneRMData] = useState("");
    const [oneRMTableData, setOneRMTableData] = useState("");

    useEffect(() => {
        if (oneRMData.weight !== "") {
            const getOneRMData = () => {
                setOneRMTableData(oneRMData);
            }
            getOneRMData()
        }
    }, [oneRMData])
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (weightRef.current.value !== "" & repsRef.current.value !== "") {
            const newOneRMData = {
            weight: weightRef.current.value,
            reps: repsRef.current.value,
            }
            setOneRMData(newOneRMData);
        }
        
    }

    return (
        <div className="oneRMCalculator">
            <div className="oneRMCalculatorTitleContainer">
                <span className="oneRMCalculatorTitle">1RM CALCULATOR</span>
            </div>
            <div className="oneRMCaculatorContainer">
                <div className="oneRMCalculatorWrapper">
                    <div className="oneRMCalculatorTopContainer">
                        <form className="oneRMCalculatorTopBox" onSubmit={handleSubmit}>
                            <label className="oneRMCalculatorTopBoxLabel">Weight (kgs):</label>
                            <input className="oneRMCalculatorTopBoxInput" type="text" ref={weightRef}/>
                            <label className="oneRMCalculatorTopBoxLabel">Reps:</label>
                            <input className="oneRMCalculatorTopBoxInput" type="text" ref={repsRef}/>
                            <div className="oneRMCalculatorTopBoxButtonContainer">
                                <button className="oneRMCalculatorTopBoxButton" type="submit">Calculate</button>
                            </div>
                        </form>
                    </div>
                    {oneRMData && 
                        <div className="oneRMCalculatorTableContainer">
                            <div className="oneRMCalculatorTableBox">
                                {oneRMTableData && <OneRMCalculatorTable weightValue={oneRMTableData.weight} repsValue={oneRMTableData.reps} />}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
