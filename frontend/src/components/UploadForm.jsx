import { useEffect, useState } from "react"
import apis from "./apiFunctions"
import Message from "./Message"
import Loading from "./Loading"
function UploadForm(params) {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [postData, setPostData] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    useEffect(() => {
        if (postData !== null) setMessage({ message: postData.message, status: postData.status })
    }, [postData !== null])

    const getFetchData = async () => {
        setData(await apis.getFormData())
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <h1>Cargando</h1>
        )
    }
    async function sendUploadData() {

        let fetchData = {
            FiscalOfficeId: document.getElementById("o_fiscal_act").value,
            FiscalUnitId: document.getElementById("u_fiscal_act").value,
            ConditionId: document.getElementById("condicion_act").value,
            admission_date: document.getElementById("f_ingreso_act").value,
            egress_date: document.getElementById("f_egreso_act").value,
            shift_date: document.getElementById("f_turno_act").value,
            detail: document.getElementById("detalle_act").value,
            TechnicalId: document.getElementById("tecnico_act").value,
            file_number: document.getElementById("expediente_act").value.replace('/', ''),
            file_type: document.getElementById("tipo_expediente_act").value,
        }

        setPostData(await apis.postFormData(fetchData))
        params.setRefreshData(1)

    }
    function loadTechnician() {
        let techData = []
        techData.push(
            <option value={0}>No asignado</option>
        )
        data.technicians.forEach(technician => {
            techData.push(
                <option value={technician.id}>{(technician.name).toUpperCase()}</option>
            )
        })

        return techData
    }
    function loadFiscalOffices() {
        let fiscalData = []
        fiscalData.push(
            <option value={0}>{"Sin asignar"}</option>
        )
        data.fiscalOffices.sort()
        data.fiscalOffices.forEach((fiscalOffice) => {
            fiscalData.push(
                <option value={fiscalOffice.id}>{capitalizarPrimeraLetra(fiscalOffice.name)}</option>
            )
        })
        return fiscalData
    }
    function loadFiscalUnits() {
        let fiscalData = []
        fiscalData.push(
            <option value={0}>{"Sin asignar"}</option>
        )
        data.fiscalUnits.sort()
        data.fiscalUnits.forEach((fiscalUnit) => {
            fiscalData.push(
                <option value={fiscalUnit.id}>{fiscalUnit.District.name + " - " + capitalizarPrimeraLetra(fiscalUnit.name)}</option>
            )
        })
        return fiscalData
    }
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function loadCondition() {
        let fileCondition = []
        data.condition.forEach((singleCondition) => {
            fileCondition.push(
                <option value={singleCondition.id}>{capitalizarPrimeraLetra(singleCondition.condition)}</option>
            )
        })
        return fileCondition
    }
    function loadTypes() {
        let fileType = []
        data.types.forEach(type => {
            fileType.push(
                <option value={type.id}>{type.type.toUpperCase() + "-"}</option>
            )
        })
        fileType.push(
            <option value={0}>{"Sin asignar"}</option>
        )
        return fileType
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (

        <div className="w-75">
            <Message props={message}></Message>
            <div className="form-group">
                <p> Número de expediente </p>
                <div className="input-group w-100">
                    <select className="form-select d-inline w-25 text-center" id="tipo_expediente_act" name="select">
                        {loadTypes()}
                    </select>
                    <input type="text" id="expediente_act" className="form-control d-inline w-75" required />
                </div>
            </div>
            <div className="form-group p-1">
                <div className="form-group">
                    <p>Turno otorgado: </p>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="opcion_turno" id="opcion_turno1" defaultValue="1"></input>
                    <label className="form-check-label" for="opcion_turno1">
                        Si
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="opcion_turno" id="opcion_turno2" defaultValue="2" checked></input>
                    <label className="form-check-label" for="opcion_turno2">
                        No
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="opcion_turno" id="opcion_turno3" defaultValue="3"></input>
                    <label className="form-check-label" for="opcion_turno3">
                        Acto
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="u_fiscal_act">Unidad Fiscal</label>
                        <select className="form-control" id="u_fiscal_act" required>
                            {loadFiscalUnits()}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" or="o_fiscal_act">Oficina Fiscal</label>
                        <select className="form-control" id="o_fiscal_act" required>
                            {loadFiscalOffices()}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_ingreso_act">Fecha ingreso</label>
                        <input className="form-control" type="date" id="f_ingreso_act"
                            name="meeting-time"
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_egreso_act">Fecha egreso</label>
                        <input className="form-control" type="date" id="f_egreso_act"
                            name="meeting-time"
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
            </div>
            <div className="form-group mt-3">
                <label className="p-1" for="f_turno_act">Fecha turno</label>

                <input className="form-control" type="datetime-local" id="f_turno_act"
                    name="meeting-time"
                    min="2022-01-01T00:00" max="2100-06-14T00:00" required></input>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="condicion_act">Condición </label>
                        <select className="form-control" id="condicion_act" required>
                            {loadCondition()}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="tecnico_act">Técnico </label>
                        <select className="form-control" id="tecnico_act" required>
                            {loadTechnician()}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group mt-3">
                <label className="p-1" for="detalle_act">Detalle</label>
                <textarea className="form-control" id="detalle_act" rows="3" required></textarea>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <div className="form-check mt-3">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                            <label className="form-check-label" for="exampleCheck1">Enviar correo</label>
                        </div>
                    </div>
                    <div className="col">
                        <button className="mt-3 w-100 btn btn-success" type="button" onClick={sendUploadData}>Cargar expediente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadForm