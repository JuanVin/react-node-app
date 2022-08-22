import { useState, useEffect } from "react";
import FormContent from "./FormContent";
import Pagination from "./Pagination";
import { useSearchParams, useNavigate } from "react-router-dom"
import apis from "../../../services/apiCalls"
import Loading from "../../commons/Loading"
import ExtractionContext from "../../../context/ExtractionContext";
import AuthService from "../../../services/auth.service";
import checkUserAndRole from "../../../services/checkUserAndRole";

function DeviceForm() {

    const [amount, setAmount] = useState([])
    const [number, setNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchParams] = useSearchParams();
    const [loaded, setLoaded] = useState([])
    const [loading, setLoading] = useState(true)
    const [devices, setDevices] = useState(null)
    const [extractionId, setExtractionId] = useState(null)

    const Navigate = useNavigate()
    useEffect(() => {
        checkUser()
    }, [loading])

    async function checkUser() {
        if (await checkUserAndRole.checkUser()) {
            handleNumber()
        } else {
            AuthService.logout()
            Navigate("/login")
            window.location.reload();
        }
    }

    const handleAmount = async (e) => {
        e.preventDefault()

        let _amount = []

        let query = await apis.getExtractionInfo(searchParams.get("id"))
        if (query.status === 200) {
            let updateNumber = await apis.updateFormsNumber({ id: query.response.FileId, number: number })
            if (updateNumber.status === 200) {
                for (let index = 0; index < number; index++) {
                    _amount.push(index)
                }
                setExtractionId(updateNumber.response.info)
                setAmount(_amount)
            }
        } else {
            let newNumber = await apis.postExtractionNumber({ numberOfDevices: number, fileId: searchParams.get("id") })
            if (newNumber.status === 200) {
                for (let index = 0; index < number; index++) {
                    _amount.push(index)
                }
                setExtractionId(newNumber.response.info)
                setAmount(_amount)
            }
            else {
                console.log("error")
            }
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



    function filterDevice(index) {
        if (devices) {
            return (devices.filter(device => device.deviceNumber === index))[0]
        }
        return null
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
                                            deviceNumber={index + 1}
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