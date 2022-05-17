function DeviceForm() {
    return (

        <>
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
           </>

    )
}
export default DeviceForm