import { AiOutlineCheck, AiOutlineCloseCircle, AiOutlineWarning } from "react-icons/ai";

function DeviceForm() {
    return (

        <>
            {/* 
            <div className="row w-75">
                <div className="col">
                    <label for="brand" className="p-1">Marca</label>
                    <input type="text" className="form-control" id="brand" placeholder="Marca" required></input>
                    <label for="imei" className="p-1">IMEI</label>
                    <input type="text" className="form-control" id="imei" placeholder="Numero IMEI" required></input>
                    <label for="micro" className="p-1">MicroSD</label>
                    <input type="text" className="form-control" id="micro" placeholder="Numero IMEI" required></input>
                </div>
                <div className="col">
                    <label for="model" className="p-1">Modelo</label>
                    <input type="text" className="form-control" id="model" placeholder="Modelo" required></input>
                    <label for="model" className="p-1">Simcard</label>
                    <input type="text" className="form-control" id="model" placeholder="Modelo" required></input>
                </div>

                <label for="deviceDetail" className="p-1">Detalle</label>
                <textarea className="form-control" id="deviceDetail"></textarea>
            </div>
            */
                <>
                    <div className="w-100 p-1">
                        <div className="form-group">
                            <h3 style={{ color: "grey", marginLeft: "15px" }}>Física</h3>
                            <table class="table table-sm">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col" style={{maxWidth: "100px" }}>Decrypted Boot Loader </th>
                                        <th scope="col" style={{maxWidth: "100px" }}>Boot Loader</th>
                                        <th scope="col" style={{maxWidth: "100px" }}>ADB</th>
                                        <th scope="col" style={{maxWidth: "100px" }}>EDL</th>
                                        <th scope="col" style={{maxWidth: "100px" }}>Qualcomm</th>
                                        <th scope="col" style={{maxWidth: "100px" }}>Advanced ADB</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td className="text-center" style={{ color: "rgb(51, 160, 51)", fontSize: "35px", maxWidth: "150px" }}><AiOutlineCheck /></td>
                                        <td className="text-center" style={{ color: "grey", fontSize: "20px" }}></td>
                                        <td className="text-center" style={{ color: "grey", fontSize: "20px" }}></td>
                                        <td className="text-center" style={{ color: "grey", fontSize: "20px" }}></td>
                                        <td className="text-center" style={{ color: "rgb(180, 180, 0)", fontSize: "35px" }}> <AiOutlineWarning/></td>
                                        <td className="text-center" style={{ color: "grey", fontSize: "20px" }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="form-group">
                            <h3 style={{ color: "grey", marginLeft: "15px" }}>Lógica</h3>
                            <table class="table">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">Lógica</th>
                                        <th scope="col">Lógica avanzada</th>
                                        <th scope="col">otro</th>
                                        <th scope="col">otro</th>
                                        <th scope="col">otro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td></td>
                                        <td style={{ color: "rgb(51, 160, 51)", fontSize: "35px" }}><AiOutlineCheck /></td>
                                        <td></td>
                                        <td style={{ fontSize: "40px", color: "rgb(241, 83, 83)" }}><AiOutlineCloseCircle /></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form-group">
                            <h3 style={{ color: "grey", marginLeft: "15px" }}>Sistema de archivos</h3>
                            <table class="table">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">ADB</th>
                                        <th scope="col">Full File System</th>
                                        <th scope="col">Android Backup</th>
                                        <th scope="col">APK Downgrade</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td></td>
                                        <td></td>
                                        <td style={{ color: "rgb(51, 160, 51)", fontSize: "35px" }}><AiOutlineCheck /></td>
                                        <td style={{ color: "rgb(51, 160, 51)", fontSize: "35px" }}><AiOutlineCheck /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <h3 style={{ color: "grey", marginLeft: "15px" }}>Simcard</h3>
                                    <table class="table">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col">Volcado</th>
                                                <th scope="col">No posee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center">
                                                <td style={{ fontSize: "40px", color: "rgb(241, 83, 83)" }}><AiOutlineCloseCircle /></td>
                                                <td><img style={{ width: "40px" }} src=""></img></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col">
                                    <h3 style={{ color: "grey", marginLeft: "15px" }}>MicroSD</h3>
                                    <table class="table">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col">Volcado</th>
                                                <th scope="col">No posee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center">
                                                <td><img style={{ width: "40px" }} src=""></img></td>
                                                <td style={{ color: "rgb(51, 160, 51)", fontSize: "35px" }}><AiOutlineCheck /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    )
}
export default DeviceForm