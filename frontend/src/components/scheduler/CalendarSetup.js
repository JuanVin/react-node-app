import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../../services/apiCalls";
import Loading from "../commons/Loading";
import AuthService from "../../services/auth.service";
import checkUserAndRole from "../../services/checkUserAndRole";
import Calendar from "./Calendar";
function CalendarSetup() {
    const [currentDate, setCurrentDate] = useState(null)
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10))
    const [appointments, setAppointments] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const Navigate = useNavigate()

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        if (await checkUserAndRole.checkUser()) {
            getCurrentDates()
        }
        else {
            AuthService.logout()
            Navigate("/login")
            window.location.reload();
        }
    }

    const getCurrentDates = async () => {
        const query = await apis.getCalendarByDate(new Date().toISOString())
        if (query.status === 200) {
            assignAppointment(query.response)
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = await apis.getCalendarByDate(date)
        if (query.status === 200) {
            assignAppointment(query.response)
        }
    }

    function assignAppointment(dates) {
        let _appointments = []
        dates.forEach(date => {
            _appointments.push(formatAppointment(date))
        })
        setAppointments(_appointments)
        setCurrentDate(date)
    }

    function formatAppointment(date) {
        const aux = new Date(date.shift_date)
        const startDate = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate(), aux.getHours(), aux.getMinutes())
        const endDate = new Date(aux.getFullYear(), aux.getMonth(), aux.getDate(), aux.getHours() + 1, aux.getMinutes())

        return {
            title: date.File.file_number + " " + (startDate.getHours() + ":" + startDate.getMinutes()) + "hrs",
            startDate: startDate,
            endDate: endDate
        }
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <>
            <h1 className="m-3">Calendario</h1>
            <hr></hr>
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="input-group">
                                <input type="date" className="form-control" id="start" value={date} onChange={e => setDate(e.target.value)}></input>
                                <button type="submit" className="btn btn-success">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                {
                    (appointments !== null)
                        ?
                        <Calendar appointments={appointments} currentDate={currentDate}></Calendar>
                        :
                        ""
                }

            </div>

        </>

    )
}
export default CalendarSetup