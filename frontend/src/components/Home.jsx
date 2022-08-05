import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import apis from "../services/apiCalls"
import UploadForm from "./forms/UploadForm"
import "./styles/home.css"
import AccordionFile from "./commons/AccordionFile"
import Loading from "./commons/Loading"
import UserService from "../services/user.service"
function Home({ setShowNav }) {
    let [isLoading, setIsLoading] = useState(true)
    let [fetchCurrentData, setFetchCurrentData] = useState(null)
    let [refreshData, setRefreshData] = useState(0)
    let [content, setContent] = useState("")
    const Navigate = useNavigate()
    setShowNav(true)
    let morning_shift = [],
        late_shift = []

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    let getFetchData = async () => {
        const query = await UserService.getUserBoard()
        setContent(await UserService.getUserBoard())
        if (query.status === 200) {
            console.log(query)
            setFetchCurrentData(await apis.getCurrentDayFiles())
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }

    }

    if (isLoading) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }

    if (content.status !== "") {
        if (content.status !== 200) {
            Navigate("/login")
            window.location.reload();
        }
    }
    if (refreshData !== 0) {
        setRefreshData(0)
        getFetchData()
    }

    if (fetchCurrentData !== null) {
        fetchCurrentData.forEach(data => {
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
                                        <AccordionFile files={morning_shift} option={"a2"}></AccordionFile>
                                        :
                                        <h3 style={{ color: "grey" }} className="text-center mt-5">Sin turnos</h3>
                                    }
                                </div>
                                <div className="p-3">
                                    <h3>Turno tarde</h3>
                                    {(late_shift.length >= 1) ?
                                        <AccordionFile files={late_shift} option={"a2"}></AccordionFile>
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