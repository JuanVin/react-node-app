import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"

import PhoneForm from "./phone1/PhoneForm";
import Loading from "../../commons/Loading";
import Notebook from "./pc/Notebook";
import Desktop from "./pc/Desktop";

function FormContent({ deviceNumber, device, amount, setAmount, currentPage, loaded, setLoaded }) {

  const [option, setOption] = useState("1");
  const [currentOption, setCurrentOption] = useState("1");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState({
    extractionId: searchParams.get("id"),
    deviceNumber: deviceNumber,
  })

  useEffect(() => {
    const handleType = () => {
      if (device) {
        switch (device.type) {
          case 1:
            setOption(device.type.toString())
            setCurrentOption(device.type.toString())
            break;
          case 2:
            setOption(device.type.toString())
            setCurrentOption(device.type.toString())
            break;
          case 3:
            setOption(device.type.toString())
            setCurrentOption(device.type.toString())
            break;
          case 4:
            setCurrentOption("3")
            break;
          default:
            break;
        }
      }
      setLoading(false)
    }
    handleType()
  }, [loading, device])

  const handleOption = () => {
    setCurrentOption(option);
  };

  const optionSwitch = () => {
    switch (currentOption) {
      case "1":
        return <PhoneForm info={{ ...info, type: 1 }} setInfo={setInfo} device={device} amount={amount}></PhoneForm>
      case "2":
        return <Notebook info={{ ...info, type: 2 }} setInfo={setInfo} device={device} amount={amount} loaded={loaded}></Notebook>
      case "3":
        return <Desktop info={{ ...info, type: 3 }} setInfo={setInfo} device={device} amount={amount}></Desktop>
      case "4":
        return "Formulario de algo mas";
      default:
        break;
    }
  };

  const getFormBody = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="w-50 border rounded">
            <div className="bg-dark p-3">
              <h2 className="m-3 text-center text-light">Dispositivo N° {deviceNumber}</h2>
              <div className="input-group">
                <select className="form-select text-center" value={option} onChange={(e) => setOption(e.target.value)}>
                  <option value={"1"}>Celular</option>
                  <option value={"2"}>Notebook</option>
                  <option value={"3"}>PC</option>
                  <option value={"4"}>Genérico</option>
                </select>
                <button className="btn btn-success btn-lg" onClick={handleOption}>
                  Aceptar
                </button>
              </div>
            </div>
            {currentOption !== "" ? optionSwitch() : ""}
          </div>
        </div>
      </>
    );
  };
  if (loading) {
    return (
      <>
        <Loading></Loading>
      </>
    )
  }

  return (
    <>
      {
        deviceNumber === currentPage
          ?
          (

            <div className="">{getFormBody()}</div>

          )
          :
          (
            <div className="d-none">{getFormBody()}</div>
          )
      }
    </>
  );
}

export default FormContent;
