import './liftloggraph.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LiftLogGraph = ({graphData}) => {
    const data = [];
    graphData.forEach(dataPoint => {
        const date = new Date(dataPoint.date);
        const dateParsed = (date.getDate()) + "/" + (date.getMonth()+1)+ "/" + date.getFullYear();
        const dataObject = {
            weight: dataPoint.weight,
            date: dateParsed,
        }
        data.push(dataObject);
    })

    return (
        <div className="liftlogGraphContainer">
            <ResponsiveContainer maxWidth="90%" maxHeight="90%">
            <LineChart
                width="90%"
                height="90%"
                data={data}
                margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, "auto"]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
      </div>
    );
  }

export default LiftLogGraph
