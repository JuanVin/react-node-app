import { Accordion } from "react-bootstrap"
import UpdateForm from "./UpdateForm"
import "./styles/accordionFile.css"

function AccordionFile(componentData) {

    let accordion = [],
        files = componentData.data.files,
        option = componentData.data.option

    console.log(option)
    function formatDate(data, option) {
        let date
        if (data !== null) {
            date = new Date(data)
            if (option === 1) {
                return new Intl.DateTimeFormat('es').format(date) + " a las " + date.getHours() + ":" + date.getMinutes() + "hrs"
            }
            return new Intl.DateTimeFormat('es').format(date)
        }
        return "No registra"
    }

    function formatOffice(office) {
        if (office !== null) {
            return office.name.toUpperCase()
        }
        return "No registra"
    }

    function formatDetail(detail) {

        if (detail[0].detail !== "") {
            return detail[0].detail
        }
        return "Sin detalles"
    }

    function formatTechnician(technician) {
        if (technician !== null) {
            return technician.name.toUpperCase()
        }
        return "No asignado"
    }

    function formCondition(condition) {

        if (condition !== null) {
            if (condition.condition === "turno otorgado") return <p class="text-primary">{condition.condition.toUpperCase()}</p>
            else if (condition.condition === "falta comenzar") return <p class="text-secondary">{condition.condition.toUpperCase()}</p>
            else if (condition.condition === "falta terminar") return <p class="text-warning">{condition.condition.toUpperCase()}</p>
            else if (condition.condition === "archivado") return <p class="text-success">{condition.condition.toUpperCase()}</p>
            return condition.condition.toUpperCase()
        }
        return "NO REGISTRA"
    }
    
    files.map((rowData, index) => {
        accordion.push(
            <Accordion.Item eventKey={index} flush>
                <Accordion.Header><b>{rowData.file_number.toUpperCase()}</b></Accordion.Header>
                <Accordion.Body style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <table id={option+"table"+index} className="table w-75" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"><h5>Fechas</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Fecha de Turno</th>
                                <td>{formatDate(rowData.FileDate.shift_date, 1)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Fecha de ingreso</th>
                                <td>{formatDate(rowData.FileDate.admission_date, 0)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Fecha de egreso</th>
                                <td>{formatDate(rowData.FileDate.egress_date, 0)}</td>
                            </tr>
                        </tbody>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"><h5>Datos</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Unidad Fiscal</th>
                                <td>{formatOffice(rowData.FiscalUnit) + " - " + rowData.FiscalUnit.DistrictId + "C"}</td>
                            </tr>

                            <tr>
                                <th scope="row">Oficina Fiscal</th>
                                <td>{formatOffice(rowData.FiscalOffice)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Estado</th>
                                <td><b>{formCondition(rowData.Condition)}</b></td>
                            </tr>
                            <tr>
                                <th scope="row">Técnico</th>
                                <td>{formatTechnician(rowData.Technical)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Detalle</th>
                                <td>{
                                    formatDetail(rowData.Details)
                                }</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td>
                                    <a href={`/update_form/${rowData.id}`}className="btn btn-primary">Modificar</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Accordion.Body>
            </Accordion.Item >
        )

    })

    return (
        <>
            <Accordion className="w-100 mt-3" defaultActiveKey="0">
                {accordion}
            </Accordion>
        </>
    )
}

export default AccordionFile