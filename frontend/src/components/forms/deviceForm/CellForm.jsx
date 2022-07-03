import { useState, useEffect } from "react";
import apis from "../../apiCalls";
import Loading from "../../commons/Loading";
import Message from "../../commons/Message";
function CellForm({ deviceNumber, file, id, loaded, setLoaded, info }) {
  const [loading, setLoading] = useState(true)
  const [simcardOption, setSimcardOption] = useState("1");
  const [imeiOption, setImeiOption] = useState("1");
  const [batteryOption, setBatteryOption] = useState("1");
  const [microsdOption, setMicrosdOption] = useState("1")

  const [phoneBrand, setPhoneBrand] = useState("")
  const [phoneModel, setPhoneModel] = useState("")
  const [simcardNumber1, setSimcardNumber1] = useState("");
  const [simcardNumber2, setSimcardNumber2] = useState("");
  const [simcardCompany1, setSimcardCompany1] = useState("");
  const [simcardCompany2, setSimcardCompany2] = useState("");
  const [batteryBrand, setBatteryBrand] = useState("");
  const [batteryModel, setBatteryModel] = useState("");
  const [imeiNumber1, setImeiNumber1] = useState("");
  const [imeiNumber2, setImeiNumber2] = useState("");
  const [detail, setDetail] = useState("");
  const [extraction, setExtraction] = useState("");
  const [microsdType, setMicrosdType] = useState("")
  const [microsdCapacity, setMicrosdCapacity] = useState("")

  const [phoneId, setPhoneId] = useState(null)
  const [message, setMessage] = useState(null)

  console.log(message)
  useEffect(() => {
    if (info) {
      setInputValues()
    } else {
      setLoading(false)
    }
  }, [info, loading])

  function setInputValues() {

    setPhoneBrand(info.phoneBrand)
    setPhoneModel(info.phoneModel)

    setSimcardNumber1(info.simcardNumber1)
    setSimcardNumber2(info.simcardNumber2)

    setSimcardCompany1(info.simcardCompany1)
    setSimcardCompany2(info.simcardCompany2)

    setImeiNumber1(info.imeiNumber1)
    setImeiNumber2(info.imeiNumber2)

    setDetail(info.detail)
    setExtraction(info.extraction)

    setBatteryBrand(info.batteryBrand)
    setBatteryModel(info.batteryModel)

    setMicrosdType(info.microsdType)
    setMicrosdCapacity(info.microsdCapacity)

    setLoading(false)

  }

  async function handleSubmit(e) {
    e.preventDefault();
    let fileExtraction = {
      id: id,
      file: file,
      type: 1,
      device: deviceNumber,
      phoneBrand: phoneBrand,
      phoneModel: phoneModel,
      imei: {
        imeiNumber1: imeiNumber1,
        imeiNumber2: imeiNumber2
      },
      simcard: {
        simcard1: {
          number: simcardNumber1,
          company: simcardCompany1
        },
        simcard2: {
          number: simcardNumber2,
          company: simcardCompany2
        }
      },
      battery: {
        brand: batteryBrand,
        model: batteryModel
      },
      microsd: {
        type: microsdType,
        capacity: microsdCapacity
      },
      detail: detail,
      extraction: extraction,
    };

    if (info || phoneId) {
      if (phoneId) {
        fileExtraction.phoneId = phoneId
      } else {
        fileExtraction.phoneId = info.id
      }
      let query = await apis.updateExtraction(fileExtraction)
      setMessage({ message: query.response.message, status: query.status })
    } else {
      let query = await apis.postNewExtraction(fileExtraction);
      if (query.status === 200) {
        let aux = [...loaded]
        if (!aux.find(element => element === deviceNumber)) {
          aux.push(deviceNumber)
        }
        setPhoneId(query.response.info)
        setMessage({ message: query.response.message, status: query.status })
        setLoaded(aux)
      }
    }
  }
  function setSimcardForm() {

    switch (simcardOption) {
      case "1":
        return (
          <div className="row mt-3">
            <div className="col">
              <div className="form-group">
                <label htmlFor="simcard">Simcard</label>
                <input type="number" value={simcardNumber1} onChange={(e) => setSimcardNumber1(e.target.value)} className="form-control" id="simcard" required
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="company">Empresa</label>
                <input type="text" value={simcardCompany1} onChange={(e) => setSimcardCompany1(e.target.value)} className="form-control" id="company" required
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
                  <input type="number" value={simcardNumber1} onChange={(e) => setSimcardNumber1(e.target.value)} className="form-control" id="simcard1" required
                  ></input>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="company1">Empresa 1</label>
                  <input type="text" value={simcardCompany1} onChange={(e) => setSimcardCompany1(e.target.value)} className="form-control" id="company1" required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="simcard2">Simcard 2</label>
                  <input type="number" value={simcardNumber2} onChange={(e) => setSimcardNumber2(e.target.value)} className="form-control" id="simcard2" required
                  ></input>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="company2">Empresa 2</label>
                  <input type="text" value={simcardCompany2} onChange={(e) => setSimcardCompany2(e.target.value)} className="form-control" id="company2" required
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
  function setBatteryForm() {
    switch (batteryOption) {
      case "1":
        return (
          <div className="row mt-3">
            <div className="col">
              <div className="form-group">
                <label htmlFor="simcard">Marca</label>
                <input type="text" value={batteryBrand} onChange={(e) => setBatteryBrand(e.target.value)} className="form-control" id="simcard" required
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="company">Modelo</label>
                <input type="text" value={batteryModel} onChange={(e) => setBatteryModel(e.target.value)} className="form-control" id="company" required
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

    switch (imeiOption) {
      case "1":
        return (
          <div className="form-group">
            <label htmlFor="imei">IMEI</label>
            <input
              type="number"
              className="form-control"
              id="imei"
              value={imeiNumber1}
              onChange={(e) => setImeiNumber1(e.target.value)}
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
                    value={imeiNumber1}
                    onChange={(e) => setImeiNumber1(e.target.value)}
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
                    value={imeiNumber2}
                    onChange={(e) => setImeiNumber2(e.target.value)}
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
  function setMicrosdForm() {
    if (microsdOption === "1") {
      return (
        <>
          <div className="row mt-3">
            <div className="col">
              <div className="form-group">
                <label htmlFor="micro-type">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  value={microsdType}
                  onChange={(e) => setMicrosdType(e.target.value)}
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
                  value={microsdCapacity}
                  onChange={(e) => setMicrosdCapacity(e.target.value)}
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

  if (loading) {
    return (
      <Loading></Loading>
    )
  }
  return (
    <>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="p-3 bg-light shadow-sm rounded">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="brand">Marca</label>
                <input type="text" value={phoneBrand} name="brand" onChange={(e) => setPhoneBrand(e.target.value)} className="form-control" id="brand" required></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="model">Modelo</label>
                <input type="text" value={phoneModel} name="model" onChange={(e) => setPhoneModel(e.target.value)} className="form-control" id="model" required ></input>
              </div>
            </div>
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="simcardSelect">Simcard?</label>
            <select className="form-control" value={simcardOption} onChange={(e) => { setSimcardOption(e.target.value) }} id="simcardSelect">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">No posee</option>
            </select>
          </div>
          {setSimcardForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="batterySelect">Batería?</label>
            <select className="form-control" value={setBatteryOption} onChange={(e) => { setBatteryOption(e.target.value) }} id="batterySelect">
              <option value="1">Posee</option>
              <option value="2">No posee</option>
              <option value="3">Integrada</option>
            </select>
          </div>
          {setBatteryForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="imeiSelected">IMEI?</label>
            <select className="form-control" value={imeiOption} onChange={(e) => { setImeiOption(e.target.value) }} id="imeiSelected">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">No visible/No legible</option>
            </select>
          </div>
          {setImeiForm()}
          <hr />
          <div className="form-group">
            <label htmlFor="microsd">MicroSD?</label>
            <select className="form-control" value={microsdOption} onChange={(e) => { setMicrosdOption(e.target.value) }} id="microsd">
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
      <Message props={message}></Message>
    </>
  );
}
export default CellForm;
