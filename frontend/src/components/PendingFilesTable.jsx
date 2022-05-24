function PendingFilesTable(param) {
    console.log(param.props)
    let pendingFiles = []
    param.props.forEach((file, index) => {
        pendingFiles.push(
            <tr ket={"t4"+index}>
                <th scope="row">{index+1}</th>
                <td style={{maxWidth: "100px"}}>{file.File.file_number}</td>
                <td>{file.admission_date}</td>
                <td>{file.shift_date.substr(0, 10)}</td>
                <td>{<a href={`/update_form/${file.id}`} className="btn btn-primary">Ver</a>}</td>
            </tr>
        )
    })
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Número</th>
                    <th scope="col">Fecha Ingreso</th>
                    <th scope="col">Fecha Turno</th>
                    <th scope="col">Ver</th>
                </tr>
            </thead>
            <tbody>
                {pendingFiles}
            </tbody>
        </table>
    )
}
export default PendingFilesTable