import { useState } from "react";
import FormContent from "./FormContent";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom"

function DeviceForm() {
    const [amount, setAmount] = useState([])
    const [number, setNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchParams] = useSearchParams();
    const [loaded, setLoaded] = useState([])

    const handleAmount = () => {
        let _amount = []
        for (let index = 0; index < number; index++) {
            _amount.push(index)
        }
        setAmount(_amount)
    }


    function handleReturn() {
        setAmount([])
        setLoaded([])
    }

    return (
        <>
            <h1 className="text-center mt-3">Expediente: <b className="text-secondary">{searchParams.get('file')}</b></h1>
            {
                (amount.length > 0)
                    ?
                    <>

                        <Pagination amount={amount.length} loaded={loaded} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                        {
                            amount.map((item, index) => {
                                return (
                                    <FormContent deviceNumber={item + 1} loaded={loaded} setLoaded={setLoaded} currentPage={currentPage + 1} key={index}></FormContent>
                                )
                            })

                        }

                        <Pagination amount={amount.length} loaded={loaded} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                        <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                            <button className="btn btn-dark" onClick={handleReturn}>Volver</button>
                        </div>
                    </>
                    :
                    <>
                        <h1>Cantidad de dispositivos</h1>
                        <div className="input-group w-50 mt-5">
                            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control"></input>
                            <button className="btn btn-success" onClick={() => handleAmount()}>Ingresar</button>
                        </div>
                    </>
            }
        </>
    )
}
export default DeviceForm