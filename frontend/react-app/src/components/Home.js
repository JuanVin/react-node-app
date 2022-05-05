import { useEffect, useState } from "react"
import File from "./File"
import { Table } from "react-bootstrap"
function Home() {
    const [files, setFiles] = useState(null)

    useEffect(() => {
        getData()
    })

    const getData = async () => {
        let data = await fetch('http://localhost:3000/files')
        data = await data.json()
        setFiles(data)
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
                        <File data={row}></File>
                    })}
                </tbody>
            </Table>

        </>
    )
}

export default Home