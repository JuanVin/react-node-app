import { useEffect, useState } from "react"
import apis from "./apiFunctions"
function UploadFile() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

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
    function loadFiscalOffices() {
        let fiscalData = []
        data.fiscalOffices.map((fiscalOffice) => {
            fiscalData.push(
                <option>{fiscalOffice.name}</option>
            )
        })
        return fiscalData
    }
    function loadFiscalUnits() {
        let fiscalData = []
        data.fiscalUnits.map((fiscalUnit) => {
            fiscalData.push(
                <option>{fiscalUnit.name + " - " + fiscalUnit.District.name}</option>
            )
        })
        return fiscalData
    }
    function loadCondition() {
        let fileCondition = []
        data.condition.map((singleCondition) => {
            fileCondition.push(
                <option>{singleCondition.condition}</option>
            )
        })
        return fileCondition
    }

    return (
        <div className="container">
            <form className="w-50">
                <div class="row">
                    <div class="col-sm">
                        <div className="mt-3 form-group">
                            <label className="p-1" for="exampleFormControlSelect1">Unidad Fiscal</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                {loadFiscalUnits()}
                            </select>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div className="mt-3 form-group">
                            <label className="p-1" or="exampleFormControlSelect1">Oficina Fiscal</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                {loadFiscalOffices()}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div class="col-sm">
                        <div className="form-group mt-3">
                            <label className="p-1" for="meeting-time">Fecha turno</label>

                            <input className="form-control" type="datetime-local" id="meeting-time"
                                name="meeting-time" value="2018-06-12T19:30"
                                min="2018-06-07T00:00" max="2100-06-14T00:00"></input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div className="form-group mt-3">
                            <label className="p-1" for="meeting-time">Fecha ingreso</label>

                            <input className="form-control" type="date" id="meeting-time"
                                name="meeting-time" value="2018-06-12"
                                min="2018-06-07" max="2100-06-14"></input>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div className="form-group mt-3">
                            <label className="p-1" for="meeting-time">Fecha egreso</label>

                            <input className="form-control" type="date" id="meeting-time"
                                name="meeting-time" value="2018-06-12"
                                min="2018-06-07" max="2100-06-14"></input>
                        </div>
                    </div>
                </div>
                <div className="mt-3 form-group">
                    <label className="p-1" for="exampleFormControlSelect1">Condición </label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        {loadCondition()}
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="p-1" for="exampleFormControlTextarea1">Detalle</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
             


                <button className="mt-3 btn btn-primary" type="submit">Cargar expediente</button>

            </form>
        </div>

    )
}

export default UploadFile