import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

function BarGraphic(param) {
    console.log(param)
    return (
        <BarChart width={600} height={500} data={param.props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="rgb(0, 138, 180)" />
            {param.props.opt === 1 ?
                <Bar dataKey="amount2" fill="rgb(0, 180, 120)" /> 
                : 
                ""
            }
        </BarChart>
    )

}
export default BarGraphic