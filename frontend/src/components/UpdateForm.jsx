import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apis from "./apiFunctions"
import NavBar from "./NavBar"
import Form from "./Form"
import Loading from "./Loading"
function UpdateForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [fetchFile, setFetchFile] = useState(null)

    let { id } = useParams();

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    async function getFetchData() {
        let fetchData = await apis.getFileById(id)
        setFetchFile(fetchData)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <>

            <div className="container">
                <div className="bg-light shadow p-3 rounded" style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%"
                }}>
                    <div className="mt-5 w-50">
                        <h1 className="mb-5 text-center">Actualizar / Modificar expediente</h1>
                        <Form data={fetchFile}></Form>
                        <a href="/" className="btn btn-outline-success w-100 mt-3"><b>Volver</b></a>
                    </div>
                </div>
            </div>

        </>
    )


}

export default UpdateForm