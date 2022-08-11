import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import apis from "../../../services/apiCalls";
import Form from "./Form"
import Loading from "../../commons/Loading"
import AuthService from "../../../services/auth.service";
import checkUserAndRole from "../../../services/checkUserAndRole";

function UpdateForm() {
    const [isLoading, setIsLoading] = useState(true)
    const [fetchFile, setFetchFile] = useState(null)
    const Navigate = useNavigate()
    let { id } = useParams();

    useEffect(() => {
        checkUser()
    }, [isLoading])

    async function checkUser() {
        if (await checkUserAndRole.checkUser()) {
            getFetchData()
        } else {
            AuthService.logout()
            Navigate("/login")
            window.location.reload();
        }
    }

    const handleReturn = () => {
        Navigate(-1)
    }

    async function getFetchData() {
        let query = await apis.getFileById(id)
        if (query.status === 200) {
            setFetchFile(query.response)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
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