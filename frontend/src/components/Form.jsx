import apis from "./apiFunctions"
import { useState, useEffect } from "react"
import ModalDetails from "./ModalDetails"
import Message from "./Message"
function Form(params) {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [postData, setPostData] = useState(null)
    const [message, setMessage] = useState(null)
    let fileData = params.data

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    useEffect(() => {
        if (postData !== null) {
            setMessage({ message: postData.message, status: postData.status })
        }
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
    async function sendUpdateData() {

        let fetchData = {
            FiscalOfficeId: document.getElementById("o_fiscal_act").value,
            FiscalUnitId: document.getElementById("u_fiscal_act").value,
            ConditionId: document.getElementById("condicion_act").value,
            admission_date: document.getElementById("f_ingreso_act").value,
            egress_date: document.getElementById("f_egreso_act").value,
            shift_date: document.getElementById("f_turno_act").value,
            TechnicalId: document.getElementById("tecnico_act").value,
            file_number: document.getElementById("expediente_act").value.replace('/', '').trim(),
            file_type: document.getElementById("tipo_expediente_act").value,
            file_id: fileData.id,
            date_id: fileData.FileDateId
        }
        setPostData(await apis.postUpdateData(fetchData))

    }
    function loadTechnician(param) {
        let techData = []
        techData.push(
            <option value={0}>No asignado</option>
        )
        data.technicians.forEach(technician => {
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
        data.fiscalOffices.forEach((fiscalOffice) => {
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
        data.fiscalUnits.forEach((fiscalUnit) => {
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
        data.condition.forEach((singleCondition) => {
            if (singleCondition.id === param) {
                fileCondition.push(
                    <option value={singleCondition.id} selected>{capitalizarPrimeraLetra(singleCondition.condition)}</option>
                )
            } else {
                fileCondition.push(
                    <option value={singleCondition.id}>{capitalizarPrimeraLetra(singleCondition.condition)}</option>
                )
            }
        })
        return fileCondition
    }
    function loadTypes(param) {
        let fileType = []
        data.types.forEach(type => {
            if (type.id === param) {
                fileType.push(
                    <option value={type.id} selected>{type.type.toUpperCase() + "-"}</option>
                )
            } else {
                fileType.push(
                    <option value={type.id}>{type.type.toUpperCase() + "-"}</option>
                )
            }
        })
        fileType.push(
            <option value={0}>{"Sin asignar"}</option>
        )
        return fileType
    }
    function setValueDates(param, option) {
        if (param !== null) {
            let date = new Date(param)
            if (option === 1) {
                date.setHours(date.getHours() - 3)
                return date.toISOString().substr(0, 16)
            }
            return date.toISOString().substr(0, 10)
        }
        return param
    }
    return (

        <>
            <Message props={message}></Message>
            <p className="p-1"> Número de expediente </p>
            <div className="input-group w-100">
                <select className="form-select d-inline w-25 text-center" id="tipo_expediente_act" name="select" >
                    {loadTypes(fileData.FileTypeId)}
                </select>
                <input type="text" id="expediente_act" className="form-control d-inline w-75" defaultValue={fileData.file_number.replace('p-', '')} required />
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
            </div><div className="row">
                <div className="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" for="u_fiscal_act">Unidad Fiscal</label>
                        <select className="form-control" id="u_fiscal_act" required>
                            {loadFiscalUnits(fileData.FiscalUnitId)}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="mt-3 form-group">
                        <label className="p-1" or="o_fiscal_act">Oficina Fiscal</label>
                        <select className="form-control" id="o_fiscal_act" required>
                            {loadFiscalOffices(fileData.FiscalOfficeId)}
                        </select>
                    </div>
                </div>
            </div><div className="row">
                <div className="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_ingreso_act">Fecha ingreso</label>
                        <input className="form-control" type="date" id="f_ingreso_act"
                            name="meeting-time" defaultValue={setValueDates(fileData.FileDate.admission_date, 0)}
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group mt-3">
                        <label className="p-1" for="f_egreso_act">Fecha egreso</label>
                        <input className="form-control" type="date" id="f_egreso_act"
                            name="meeting-time" defaultValue={setValueDates(fileData.FileDate.egress_date, 0)}
                            min="2022-01-01" max="2100-06-14"></input>
                    </div>
                </div>
            </div><div className="form-group mt-3">
                <label className="p-1" for="f_turno_act">Fecha turno</label>
                <input className="form-control" type="datetime-local" id="f_turno_act"
                    name="meeting-time"
                    min="2022-01-01T00:00" max="2100-06-14T00:00" defaultValue={setValueDates(fileData.FileDate.shift_date, 1)} required></input>
            </div>
            <div className="row">
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
            </div>
            <div className="row">
                <div className="col">
                    <ModalDetails details={{ file_detail: fileData.Details, file_id: fileData.id }}></ModalDetails>
                </div>
                <div className="col">
                    <button className="mt-3 btn btn-dark w-100 m-1 btn-lg" type="button" onClick={sendUpdateData}>Actualizar expediente</button>
                </div>
            </div>
        </>
    )
}

export default Form