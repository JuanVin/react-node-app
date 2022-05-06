import { Table } from "react-bootstrap"

function CellTable(files) {
    let cellTable = []

    files.data.map(row => {
        cellTable.push(
            <tr>
                <td>{row.id}</td>
                <td>{row.File.file_number}</td>
                <td>{row.shift_date}</td>
                <td>{row.admission_date}</td>
                <td><button type="button" className="btn btn-primary">Ver detalle</button></td>
            </tr>
        )
    })

    return (
        <><Table striped bordered hover className="mt-5">
            <thead>
                <tr>
                    <th>Id Exp</th>
                    <th>Expediente</th>
                    <th>Fecha Turno</th>
                    <th>Fecha Ingreso</th>
                </tr>
            </thead>
            <tbody>
                {cellTable}
            </tbody>
        </Table>
        </>
    )
}

export default CellTable