import { useState, useEffect } from "react";
import apis from "../../apiCalls";
function CellForm({ deviceNumber, file, id, loaded, setLoaded }) {
  const [simcardNumber, setSimcardNumber] = useState("1");
  const [imeiNumber, setImeiNumber] = useState("1");
  const [batteryNumber, setBatteryNumber] = useState("1");
  const [microsdNumber, setMicrosdNumber] = useState("1")

  const [simcard, setSimcard] = useState("");
  const [simcard1, setSimcard1] = useState("");
  const [company, setCompany] = useState("");
  const [company1, setCompany1] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [batteryBrand, setBatteryBrand] = useState("");
  const [batteryModel, setBatteryModel] = useState("");
  const [imei, setImei] = useState("");
  const [imei1, setImei1] = useState("");
  const [detail, setDetail] = useState("");
  const [extraction, setExtraction] = useState("");
  const [microsd, setMicrosd] = useState("")
  const [capacity, setCapacity] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    const simcardOpt = () => {
      switch (simcardNumber) {
        case "1":
          return { 1: { simcard: simcard, company: company } };
        case "2":
          return {
            1: { simcard: simcard, company: company },
            2: { simcard1: simcard1, company1: company1 },
          };
        case "3":
          return {
            1: { simcard: "no posee" },
          };
        default:
          break;
      }
    };
    const imeiOpt = () => {
      switch (imeiNumber) {
        case "1":
          return { 1: { imei: imei } };
        case "2":
          return {
            1: { imei: imei },
            2: { imei1: imei1 },
          };
        case "3":
          return {
            1: { imei: "no visible/no posee" },
          };
        default:
          break;
      }
    };
    const batteryOpt = () => {
      switch (batteryNumber) {
        case "1":
          return { brand: batteryBrand, model: batteryModel };
        case "2":
          return {
            1: "No posee",
          };
        case "3":
          return {
            1: "interna integrada",
          };
        default:
          break;
      }
    };
    const microsdOpt = () => {
      switch (microsdNumber) {
        case "1":
          return { type: microsd, capacity: capacity };
        case "2":
          return { 1: "No posee" }
      }
    }

    let fileExtraction = {
      id: id,
      file: file,
      type: 1,
      device: deviceNumber,
      brand: brand,
      model: model,
      imeis: imeiOpt(),
      simcards: simcardOpt(),
      battery: batteryOpt(),
      microsd: microsdOpt(),
      detail: detail,
      extraction: extraction,
    };

    let response = await apis.postNewExtraction(fileExtraction);
    if (response.status === 200) {
      let aux = [...loaded]
      if (!aux.find(element => element === deviceNumber)) {
        aux.push(deviceNumber)
      }
      setLoaded(aux)
    }
  }
  function setSimcardForm() {
    if (simcardNumber !== null) {
      switch (simcardNumber) {
        case "1":
          return (
            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="simcard">Simcard</label>
                  <input
                    type="number"
                    value={simcard}
                    onChange={(e) => setSimcard(e.target.value)}
                    className="form-control"
                    id="simcard"
                    required
                  ></input>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="form-control"
                    id="company"
                    required
                  ></input>
                </div>
              </div>
            </div>
          );
        case "2":
          return (
            <>
              <div className="row mt-3">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="simcard1">Simcard 1</label>
                    <input
                      type="number"
                      value={simcard}
                      onChange={(e) => setSimcard(e.target.value)}
                      className="form-control"
                      id="simcard1"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="company1">Empresa 2</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="form-control"
                      id="company1"
                      required
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="simcard2">Simcard 2</label>
                    <input
                      type="number"
                      value={simcard1}
                      onChange={(e) => setSimcard1(e.target.value)}
                      className="form-control"
                      id="simcard2"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="company2">Empresa 2</label>
                    <input
                      type="text"
                      value={company1}
                      onChange={(e) => setCompany1(e.target.value)}
                      className="form-control"
                      id="company2"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            </>
          );
        default:
          break;
      }
    }
  }
  function setBatteryForm() {
    switch (batteryNumber) {
      case "1":
        return (
          <div className="row mt-3">
            <div className="col">
              <div className="form-group">
                <label htmlFor="simcard">Marca</label>
                <input
                  type="text"
                  value={batteryBrand}
                  onChange={(e) => setBatteryBrand(e.target.value)}
                  className="form-control"
                  id="simcard"
                  required
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="company">Modelo</label>
                <input
                  type="text"
                  value={batteryModel}
                  onChange={(e) => setBatteryModel(e.target.value)}
                  className="form-control"
                  id="company"
                  required
                ></input>
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  }
  function setImeiForm() {
    if (imeiNumber !== null) {
      switch (imeiNumber) {
        case "1":
          return (
            <div className="form-group">
              <label htmlFor="imei">IMEI</label>
              <input
                type="number"
                className="form-control"
                id="imei"
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                minLength={15}
                required
              ></input>
            </div>
          );

        case "2":
          return (
            <>
              <div className="row mt-3">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="imei1">IMEI 1</label>
                    <input
                      type="number"
                      className="form-control"
                      minLength={15}
                      value={imei}
                      onChange={(e) => setImei(e.target.value)}
                      id="imei1"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="imei2">IMEI 2</label>
                    <input
                      type="number"
                      className="form-control"
                      minLength={15}
                      value={imei1}
                      onChange={(e) => setImei1(e.target.value)}
                      id="imei2"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            </>
          );
        default:
          break;
      }
    }
  }
  function setMicrosdForm() {
    if (microsdNumber === "1") {
      return (
        <>
          <div className="row mt-3">
            <div className="col">
              <div className="form-group">
                <label htmlFor="micro-type">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  value={microsd}
                  onChange={(e) => setMicrosd(e.target.value)}
                  id="micro-type"
                  required
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="micro-capacity">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  minLength={15}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  id="micro-capacity"
                  required
                ></input>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="p-3 bg-light shadow-sm rounded">
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
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="form-control" id="model" required ></input>
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
          {setSimcardForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="batterySelect">Batería?</label>
            <select className="form-control" value={batteryNumber} onChange={(e) => { setBatteryNumber(e.target.value) }} id="batterySelect">
              <option value="1">Posee</option>
              <option value="2">No posee</option>
              <option value="3">Integrada</option>
            </select>
          </div>
          {setBatteryForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="imeiSelected">IMEI?</label>
            <select className="form-control" value={imeiNumber} onChange={(e) => { setImeiNumber(e.target.value) }} id="imeiSelected">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">No visible/No legible</option>
            </select>
          </div>
          {setImeiForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="microsd">MicroSD?</label>
            <select className="form-control" value={microsdNumber} onChange={(e) => { setMicrosdNumber(e.target.value) }} id="microsd">
              <option value="1">Posee</option>
              <option value="2">No posee</option>
            </select>
          </div>
          {setMicrosdForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="detalle">Detalle</label>
            <textarea className="form-control" value={detail} onChange={(e) => setDetail(e.target.value)} id="detalle" rows="1" ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="extraction">Extracción</label>
            <textarea className="form-control" id="extraction" rows="3" value={extraction} onChange={(e) => setExtraction(e.target.value)} ></textarea>
          </div>
          <div className="text-center">
            <button className="btn btn-success text-center mt-1">Cargar</button>
          </div>
        </div>
      </form>
    </>
  );
}
export default CellForm;
