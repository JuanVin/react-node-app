import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { useEffect, useState } from "react"
import Loading from './Loading';
import apis from './apiFunctions';

function Stadistics() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    async function getFetchData() {
        setData(await apis.getStadistics())
        setIsLoading(false)
        setTotal(data[data.length - 1].total)
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <>
            <div className="container">
                <h2 className="mt-5 mb-5 p-3" style={{ color: "grey" }}>Expedientes</h2>
                <div className='row'>
                    <div className="col">
                        <h3 className='p-3 text-center'>Cantidad de registros: <span style={{color: "orange"}}>{total}</span></h3>
                        <BarChart width={730} height={500} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div className="col">
                        <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam velit nesciunt sint magnam blanditiis omnis error quae consequatur. Quidem quis tempore sequi voluptas quae! Nulla, odit? Nobis, blanditiis quibusdam?</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Stadistics

