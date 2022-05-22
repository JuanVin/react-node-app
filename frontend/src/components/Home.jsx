import { useState, useEffect } from "react"
import apis from "./apiFunctions"
import AccordionFile from "./AccordionFile"
import UploadForm from "./UploadForm"
import "./styles/home.css"

function Home() {
    let [isLoading, setIsLoading] = useState(true)
    let [fetchCurrentData, setFetchCurrentData] = useState(null)
    let [refreshData, setRefreshData] = useState(0)

    let morning_shift = [],
        late_shift = []

    useEffect(() => {
        getFetchData()
    }, [fetchCurrentData !== null])

    let getFetchData = async () => {
        setFetchCurrentData(await apis.getCurrentDayFiles())
        await setIsLoading(false)

    }

    if (isLoading) {
        return (
            <>
                <h1>Cargando...</h1>
            </>
        )
    }
    if (refreshData !== 0) {
        setRefreshData(0)
        getFetchData()
    }

    if (fetchCurrentData !== null) {
        fetchCurrentData.map(data => {
            if (new Date(data.FileDate.shift_date).getHours() <= 11) {
                morning_shift.push(data)
            } else {
                late_shift.push(data)
            }
        })
    }

    return (
        <>
            <div className="bg-light shadow p-3 rounded" style={{ height: "100%" }}>
                <div className="row p-3">
                    <div className="col w-100">
                        <h1 style={{ marginLeft: "50px" }}>Turnos del día</h1>
                        <hr className="my-4"></hr>
                        <div className="center">
                            <div className="w-100">
                                <div className="p-3">
                                    <h3>Turno mañana</h3>
                                    {(morning_shift.length >= 1) ?
                                        <AccordionFile data={{ files: morning_shift, option: "a1" }}></AccordionFile>
                                        :
                                        <h3 style={{ color: "grey" }} className="text-center mt-5">Sin turnos</h3>
                                    }
                                </div>
                                <div className="p-3">
                                    <h3>Turno tarde</h3>
                                    {(late_shift.length >= 1) ?
                                        <AccordionFile data={{ files: late_shift, option: "a2" }}></AccordionFile>
                                        :
                                        <h3 style={{ color: "grey" }} className="text-center mt-5">Sin turnos</h3>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <h1 style={{ marginLeft: "50px" }}>Nuevo turno</h1>
                        <hr className="my-4"></hr>
                        <div className="center">
                            <UploadForm setRefreshData={setRefreshData}></UploadForm>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Home