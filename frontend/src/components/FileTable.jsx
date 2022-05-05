import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import CellTable from "./CellTable"
import apis from "./apiFunctions"

function FileTable() {
    const [files, setFiles] = useState(null)
    console.log("asd")
    useEffect(() => {
        getFetchData()
    })

    const getFetchData = async () => {
        setFiles(apis.getFiles())
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(row => {
                        <CellTable data={row}></CellTable>
                    })}
                </tbody>
            </Table>

        </>
    )
}

export default FileTable