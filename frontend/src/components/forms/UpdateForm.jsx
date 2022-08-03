import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import apis from "../../services/apiCalls";
import Form from "./Form"
import Loading from "../commons/Loading"
import UserService from "../../services/user.service";

function UpdateForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [fetchFile, setFetchFile] = useState(null)
    const [content, setContent] = useState("")
    const Navigate = useNavigate()
    let { id } = useParams();

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    const handleReturn = () => {
        Navigate(-1)
    }
    async function getFetchData() {

        let fetchData = await apis.getFileById(id)
        setContent(await UserService.getUserBoard())
        setFetchFile(fetchData)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }
    if (content.status !== "") {
        if (content.status !== 200) {
            Navigate("/login")
            window.location.reload();
        }
    }
    return (
        <>
            <div className="bg-light shadow p-3 rounded" style={{
                display: "flex",
                justifyContent: "center",
                height: "100%"
            }}>
                <div className="mt-5 w-50">
                    <h1 className="mb-5 text-center">Actualizar / Modificar expediente</h1>
                    <Form data={fetchFile}></Form>
                    <button className="btn btn-outline-success w-100 mt-3" onClick={() => handleReturn()}><b>Volver</b></button>
                </div>
            </div>
        </>
    )
}

export default UpdateForm