import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apis from "./apiFunctions"
import NavBar from "./NavBar"
import Form from "./Form"

function UpdateForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [fetchFile, setFetchFile] = useState(null)
    const [postData, setPostData] = useState(null)

    let { id } = useParams();
    console.log(id)
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
            <h1>Cargando</h1>
        )
    }
    if (!isLoading) {
        console.log(fetchFile)
    }
    return (
        <>
            <body>
                <NavBar></NavBar>
                <div className="container bg-light">
                    <div className="bg-ligh" style={{
                        display: "flex",
                        justifyContent: "center",

                    }}>
                        <div className="mt-5 w-50">
                            <h1 className="mb-5 text-center">Actualizar / Modificar expediente</h1>
                            <Form data={fetchFile}></Form>
                            <a href="/" className="btn btn-success w-100 mt-3">Volver</a>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )


}

export default UpdateForm