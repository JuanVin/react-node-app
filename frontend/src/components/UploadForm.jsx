import { useEffect, useState } from "react"
import apis from "./apiFunctions"
function UploadForm(params) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [postData, setPostData] = useState(null)

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    const getFetchData = async () => {
        setData(await apis.getFormData())
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <h1>Cargando</h1>
        )
    }
    async function sendData() {
        const radioButtons = document.querySelectorAll('input[name="opcion_turno"]');
        const egress_date = document.getElementById("f_egreso")
        let fetchData = {
            FiscalOfficeId: document.getElementById("o_fiscal").value,
            FiscalUnitId: document.getElementById("u_fiscal").value,
            ConditionId: document.getElementById("condicion").value,
            admission_date: document.getElementById("f_ingreso").value,
            egress_date: document.getElementById("f_egreso").value,
            shift_date: document.getElementById("f_turno").value,
            detail: document.getElementById("detalle").value,
            TechnicalId: document.getElementById("tecnico").value,
            file_number: document.getElementById("expediente").value.replace('/', ''),
            file_type: document.getElementById("tipo_expediente").value,
        }

        setPostData(await apis.postFormData(fetchData))
        params.setRefreshData(1)

    }
    function loadTechnician() {
        let techData = []
        techData.push(
            <option value={0}>No asignado</option>
        )
        data.technicians.map(technician => {
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
        data.fiscalOffices.map((fiscalOffice) => {
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
        data.fiscalUnits.map((fiscalUnit) => {
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
        data.condition.map((singleCondition) => {
            fileCondition.push(
                <option value={singleCondition.id}>{capitalizarPrimeraLetra(singleCondition.condition)}</option>
            )
        })
        return fileCondition
    }
    function postStatus() {
        if (postData != null)
            if (postData.status === 1) {
                return (
                    <div class="alert alert-success d-flex align-items-center mt-3" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div>
                            {postData.message}
                        </div>
                    </div>
                )
            } else {
                return (

                    <div class="alert alert-danger d-flex align-items-center mt-3" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            {postData.message}
                        </div>
                    </div>

                )
            }
        return null
    }
    return (
        <form className="w-75">
            <div className="form-group">
                <p> Número de expediente </p>
                <select className="form-select d-inline w-25 text-center" id="tipo_expediente" name="select">
                    <option value="1" selected>P-</option>
                    <option value="2">T-</option>
                </select>
                <input type="text" id="expediente" className="form-control d-inline  w-75" required />
            </div>
            <div className="form-group p-1">
                <div className="form-group">
                    <p>Turno otorgado: </p>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="opcion_turno" id="opcion_turno1" value="1"></input>
                    <label className="form-check-label" for="opcion_turno1">
                        Si
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="opcion_turno" id="opcion_turno2" value="2" checked></input>
                    <label className="form-check-label" for="opcion_turno2">
                        No
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="opcion_turno" id="opcion_turno3" value="3"></input>
                    <label className="form-check-label" for="opcion_turno3">
                        Acto
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="u_fiscal">Unidad Fiscal</label>
                        <select className="form-control" id="u_fiscal" required>
                            {loadFiscalUnits()}
                        </select>
                    </div>
                </div>
                <div class="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" or="o_fiscal">Oficina Fiscal</label>
                        <select className="form-control" id="o_fiscal" required>
                            {loadFiscalOffices()}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div class="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_ingreso">Fecha ingreso</label>
                        <input className="form-control" type="date" id="f_ingreso"
                            name="meeting-time"
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_egreso">Fecha egreso</label>
                        <input className="form-control" type="date" id="f_egreso"
                            name="meeting-time"
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
            </div>
            <div className="form-group mt-3">
                <label className="p-1" for="f_turno">Fecha turno</label>

                <input className="form-control" type="datetime-local" id="f_turno"
                    name="meeting-time"
                    min="2022-01-01T00:00" max="2100-06-14T00:00" required></input>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="condicion">Condición </label>
                        <select className="form-control" id="condicion" required>
                            {loadCondition()}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="tecnico">Técnico </label>
                        <select className="form-control" id="tecnico" required>
                            {loadTechnician()}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group mt-3">
                <label className="p-1" for="detalle">Detalle</label>
                <textarea class="form-control" id="detalle" rows="3" required></textarea>
            </div>
            <div className="row">
                <div className="col">
                    <div class="form-check mt-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" for="flexCheckDefault">
                            Enviar correo
                        </label>
                    </div>
                </div>
                <div className="col">
                    <button className="mt-3 w-100 btn btn-primary" type="button" onClick={sendData}>Cargar expediente</button>
                </div>
            </div>
            {postStatus()}
        </form>
    )
}

export default UploadForm