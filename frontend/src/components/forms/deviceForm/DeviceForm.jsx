import { useState } from "react";
import FormContent from "./FormContent";
import Pagination from "./Pagination";

function DeviceForm() {
    const [amount, setAmount] = useState([])
    const [number, setNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const handleAmount = () => {
        let _amount = []
        for (let index = 0; index < number; index++) {
            _amount.push(index)
        }
        setAmount(_amount)
    }

    function handleSubmit(e) {
        e.preventDefault()
        localStorage.clear()
        console.log(e.target)
    }
    return (
        <>
            <h1>Cantidad de dispositivos</h1>
            <div className="input-group w-50 mt-5">
                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control"></input>
                <button className="btn btn-success" onClick={() => handleAmount()}>Ingresar</button>
            </div>
            {
                (amount.length > 0)
                    ?
                    <>
                        
                        <form onSubmit={(e) => handleSubmit(e)}>
                            {
                                amount.map((item, index) => {
                                    return (
                                        <FormContent deviceNumber={item + 1} currentPage={currentPage + 1} key={index}></FormContent>
                                    )
                                })

                            }
                            <Pagination amount={amount.length} setCurrentPage={setCurrentPage}></Pagination>
                            <input type="submit" className="btn btn-success" value="Generar actas"></input>
                        </form>
                    </>
                    :
                    ""
            }
        </>
    )
}
export default DeviceForm