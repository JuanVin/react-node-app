import { useState, useEffect } from "react";
import FormContent from "./FormContent";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom"
import apis from "../../apiCalls";
import Loading from "../../commons/Loading"
function DeviceForm() {
    const [amount, setAmount] = useState([])
    const [number, setNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchParams] = useSearchParams();
    const [loaded, setLoaded] = useState([])
    const [loading, setLoading] = useState(true)
    const [extractionId, setExtractionId] = useState(0)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        handleNumber()
    }, [loading])

    const handleAmount = async (e) => {
        e.preventDefault()
        let _amount = []
        let status = await handleSubmit(number)
        if (status === 200) {
            for (let index = 0; index < number; index++) {
                _amount.push(index)
            }
            setAmount(_amount)
        }
        else {
            console.log("error")
        }
    }

    const handleNumber = async () => {
        let query = await apis.getExtractionNumber(searchParams.get("id"))
        if (query.status === 200) {

            let _amount = []
            for (let index = 0; index < query.response.numberOfDevices; index++) {
                _amount.push(index)
            }
            setAmount(_amount)
            setExtractionId(query.response.id)
            await handleInfo()
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleInfo = async () => {
        let query = await apis.getExtractionsById(extractionId)
        let aux = [...loaded]
        if (query.response.length > 0) {
            query.response.forEach((element, index) => {
                if (!aux.find(item => item === element.deviceNumber)) {
                    aux.push(element.deviceNumber)
                }
            })
            setLoaded(aux)
            setInfo(query.response)
        }
    }

    const handleSubmit = async () => {
        let response = await apis.postExtractionNumber({ numberOfDevices: number, fileId: searchParams.get("id") })
        return response.status
    }

    function filterInfo(index) {
        if (info) {
            return (info.filter(element => element.deviceNumber === index))[0]
        }
        return null
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
                        <Pagination amount={amount.length} loaded={loaded} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
                        {
                            amount.map((item, index) => {
                                return (
                                    <FormContent deviceNumber={item + 1} info={filterInfo(index + 1)} loaded={loaded} setLoaded={setLoaded} currentPage={currentPage + 1} key={index}></FormContent>
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