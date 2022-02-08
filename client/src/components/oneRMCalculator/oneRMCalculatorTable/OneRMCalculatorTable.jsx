import './onermcalculatortable.css';

const OneRMCalculatorTable = ({weightValue, repsValue}) => {

    const tableData = [];
   

    const calculateRepMaxes = (weightValue, repsValue) => {
        const weight = parseInt(weightValue);
        const reps = parseInt(repsValue);

        const repmax = weight / (1.0278 - (0.0278 * reps));

        const repmax1 = (repmax * 1).toFixed(0);
        const repmax2 = (repmax * 0.97).toFixed(0);
        const repmax3 = (repmax * 0.94).toFixed(0);
        const repmax4 = (repmax * 0.92).toFixed(0);
        const repmax5 = (repmax * 0.89).toFixed(0);
        const repmax6 = (repmax * 0.86).toFixed(0);
        const repmax7 = (repmax * 0.83).toFixed(0);
        const repmax8 = (repmax * 0.81).toFixed(0);
        const repmax9 = (repmax * 0.78).toFixed(0);
        const repmax10 = (repmax * 0.75).toFixed(0);

        tableData.push(repmax1, repmax2, repmax3, repmax4, repmax5, repmax6, repmax7, repmax8, repmax9, repmax10);
    }

    return (
        <div>
            {weightValue !== '' & repsValue !== '' ? calculateRepMaxes(weightValue, repsValue) : "No Data"}
            <div className="oneRMTableContainer">
                <table className="oneRMTable">
                    <thead>
                        <tr>
                            <td>Reps</td>
                            <td>Weight</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{tableData[0]}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{tableData[1]}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>{tableData[2]}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>{tableData[3]}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{tableData[4]}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>{tableData[5]}</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>{tableData[6]}</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>{tableData[7]}</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>{tableData[8]}</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>{tableData[9]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OneRMCalculatorTable
