import { useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth.service"
import Message from "../../commons/Message"
import validate from "./validation";
function Login({ setShowNav }) {
    const initialValues = { username: "", password: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [message, setMessage] = useState("")
    let navigate = useNavigate();
    setShowNav(false)

    async function handleLogin(e) {
        e.preventDefault();
        const aux = validate(formValues)
        setFormErrors(aux)
        if (Object.keys(aux).length === 0) {
            const query = await AuthService.login(formValues)
            if (query.response.accessToken) {
                navigate('/');
                window.location.reload();
            } else {
                setMessage({ message: query.response.message, status: query.status })
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    return (

        <section className="vh-100" style={{ marginTop: "100px" }}>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5" style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <img src="https://datos.gob.es/sites/default/files/styles/image_json_ld/public/bigdata.png"
                            className="img-fluid" alt="Sample image"></img>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        {message !== ""
                            ?
                            <Message props={message}></Message>
                            :
                            ""
                        }
                        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                        <form onSubmit={(e) => handleLogin(e)}>
                            <h2 className="mb-4">
                                Acceso
                            </h2>
                            <div className="form-outline mb-4">
                                <p className="text-danger">{formErrors.username}</p>
                                <input type="text" name="username" defaultValue={formValues.userName} onChange={handleChange} className="form-control form-control-lg"
                                    placeholder="Ingrese un usuario válido" />
                                <label className="form-label" htmlFor="username">Usuario</label>
                            </div>
                            <div className="form-outline mb-3">
                                <p className="text-danger">{formErrors.password}</p>
                                <input type="password" name="password" defaultValue={formValues.password} onChange={handleChange} className="form-control form-control-lg"
                                    placeholder="Enter password" />
                                <label className="form-label" htmlFor="password">Contraseña</label>
                            </div>
                            <div className="form-outline mb-3">
                                <button type="submit" className="btn btn-primary btn-lg w-50">Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Login
