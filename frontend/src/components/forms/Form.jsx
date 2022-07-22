import apis from "../apiCalls";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import ModalDetails from "./uploadDetails/ModalDetails";
import Message from "../commons/Message";
import Loading from "../commons/Loading";
function Form(params) {
  let fileData = params.data;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [fiscalOfficeId, setFiscalOfficeId] = useState(fileData.FiscalOfficeId);
  const [fiscalUnitId, setFiscalUnitId] = useState(fileData.FiscalUnitId);
  const [conditionId, setConditionId] = useState(fileData.ConditionId);
  const [technicalId, setTechnicalId] = useState(fileData.TechnicalId);
  const [admissionDate, setAdmissionDate] = useState(
    fileData.FileDate.admission_date
  );
  const [egressDate, setEgressDate] = useState(fileData.FileDate.egress_date);
  const [shiftDate, setShiftDate] = useState(fileData.FileDate.shift_date);
  const [fileNumber, setFileNumber] = useState(fileData.file_number);
  const [fileType, setFileType] = useState(fileData.FileTypeId);
  const [details, setDetails] = useState(fileData.Details);
  const [fileId, setFileId] = useState(fileData.id);
  const [dateId, setDateId] = useState(fileData.FileDateId);

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      getDataFromLocalStorage();
    } else {
      getFetchData();
    }
  }, [isLoading]);

  const getDataFromLocalStorage = async () => {
    setData(JSON.parse(localStorage.getItem("data")));
    setIsLoading(false);
  };

  const getFetchData = async () => {
    let formData = await apis.getFormData();
    localStorage.setItem("data", JSON.stringify(formData));
    setData(formData);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  async function handleUpdate() {
    let body = {
      FiscalOfficeId: fiscalOfficeId,
      FiscalUnitId: fiscalUnitId,
      ConditionId: conditionId,
      admission_date: admissionDate,
      egress_date: egressDate,
      shift_date: shiftDate,
      TechnicalId: technicalId,
      file_number: fileNumber.replace("/", "").trim(),
      file_type: fileType,
      file_id: fileId,
      date_id: dateId,
    }

    let query = await apis.postUpdateData(body);
    setMessage({ message: query.response.message, status: query.status })

  }
  function loadTechnician() {
    let techData = [];
    techData.push(<option value={0}>No asignado</option>);
    data.technicians.forEach((technician) => {
      techData.push(
        <option value={technician.id}>{technician.name.toUpperCase()}</option>
      );
    });

    return techData;
  }
  function loadFiscalOffices() {
    let fiscalData = [];
    fiscalData.push(<option value={0}>{"Sin asignar"}</option>);
    data.fiscalOffices.sort();
    data.fiscalOffices.forEach((fiscalOffice) => {
      fiscalData.push(
        <option value={fiscalOffice.id}>
          {capitalizarPrimeraLetra(fiscalOffice.name)}
        </option>
      );
    });
    return fiscalData;
  }
  function loadFiscalUnits() {
    let fiscalData = [];
    fiscalData.push(<option value={0}>{"Sin asignar"}</option>);
    data.fiscalUnits.sort();
    data.fiscalUnits.forEach((fiscalUnit) => {
      fiscalData.push(
        <option value={fiscalUnit.id}>
          {fiscalUnit.District.name +
            " - " +
            capitalizarPrimeraLetra(fiscalUnit.name)}
        </option>
      );
    });
    return fiscalData;
  }
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function loadCondition() {
    let fileCondition = [];
    data.condition.forEach((singleCondition) => {
      fileCondition.push(
        <option value={singleCondition.id}>
          {capitalizarPrimeraLetra(singleCondition.condition)}
        </option>
      );
    });
    return fileCondition;
  }
  function loadTypes() {
    let fileType = [];
    data.types.forEach((type) => {
      fileType.push(
        <option value={type.id}>{type.type.toUpperCase() + "-"}</option>
      );
    });
    fileType.push(<option value={0}>{"Sin asignar"}</option>);
    return fileType;
  }
  function setValueDates(param, option) {
    if (param !== null) {
      let date = new Date(param);
      if (option === 1) {
        date.setHours(date.getHours() - 3);
        return date.toISOString().substr(0, 16);
      }
      return date.toISOString().substr(0, 10);
    }
    return param;
  }
  return (
    <>
      <Message props={message}></Message>
      <p className="p-1"> Número de expediente </p>
      <div className="input-group w-100">
        <select
          className="form-select d-inline w-25 text-center"
          id="tipo_expediente_act"
          value={fileType}
          onChange={(e) => {
            setFileType(e.target.value);
          }}
          name="select"
        >
          {loadTypes()}
        </select>
        <input
          type="text"
          id="expediente_act"
          className="form-control d-inline w-75"
          value={fileNumber}
          onChange={(e) => setFileNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group p-1">
        <div className="form-group">
          <p>Turno otorgado: </p>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="opcion_turno"
            id="opcion_turno1"
            defaultValue="1"
          ></input>
          <label className="form-check-label" for="opcion_turno1">
            Si
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="opcion_turno"
            id="opcion_turno2"
            defaultValue="2"
            checked
          ></input>
          <label className="form-check-label" for="opcion_turno2">
            No
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="opcion_turno"
            id="opcion_turno3"
            defaultValue="3"
          ></input>
          <label className="form-check-label" for="opcion_turno3">
            Acto
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="mt-3 form-group">
            <label className="p-1" for="u_fiscal_act">
              Unidad Fiscal
            </label>
            <select
              className="form-control"
              value={fiscalUnitId}
              onChange={(e) => setFiscalUnitId(e.target.value)}
              id="u_fiscal_act"
              required
            >
              {loadFiscalUnits()}
            </select>
          </div>
        </div>
        <div className="col-sm">
          <div className="mt-3 form-group">
            <label className="p-1" or="o_fiscal_act">
              Oficina Fiscal
            </label>
            <select
              className="form-control"
              value={fiscalOfficeId}
              onChange={(e) => setFiscalOfficeId(e.target.value)}
              id="o_fiscal_act"
              required
            >
              {loadFiscalOffices()}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group mt-3">
            <label className="p-1" for="f_ingreso_act">
              Fecha ingreso
            </label>
            <input
              className="form-control"
              type="date"
              id="f_ingreso_act"
              name="meeting-time"
              value={setValueDates(admissionDate, 0)}
              onChange={(e) => {
                setAdmissionDate(e.target.value);
              }}
              min="2022-01-01"
              max="2100-06-14"
            ></input>
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group mt-3">
            <label className="p-1" for="f_egreso_act">
              Fecha egreso
            </label>
            <input
              className="form-control"
              type="date"
              id="f_egreso_act"
              name="meeting-time"
              value={setValueDates(egressDate, 0)}
              onChange={(e) => {
                setEgressDate(e.target.value);
              }}
              min="2022-01-01"
              max="2100-06-14"
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group mt-3">
        <label className="p-1" for="f_turno_act">
          Fecha turno
        </label>
        <input
          className="form-control"
          type="datetime-local"
          name="meeting-time"
          min="2022-01-01T00:00"
          max="2100-06-14T00:00"
          value={setValueDates(shiftDate, 1)}
          onChange={(e) => {
            setShiftDate(e.target.value);
          }}
          required
        ></input>
      </div>
      <div className="row">
        <div className="col">
          <div className="mt-3 form-group">
            <label className="p-1" for="condicion_act">
              Condición{" "}
            </label>
            <select
              className="form-control"
              value={conditionId}
              onChange={(e) => setConditionId(e.target.value)}
              id="condicion_act"
              required
            >
              {loadCondition()}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mt-3 form-group">
            <label className="p-1" for="tecnico_act">
              Técnico{" "}
            </label>
            <select
              className="form-control"
              value={technicalId}
              onChange={(e) => setTechnicalId(e.target.value)}
              id="tecnico_act"
              required
            >
              {loadTechnician()}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ModalDetails
            details={{ file_detail: details, file_id: fileId }}
          ></ModalDetails>
        </div>
        <div className="col">
          <button
            className="mt-3 btn btn-dark w-100 m-1 btn-lg"
            type="button"
            onClick={handleUpdate}
          >
            Actualizar expediente
          </button>
        </div>
        <Link className="link-info"
          to={{
            pathname: "/device",
            search: `?file=${fileData.file_number}&id=${fileData.id}`,
          }}
        >Cargar extracción</Link>
      </div>
    </>
  );
}

export default Form;
