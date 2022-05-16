function Login() {
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
                        <form>

                            <h2 className="mb-4">
                                Acceso
                            </h2>
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Ingrese un usuario válido" />
                                <label className="form-label" for="form3Example3">Usuario</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                                <label className="form-label" for="form3Example4">Contraseña</label>
                            </div>
                            <div className="form-outline mb-3">
                                <button className="btn btn-primary btn-lg w-50">Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Login
