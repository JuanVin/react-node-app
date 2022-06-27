import { useState, useEffect } from "react"
function CellForm({ deviceNumber }) {
    const [simcardNumber, setSimcardNumber] = useState("1")
    const [imeiNumber, setImeiNumber] = useState("1")
    const [loading, setLoading] = useState(true)
    const [simcard, setSimcard] = useState("")
    const [simcard1, setSimcard1] = useState("")
    const [company, setCompany] = useState("")
    const [company1, setCompany1] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")

    useEffect(() => {
        getDataFromLocalStorage()
    }, [])

    async function getDataFromLocalStorage() {

        let data = await localStorage.getItem(deviceNumber);
        data = await JSON.parse(data)
        if (data !== null) {
            setSimcard(data.simcard)
            setCompany(data.company)
            setBrand(data.brand)
            setModel(data.model)
            setLoading(false)
        }
        else {
            setLoading(false)
        }

    }

    function handleLocalStorage() {
        localStorage.setItem(deviceNumber,
            JSON.stringify({
                simcard: simcard,
                company: company,
                brand: brand,
                model: model
            }))
    }

    function setSimcards() {
        if (simcardNumber !== null) {
            switch (simcardNumber) {
                case "1":
                    return (
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="simcard">Simcard</label>
                                    <input type="text" value={simcard} onChange={(e) => setSimcard(e.target.value)} className="form-control" id="simcard" ></input>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="company">Empresa</label>
                                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="form-control" id="company" ></input>
                                </div>
                            </div>
                        </div>
                    )

                case "2":
                    return (
                        <>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="simcard1">Simcard 1</label>
                                        <input type="text" value={simcard} onChange={e => setSimcard(e.target.value)} className="form-control" id="simcard1"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="company1">Empresa 2</label>
                                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="form-control" id="company1"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="simcard2">Simcard 2</label>
                                        <input type="text" value={simcard1} onChange={e => setSimcard1(e.target.value)} className="form-control" id="simcard2"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="company2">Empresa 2</label>
                                        <input type="text" value={company1} onChange={e => setCompany1(e.target.value)} className="form-control" id="company2"></input>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                default:
                    break;
            }
        }
    }
    function setImeis() {
        if (imeiNumber !== null) {
            switch (imeiNumber) {
                case "1":
                    return (
                        <div className="form-group">
                            <label htmlFor="imei">IMEI</label>
                            <input type="text" className="form-control" id="imei" ></input>
                        </div>
                    )

                case "2":
                    return (
                        <>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="imei1">IMEI 1</label>
                                        <input type="text" className="form-control" id="imei1"></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="imei2">IMEI 2</label>
                                        <input type="text" className="form-control" id="imei2"></input>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                default:
                    break;
            }
        }
    }
    if (loading) {
        return (
            "cargando"
        )
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="w-50 mt-5 border p-3 rounded">
                    <h1 className="border bg-dark text-white w-100 text-center rounded">Celular</h1>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="brand">Marca</label>
                                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control" id="brand" ></input>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="model">Modelo</label>
                                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="form-control" id="model" ></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="simcardSelect">Simcard?</label>
                        <select className="form-control" value={simcardNumber} onChange={(e) => { setSimcardNumber(e.target.value) }} id="simcardSelect">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">No posee</option>
                        </select>
                    </div>
                    {setSimcards()}
                    <div className="form-group">
                        <label htmlFor="imeiSelected">IMEI?</label>
                        <select className="form-control" value={imeiNumber} onChange={(e) => { setImeiNumber(e.target.value) }} id="imeiSelected">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">No visible/No legible</option>
                        </select>
                    </div>
                    {setImeis()}

                    <div className="form-group">
                        <label htmlFor="detalle">Detalle</label>
                        <textarea className="form-control" id="detalle" rows="1"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="extraction">Extracción</label>
                        <textarea className="form-control" id="extraction" rows="3"></textarea>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-success text-center mt-1" onClick={handleLocalStorage}>Cargar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CellForm