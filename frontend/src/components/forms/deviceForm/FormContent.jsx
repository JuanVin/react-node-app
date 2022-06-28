import { useState } from "react";
import CellForm from "./CellForm";
import { useSearchParams } from "react-router-dom"
function FormContent({ deviceNumber, currentPage, extractionLoaded, setExtractionLoaded }) {
  const [option, setOption] = useState("1");
  const [currentOption, setCurrentOption] = useState("1");
  const [searchParams] = useSearchParams();
  console.log(extractionLoaded)
  const handleOption = () => {
    setCurrentOption(option);
  };

  const optionSwitch = () => {
    switch (currentOption) {
      case "1":
        return <CellForm deviceNumber={deviceNumber} extractionLoaded={extractionLoaded} setExtractionLoaded={setExtractionLoaded} file={searchParams.get("file")} id={searchParams.get("id")}></CellForm>;
      case "2":
        return "Formulario de PC";
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
      {deviceNumber === currentPage ? (
        <div className="">{getFormBody()}</div>
      ) : (
        <div className="d-none">{getFormBody()}</div>
      )}
    </>
  );
}

export default FormContent;
