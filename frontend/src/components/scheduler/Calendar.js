import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
function Calendar({ appointments, currentDate }) {
    return (
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
    )
}
export default Calendar