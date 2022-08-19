import { useState, useEffect, memo } from "react";
import apis from "../../../../services/apiCalls"
import Loading from "../../../commons/Loading";
import Message from "../../../commons/Message";
import { useSearchParams } from "react-router-dom"
import useExtraction from "../../../../hooks/useExtraction";
import ImeiNumber from "./generics/ImeiNumber";
import SimcardData from "./generics/SimcardData";
import Microsd from "./generics/Microsd";
import Battery from "./generics/Battery";
import DeleteButton from "../generics/DeleteButton";
import UpdateButton from "../generics/UpdateButton";
function CellForm({ elementNumber, loaded, setLoaded, device, amount, setAmount }) {

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true)
  const [simcardOption, setSimcardOption] = useState("1");
  const [imeiOption, setImeiOption] = useState("1");
  const [batteryOption, setBatteryOption] = useState("1");
  const [microsdOption, setMicrosdOption] = useState("1")

  const [deviceNumber, setDeviceNumber] = useState(elementNumber)

  const [message, setMessage] = useState(null)
  const [deviceInfo, setDeviceInfo] = useState(device)

  const { id } = useExtraction()

  const initialValues = {
    id: searchParams.get("id"),
    file: searchParams.get("file"),
    extractionId: id,
    type: 1,
    device: elementNumber,
    phoneBrand: "",
    phoneModel: "",
    imei: {
      imeiNumber1: "",
      imeiNumber2: ""
    },
    simcard: {
      simcard1: {
        number: "",
        company: ""
      },
      simcard2: {
        number: "",
        company: ""
      }
    },
    battery: {
      brand: "",
      model: ""
    },
    microsd: {
      type: "",
      capacity: ""
    },
    options: {
      simcard: "",
      imei: "",
      microsd: "",
      battery: ""
    },
    detail: "",
    extraction: "",
  };

  const [formValues, setFormValues] = useState(initialValues)

  useEffect(() => {
    if (device) {
      setInputValues()
    } else {
      setLoading(false)
    }
  }, [device, loading])

  function setInputValues() {

    initialValues.phoneBrand = deviceInfo.phoneBrand
    initialValues.phoneModel = deviceInfo.phoneModel

    initialValues.simcard.simcard1.number = deviceInfo.simcardNumber1
    initialValues.simcard.simcard2.number = deviceInfo.simcardNumber2

    initialValues.simcard.simcard1.company = deviceInfo.simcardCompany1
    initialValues.simcard.simcard2.company = deviceInfo.simcardCompany2

    initialValues.imei.imeiNumber1 = deviceInfo.imeiNumber1
    initialValues.imei.imeiNumber2 = deviceInfo.imeiNumber2

    initialValues.detail = deviceInfo.detail
    initialValues.extraction = deviceInfo.extraction

    initialValues.battery.brand = deviceInfo.batteryBrand
    initialValues.battery.model = deviceInfo.batteryModel

    initialValues.microsd.type = deviceInfo.microsdType
    initialValues.microsd.capacity = deviceInfo.microsdCapacity

    setLoading(false)

  }
  async function handleSubmit(e) {

    e.preventDefault();

    if (deviceInfo) {
      formValues.phoneId = deviceInfo.id
      setFormValues(formValues)
      let query = await apis.updateExtraction(formValues)
      if (query.status === 200) {
        setMessage({ message: query.response.message, status: query.status })
        if (query.response.device.deviceNumber !== deviceNumber) {
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          setDeviceInfo({ ...deviceInfo, ...query.response.device })
          setInputValues()
          let _loaded = [...loaded]
          _loaded = _loaded.filter(element => element !== elementNumber)
          if (!_loaded.find(element => element === query.response.device.deviceNumber)) {
            _loaded.push(parseInt(query.response.device.deviceNumber))
          }
          setLoaded(_loaded)
        }
      }
    } else {
      let query = await apis.postNewExtraction(formValues);
      if (query.status === 200) {
        setMessage({ message: query.response.message, status: query.status })
        if (query.response.device.deviceNumber !== elementNumber) {
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        } else {
          let _loaded = [...loaded]
          if (!_loaded.find(element => element === deviceNumber)) {
            _loaded.push(deviceNumber)
          }
          setDeviceInfo(query.response.device)
          setLoaded(_loaded)
        }
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleSimcardData = (e) => {
    const { name, value } = e.target
    const container = e.target.getAttribute("container")
    const simcard = formValues.simcard
    simcard[container][name] = value
    setFormValues({ ...formValues, simcard })
  }
  const handleObjectChange = (e) => {
    const { name, value } = e.target
    const container = e.target.getAttribute("container")
    const aux = formValues[container]
    aux[name] = value
    setFormValues({ ...formValues, [container]: aux })
  }
  
  const deleteForm = async () => {
    if (deviceInfo) {
      let query = await apis.deleteForm({ id: deviceInfo.id })
      if (query.status === 200) {
        updateFormsNumber(0)
      }
    } else {
      if (loaded.find(element => { return element > elementNumber })) {
        let query = await apis.updateFormsNumber({ id: id, number: elementNumber })
        if (query.status === 200) {
          updateFormsNumber(0)
        }
      } else {
        updateFormsNumber(0)
      }
    }
  }
  const updateFormsNumber = async (opt) => {
    let body = {
      id: searchParams.get("id"),
      number: amount.length - 1
    }
    let query = await apis.updateFormsNumber(body)
    if (query.status === 200) {
      if (opt === 0) {
        window.location.reload(false);
      } else {
        let _amount = [...amount]
        let _loaded = loaded.filter((element) => { return element !== deviceNumber })
        _amount.splice(deviceNumber - 1, 1)
        setLoaded(_loaded)
        setAmount(_amount)
      }
    }
  }

  function setSimcardForm() {
    switch (simcardOption) {
      case "1":
        return (
          <div className="row mt-3">
            <SimcardData
              container={"simcard1"}
              value1={formValues.simcard.simcard1.number}
              value2={formValues.simcard.simcard1.company}
              handleSimcardData={handleSimcardData}
              titles={{ 1: "Simcard", 2: "Empresa" }}
            >
            </SimcardData>
          </div>
        );
      case "2":
        return (
          <>
            <div className="row mt-3">
              <SimcardData
                container={"simcard1"}
                value1={formValues.simcard.simcard1.number}
                value2={formValues.simcard.simcard1.company}
                handleSimcardData={handleSimcardData}
                titles={{ 1: "Simcard 1", 2: "Empresa 1" }}
              >
              </SimcardData>
            </div>
            <div className="row mt-3">
              <SimcardData
                container={"simcard2"}
                value1={formValues.simcard.simcard2.number}
                value2={formValues.simcard.simcard2.company}
                handleSimcardData={handleSimcardData}
                titles={{ 1: "Simcard 2", 2: "Empresa 2" }}
              >
              </SimcardData>
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
          <Battery value1={formValues.battery.brand} value2={formValues.battery.model} handleObjectChange={handleObjectChange}></Battery>
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
            <ImeiNumber name={"imeiNumber1"} value={formValues.imei.imeiNumber1} handleObjectChange={handleObjectChange} title={"IMEI"}></ImeiNumber>
          </div>
        );

      case "2":
        return (
          <>
            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <ImeiNumber name={"imeiNumber1"} value={formValues.imei.imeiNumber1} handleObjectChange={handleObjectChange} title={"IMEI 1"}></ImeiNumber>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <ImeiNumber name={"imeiNumber2"} value={formValues.imei.imeiNumber2} handleObjectChange={handleObjectChange} title={"IMEI 2"}></ImeiNumber>
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
          <Microsd value1={formValues.microsd.type} value2={formValues.microsd.capacity} handleObjectChange={handleObjectChange}></Microsd>
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
      <Message props={message}></Message>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="text-center mt-1">
          <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
          <DeleteButton deviceInfo={deviceInfo} deleteForm={deleteForm}></DeleteButton>
        </div>
        <div className="p-3 bg-light shadow-sm rounded">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="model">Dispositivo N°: </label>
                <select className="form-control" value={formValues.device} name="device" onChange={handleChange} id="simcardSelect">
                  {amount.map(device => {
                    return (
                      <option value={device + 1}>{device + 1}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="brand">Marca</label>
                <input type="text" value={formValues.phoneBrand} name="phoneBrand" onChange={handleChange} className="form-control" id="brand" required></input>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="model">Modelo</label>
                <input type="text" value={formValues.phoneModel} name="phoneModel" onChange={handleChange} className="form-control" id="model" required ></input>
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
            <textarea className="form-control" value={formValues.detail} name="detail" onChange={handleChange} id="detalle" rows="1" ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="extraction">Extracción</label>
            <textarea className="form-control" id="extraction" rows="3" value={formValues.extraction} name="extraction" onChange={handleChange} ></textarea>
          </div>
          <div className="text-center mt-1">
            <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
            <DeleteButton deviceInfo={deviceInfo} deleteForm={deleteForm}></DeleteButton>
          </div>
        </div>
      </form>
      <Message props={message}></Message>
    </>
  );
}
export default memo(CellForm);
