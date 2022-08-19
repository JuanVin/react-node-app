function DeviceNumber({ amount }) {
    return (
        <>
            <label htmlFor="model">Dispositivo N°: </label>
            <select className="form-control" value={deviceNumber} onChange={(e) => setDeviceNumber(e.target.value)} id="model">
                {amount.map(device => {
                    return (
                        <option value={device + 1}>{device + 1}</option>
                    )
                })}
            </select>
        </>
    )
}
export default DeviceNumber