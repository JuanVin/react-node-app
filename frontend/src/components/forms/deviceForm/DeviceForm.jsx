import { useState, useEffect } from "react";
import FormContent from "./FormContent";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom"
import apis from "../../apiCalls";
import Loading from "../../commons/Loading"
import ExtractionContext from "../../../context/ExtractionContext";
function DeviceForm() {

    const [amount, setAmount] = useState([])
    const [number, setNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchParams] = useSearchParams();
    const [loaded, setLoaded] = useState([])
    const [loading, setLoading] = useState(true)
    const [devices, setDevices] = useState(null)
    const [extractionId, setExtractionId] = useState(null)

    useEffect(() => {
        handleNumber()
    }, [loading])

    const handleAmount = async (e) => {
        e.preventDefault()

        let _amount = []
        let query = await handleSubmit(number)

        if (query.status === 200) {
            for (let index = 0; index < number; index++) {
                _amount.push(index)
            }
            setExtractionId(query.response.info)
            setAmount(_amount)
        }
        else {
            console.log("error")
        }
    }

    const handleNumber = async () => {
        let query = await apis.getExtractionInfo(searchParams.get("id"))

        if (query.status === 200) {
            let _amount = [], _loaded = [...loaded]
            for (let index = 0; index < query.response.numberOfDevices; index++) {
                _amount.push(index)
            }
            query.response.CellPhones.forEach(phone => {
                if (!_loaded.find(element => element === phone.deviceNumber)) {
                    _loaded.push(phone.deviceNumber)
                }
            })
            setLoaded(_loaded)
            setAmount(_amount)
            setExtractionId(query.response.id)
            setDevices(query.response.CellPhones)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        let query = await apis.postExtractionNumber({ numberOfDevices: number, fileId: searchParams.get("id") })
        return query
    }

    function filterDevice(index) {
        if (devices) {
            return (devices.filter(device => device.deviceNumber === index))[0]
        }
        return null
    }

    const updateFormsNumber = async (e) => {
        e.preventDefault()
        let body = {
            id: searchParams.get("id"),
            number: amount.length + 1
        }
        let query = await apis.updateFormsNumber(body)
        if (query.status === 200) {
            let _amount = [...amount]
            _amount.push(_amount.length)
            setAmount(_amount)
        }
    }

    function handleReturn() {
        setAmount([])
        setLoaded([])
    }

    if (loading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <>
            <h1 className="text-center mt-3">Expediente: <b className="text-secondary">{searchParams.get('file')}</b></h1>
            {
                (amount.length > 0)
                    ?
                    <>
                        <ExtractionContext.Provider value={{ id: extractionId }}>
                            <Pagination amount={amount.length} loaded={loaded} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                            {
                                amount.map((item, index) => {
                                    return (
                                        <FormContent
                                            elementNumber={index + 1}
                                            amount={amount}
                                            setAmount={setAmount}
                                            device={filterDevice(index + 1)}
                                            loaded={loaded}
                                            setLoaded={setLoaded}
                                            currentPage={currentPage + 1}
                                            key={item}>
                                        </FormContent>
                                    )
                                })
                            }
                            <Pagination amount={amount.length} loaded={loaded} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                            <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
                                <button className="btn btn-dark" onClick={handleReturn}>Volver</button>
                                <form onSubmit={(e) => updateFormsNumber(e)}>
                                    <button type="submit" className="btn btn-success" style={{ marginLeft: "10px" }}>Agregar</button>
                                </form>
                            </div>
                        </ExtractionContext.Provider>
                    </>
                    :
                    <>
                        <form onSubmit={(e) => handleAmount(e)}>
                            <h1>Cantidad de dispositivos</h1>
                            <div className="input-group w-25 mt-5">
                                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control"></input>
                                <button className="btn btn-success">Ingresar</button>
                            </div>
                        </form>
                    </>
            }
        </>
    )
}
export default DeviceForm