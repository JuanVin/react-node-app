import { Accordion } from "react-bootstrap"

function CellTable(files) {

    let accordion = []
    
    function formatDate(data) {
        let date
        if (data !== null) {
            date = new Date(data)
            return new Intl.DateTimeFormat('en-US').format(date)
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
        console.log(detail[0].detail)
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
    function formCondition(condition){
        if(condition !== null){
            return condition.condition.toUpperCase()
        }
        return "NO REGISTRA"
    }
    
    files.data.map((rowData, index) => {
        accordion.push(
            <Accordion.Item eventKey={index}>
                <Accordion.Header><b>{rowData.file_number.toUpperCase()}</b></Accordion.Header>
                <Accordion.Body style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <table className="table w-75" >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"><h4>Fechas</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Fecha de Turno</th>
                                <td>{formatDate(rowData.FileDate.shift_date)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Fecha de ingreso</th>
                                <td>{formatDate(rowData.FileDate.admission_date)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Fecha de egreso</th>
                                <td>{formatDate(rowData.FileDate.egress_date)}</td>
                            </tr>
                        </tbody>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"><h4>Datos</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Unidad Fiscal</th>
                                <td>{formatOffice(rowData.FiscalUnit)}</td>
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
                                <td>{formatDetail(rowData.Details)}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td><button className="btn btn-outline-primary">Modificar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </Accordion.Body>
            </Accordion.Item >
        )
    })
    return (
        <>

            <div className="mt-5 w-75">
                <Accordion defaultActiveKey="0">
                    {accordion}
                </Accordion>
            </div>

        </>
    )
}

export default CellTable