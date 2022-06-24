import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

function BarGraphic(param) {
    let data = param.props.data
    data.splice(-1, 1)
    function filterByAmount(amount){
        if(amount > 0){
            return true
        }else {
            return false
        }
    }
    
    if (param.props.opt === 1) {
        data = data.filter(obj => filterByAmount(obj.amount + obj.amount2))
    }
    if (param.props.opt === 0) {
        data = data.filter(obj => filterByAmount(obj.amount))
        data.sort(function (a, b) {
            if (a.amount < b.amount) {
                return 1;
            }
            if (a.amount > b.amount) {
                return -1;
            }
            return 0;
        });
    }
    return (
        <BarChart width={600} height={500} data={data}>
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