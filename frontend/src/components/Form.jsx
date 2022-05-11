import apis from "./apiFunctions"
import { useState, useEffect } from "react"
function Form(params) {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [postData, setPostData] = useState(null)

    let fileData = params.data
    console.log(fileData)
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
    async function sendUpdateData() {

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
            file_id: fileData.id,
            date_id: fileData.FileDateId
        }
        setPostData(await apis.postUpdateData(fetchData))
        params.setRefreshData(1)

    }
    function loadTechnician(param) {
        let techData = []
        techData.push(
            <option value={0}>No asignado</option>
        )
        data.technicians.map(technician => {
            if (technician.id === param) {
                techData.push(
                    <option value={technician.id} selected>{(technician.name).toUpperCase()}</option>
                )
            } else {
                techData.push(
                    <option value={technician.id}>{(technician.name).toUpperCase()}</option>
                )
            }
        })

        return techData
    }
    function loadFiscalOffices(param) {
        let fiscalData = []
        fiscalData.push(
            <option value={0}>No asignado</option>
        )
        data.fiscalOffices.sort()
        data.fiscalOffices.map((fiscalOffice) => {
            if (fiscalOffice.id === param) {
                fiscalData.push(
                    <option value={fiscalOffice.id} selected>{capitalizarPrimeraLetra(fiscalOffice.name)}</option>
                )
            } else {
                fiscalData.push(
                    <option value={fiscalOffice.id}>{capitalizarPrimeraLetra(fiscalOffice.name)}</option>
                )
            }
        })
        return fiscalData
    }
    function loadFiscalUnits(param) {
        let fiscalData = []
        fiscalData.push(
            <option value={0}>No asignado</option>
        )
        data.fiscalUnits.sort()
        data.fiscalUnits.map((fiscalUnit) => {
            if (fiscalUnit.id === param) {
                fiscalData.push(
                    <option value={fiscalUnit.id} selected>{fiscalUnit.District.name + " - " + capitalizarPrimeraLetra(fiscalUnit.name)}</option>
                )
            } else {
                fiscalData.push(
                    <option value={fiscalUnit.id}>{fiscalUnit.District.name + " - " + capitalizarPrimeraLetra(fiscalUnit.name)}</option>
                )
            }

        })
        return fiscalData
    }
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function loadCondition(param) {
        
        let fileCondition = []
        data.condition.map((singleCondition) => {
            if(singleCondition.id === param){
                fileCondition.push(
                    <option value={singleCondition.id} selected>{capitalizarPrimeraLetra(singleCondition.condition)}</option>
                )
            }else{
                fileCondition.push(
                    <option value={singleCondition.id}>{capitalizarPrimeraLetra(singleCondition.condition)}</option>
                )
            }
        })
        return fileCondition
    }
    function setShiftValue(param){
        if (param !== null ) {
            let date = new Date(param)
            date.setHours(date.getHours() - 3)
            return date.toISOString().substr(0,16)
        }
        return param
        
    } 
 
    return (

        <>
            <div className="form-group">
                <p> Número de expediente </p>
                <select className="form-select d-inline w-25 text-center" id="tipo_expediente_act" name="select" >
                    <option value="1" selected>P-</option>
                    <option value="2">T-</option>
                </select>
                <input type="text" id="expediente_act" className="form-control d-inline w-75" defaultValue={fileData.file_number.replace('p-', '')} required />
            </div><div className="form-group p-1">
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
            </div><div className="row">
                <div className="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="u_fiscal_act">Unidad Fiscal</label>
                        <select className="form-control" id="u_fiscal_act" required>
                            {loadFiscalUnits(fileData.FiscalUnitId)}
                        </select>
                    </div>
                </div>
                <div class="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" or="o_fiscal_act">Oficina Fiscal</label>
                        <select className="form-control" id="o_fiscal_act" required>
                            {loadFiscalOffices(fileData.FiscalOfficeId)}
                        </select>
                    </div>
                </div>
            </div><div className="row">
                <div class="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_ingreso_act">Fecha ingreso</label>
                        <input className="form-control" type="date" id="f_ingreso_act"
                            name="meeting-time"
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
                <div class="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_egreso_act">Fecha egreso</label>
                        <input className="form-control" type="date" id="f_egreso_act"
                            name="meeting-time"
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
            </div><div className="form-group mt-3">
                <label className="p-1" for="f_turno_act">Fecha turno</label>
                <input className="form-control" type="datetime-local" id="f_turno_act"
                    name="meeting-time"
                    min="2022-01-01T00:00" max="2100-06-14T00:00" defaultValue={setShiftValue(fileData.FileDate.shift_date)}required></input>
            </div><div className="row">
                <div className="col">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="condicion_act">Condición </label>
                        <select className="form-control" id="condicion_act" required>
                            {loadCondition(fileData.ConditionId)}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="tecnico_act">Técnico </label>
                        <select className="form-control" id="tecnico_act" required>
                            {loadTechnician(fileData.TechnicalId)}
                        </select>
                    </div>
                </div>
            </div><div className="form-group mt-3">
                <label className="p-1" for="detalle_act">Detalle</label>
                <textarea class="form-control" id="detalle_act" rows="3" required></textarea>
            </div>
            <button className="mt-3 w-100 btn btn-primary" type="button" onClick={sendUpdateData}>Cargar expediente</button>
        </>

    )
}

export default Form