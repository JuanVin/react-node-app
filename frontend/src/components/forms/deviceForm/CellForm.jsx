import { useState, useEffect } from "react"
function CellForm({ deviceNumber, fileExtraction, setFileExtraction }) {
    const [simcardNumber, setSimcardNumber] = useState("1")
    const [imeiNumber, setImeiNumber] = useState("1")
    const [loading, setLoading] = useState(true)
    const [simcard, setSimcard] = useState("")
    const [simcard1, setSimcard1] = useState("")
    const [company, setCompany] = useState("")
    const [company1, setCompany1] = useState("")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [batteryOpt, setBatteryOpt] = useState("1")
    const [batteryBrand, setBatteryBrand] = useState("")
    const [batteryModel, setBatteryModel] = useState("")

    useEffect(() => {
        getDataFromLocalStorage()
    }, [])

    async function getDataFromLocalStorage() {
        
        let data = await localStorage.getItem(fileExtraction.file);
        data = await JSON.parse(data)

        if (data !== null) {
            setSimcard(data.extraction[deviceNumber].simcard)
            setCompany(data.extraction[deviceNumber].company)
            setBrand(data.extraction[deviceNumber].brand)
            setModel(data.extraction[deviceNumber].model)
            setLoading(false)
        }
        else {
            setLoading(false)
        }

    }

    function handleLocalStorage() {
        
        fileExtraction.extraction[deviceNumber] = {
            simcard: simcard,
            company: company,
            brand: brand,
            model: model
        }
        localStorage.setItem(fileExtraction.file, JSON.stringify(fileExtraction))
        setFileExtraction(fileExtraction)
        
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
                                    <input type="number" value={simcard} onChange={(e) => setSimcard(e.target.value)} className="form-control" id="simcard" required></input>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="company">Empresa</label>
                                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="form-control" id="company" required></input>
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
                                        <input type="number" value={simcard} onChange={e => setSimcard(e.target.value)} className="form-control" id="simcard1" required></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="company1">Empresa 2</label>
                                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="form-control" id="company1" required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="simcard2">Simcard 2</label>
                                        <input type="number" value={simcard1} onChange={e => setSimcard1(e.target.value)} className="form-control" id="simcard2" required></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="company2">Empresa 2</label>
                                        <input type="text" value={company1} onChange={e => setCompany1(e.target.value)} className="form-control" id="company2" required></input>
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
    function setBattery(){
        switch (batteryOpt) {
            case "1":
                return(
                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="simcard">Marca</label>
                                <input type="text" value={batteryBrand} onChange={(e) => setBatteryBrand(e.target.value)} className="form-control" id="simcard" required></input>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="company">Modelo</label>
                                <input type="text" value={batteryModel} onChange={(e) => setBatteryModel(e.target.value)} className="form-control" id="company" required></input>
                            </div>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }   
    function setImeis() {
        if (imeiNumber !== null) {
            switch (imeiNumber) {
                case "1":
                    return (
                        <div className="form-group">
                            <label htmlFor="imei">IMEI</label>
                            <input type="number" className="form-control" id="imei" required></input>
                        </div>
                    )

                case "2":
                    return (
                        <>
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="imei1">IMEI 1</label>
                                        <input type="number" className="form-control" id="imei1" required></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="imei2">IMEI 2</label>
                                        <input type="number" className="form-control" id="imei2" required></input>
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
            <div className="p-3 bg-light">
                <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="brand">Marca</label>
                                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control" id="brand" required></input>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="model">Modelo</label>
                                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="form-control" id="model" required></input>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <label htmlFor="simcardSelect">Simcard?</label>
                        <select className="form-control" value={simcardNumber} onChange={(e) => { setSimcardNumber(e.target.value) }} id="simcardSelect">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">No posee</option>
                        </select>
                    </div>
                    {setSimcards()}
                    <hr />
                    <div className="form-group">
                        <label htmlFor="batterySelect">Batería?</label>
                        <select className="form-control" value={batteryOpt} onChange={(e) => { setBatteryOpt(e.target.value) }} id="batterySelect">
                            <option value="1">Posee</option>
                            <option value="2">No posee</option>
                            <option value="3">Integrada</option>
                        </select>
                    </div>
                    {setBattery()}
                    <hr />
                    <div className="form-group">
                        <label htmlFor="imeiSelected">IMEI?</label>
                        <select className="form-control" value={imeiNumber} onChange={(e) => { setImeiNumber(e.target.value) }} id="imeiSelected">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">No visible/No legible</option>
                        </select>
                    </div>
                    {setImeis()}
                    <hr />
                    <div className="form-group">
                        <label htmlFor="detalle">Detalle</label>
                        <textarea className="form-control" id="detalle" rows="1"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="extraction">Extracción</label>
                        <textarea className="form-control" id="extraction" rows="3"></textarea>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-success text-center mt-1" onClick={() => handleLocalStorage()}>Cargar</button>
                    </div>
            </div>
                    
            
        </>
    )
}
export default CellForm