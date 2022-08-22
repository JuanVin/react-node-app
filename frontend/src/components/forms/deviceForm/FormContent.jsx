import { useState } from "react";
import { useSearchParams } from "react-router-dom"

import CellForm from "./phone/CellForm";
import PcForm from "./pc/PcForm";
import PhoneForm from "./phone1/PhoneForm";

function FormContent({ deviceNumber, device, amount, setAmount, currentPage, loaded, setLoaded }) {

  const [option, setOption] = useState("1");
  const [currentOption, setCurrentOption] = useState("1");
  const [searchParams] = useSearchParams();

  const info = {
    extractionId: searchParams.get("id"),
    deviceNumber: deviceNumber,
  }

  const handleOption = () => {
    setCurrentOption(option);
  };

  const optionSwitch = () => {
    switch (currentOption) {
      case "1":
        return <PhoneForm info={{ ...info, type: 1 }}></PhoneForm>/*<CellForm
          elementNumber={elementNumber}
          amount={amount}
          setAmount={setAmount}
          device={device}
          loaded={loaded}
          setLoaded={setLoaded}>
        </CellForm>;*/
      case "2":
        return <PcForm info={info}></PcForm>
      case "3":
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
                  <option value={"2"}>PC</option>
                  <option value={"3"}>Comodin</option>
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
