import NavBar from "./NavBar"
import ShiftDay from "./ShiftDay"
import UploadForm from "./UploadForm"
import { useState, useEffect } from "react"
import apis from "./apiFunctions"
import AccordionFile from "./AccordionFile"
import "./styles/home.css"
function Home() {
    let [isLoading, setIsLoading] = useState(true)
    let [fetchLastData, setFetchLastData] = useState(null)
    let [fetchCurrentData, setFetchCurrentData] = useState(null)
    let [refreshData, setRefreshData] = useState(0)
    let morning_shift = [],
        late_shift = []
    useEffect(() => {
        getFetchData()
    }, [isLoading])

    let getFetchData = async () => {
        setFetchLastData(await apis.getLastFiles(10))
        setFetchCurrentData(await apis.getCurrentDayFiles())
        setIsLoading(false)
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

    if (fetchCurrentData != null) {

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
            <body>
                <NavBar></NavBar>
                <div className="container">
                    <div className="bg-light">
                        <div className="row p-3">
                            <div className="col w-100">
                                <h1 style={{ marginLeft: "50px" }}>Turnos del día</h1>
                                <hr className="my-4"></hr>
                                <div className="center">
                                    <div className="w-100">
                                        <div className="p-3">
                                            <h3>Turno mañana</h3>
                                            <AccordionFile data={morning_shift}></AccordionFile>
                                        </div>
                                        <div className="p-3">
                                            <h3>Turno tarde</h3>
                                            <AccordionFile data={late_shift}></AccordionFile>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col ">
                                <h1 style={{ marginLeft: "50px" }}>Nuevo turno</h1>
                                <hr className="my-4"></hr>
                                <div className="center">
                                    <UploadForm setRefreshData={setRefreshData}></UploadForm>
                                </div>
                            </div>
                        </div>
                        <hr className="my-5 mt-3"></hr>
                        <h1 className="text-center">Últimos turnos dados</h1>
                        <div className="center">
                            <div className="w-75 shadow-sm p-3 mb-5">
                                <AccordionFile data={fetchLastData}></AccordionFile>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )

}

export default Home