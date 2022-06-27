import { useState } from "react";
import FormContent from "./FormContent";
import Pagination from "./Pagination";
import {useSearchParams } from "react-router-dom"
function DeviceForm() {
    const [amount, setAmount] = useState([])
    const [number, setNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchParams] = useSearchParams();
    const [fileExtraction, setFileExtraction] = useState({file: searchParams.get("file"), id: searchParams.get("id"), extraction: {}})
 
    const handleAmount = () => {
        let _amount = []
        for (let index = 0; index < number; index++) {
            _amount.push(index)
        }
        setAmount(_amount)
    }

    function handleSubmit(e) {
        e.preventDefault()
        //localStorage.clear()
    }

    function handleReturn(){
        setAmount([])
    }
    return (
        <>
            <h1 className="text-center mt-3">Expediente: <b className="text-secondary">{searchParams.get('file')}</b></h1>
            {
                (amount.length > 0)
                    ?
                    <>
                        
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Pagination amount={amount.length} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                            {
                                amount.map((item, index) => {
                                    return (
                                        <FormContent deviceNumber={item + 1} fileExtraction={fileExtraction} setFileExtraction={setFileExtraction} currentPage={currentPage + 1} key={index}></FormContent>
                                    )
                                })

                            }
                            
                            <Pagination amount={amount.length} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                            <input type="submit" className="btn btn-success" value="Generar actas" style={{display: "inline-block"}}></input>
                        </form>
                        <button className="btn btn-secondary" onClick={handleReturn}>Volver</button>
                    </>
                    :
                    <>
                    <h1>Cantidad de dispositivos</h1><div className="input-group w-50 mt-5">
                        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control"></input>
                        <button className="btn btn-success" onClick={() => handleAmount()}>Ingresar</button>
                    </div>
                    </>
            }
        </>
    )
}
export default DeviceForm