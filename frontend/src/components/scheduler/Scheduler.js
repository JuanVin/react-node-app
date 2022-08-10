import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import checkUserAndRole from "../../services/checkUserAndRole";
import {
    Scheduler,
    MonthView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import apis from "../../services/apiCalls";
import Loading from "../commons/Loading";
import AuthService from "../../services/auth.service";

function Calendar() {
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
            endDate: endDate,
            algo: "asdasdasda"
        }
    }
    console.log(currentDate)
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
                                <input type="date" className="form-control" id="start" value={date} onChange={e => setDate(e.target.value)}
                                ></input>
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
                        <Paper>
                            <Scheduler
                                data={appointments}
                                height={660}
                            >
                                <ViewState
                                    startDayHour={7}
                                    endDayHour={22}
                                    currentDate={currentDate}
                                />
                                <MonthView />
                                <Appointments />
                                <AppointmentTooltip
                                    showCloseButton
                                    showOpenButton
                                /><AppointmentForm
                                    readOnly
                                />
                            </Scheduler>
                        </Paper>
                        :
                        ""
                }

            </div>

        </>

    )
}
export default Calendar