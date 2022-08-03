import { useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthService from "./../../services/auth.service"
function Login({setShowNav}) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    let navigate = useNavigate();
    setShowNav(false)
    async function handleLogin(e) {
        e.preventDefault();
        const response = await AuthService.login(userName, password)
        if (response.accessToken) {
            navigate('/');
            window.location.reload();
        }else{
            setMessage(response.message)
        }
    }

    return (

        <section className="vh-100" style={{ marginTop: "100px" }}>
            <div classNames="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5" style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <img src="https://datos.gob.es/sites/default/files/styles/image_json_ld/public/bigdata.png"
                            className="img-fluid" alt="Sample image"></img>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={(e) => handleLogin(e)}>
                            <h2 className="mb-4">
                                Acceso
                            </h2>
                            <div className="form-outline mb-4">
                                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} id="username" className="form-control form-control-lg"
                                    placeholder="Ingrese un usuario válido" />
                                <label className="form-label" for="username">Usuario</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                                <label className="form-label" for="password">Contraseña</label>
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
