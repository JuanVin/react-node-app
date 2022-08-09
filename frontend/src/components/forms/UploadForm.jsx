import { useEffect, useState } from "react";
import apis from "../../services/apiCalls";
import Message from "../commons/Message";
import Loading from "../commons/Loading";
function UploadForm(params) {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  const [fiscalOfficeId, setFiscalOfficeId] = useState(0);
  const [fiscalUnitId, setFiscalUnitId] = useState(0);
  const [conditionId, setConditionId] = useState(0);
  const [technicianId, setTechnicianId] = useState(0);
  const [detail, setDetail] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [egressDate, setEgressDate] = useState('');
  const [shiftDate, setShiftDate] = useState('');
  const [fileNumber, setFileNumber] = useState('');
  const [fileType, setFileType] = useState(1);

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
  
    let query = await apis.getFormData();
    
    if (query.status === 200) {
      localStorage.setItem("data", JSON.stringify(query.response));
      setData(query.response);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>Cargando</h1>;
  }
  async function handleUpload() {
    let body = {
      FiscalOfficeId: fiscalOfficeId,
      FiscalUnitId: fiscalUnitId,
      ConditionId: conditionId,
      admission_date: admissionDate,
      egress_date: egressDate,
      shift_date: shiftDate,
      detail: detail,
      TechnicianId: technicianId,
      file_number: fileNumber.replace("/", ""),
      file_type: fileType
    }
    let query = await apis.postFormData(body)
    if (query.status === 200) {
      setMessage({ message: query.response.message, status: query.status })
      params.setRefreshData(1);
    }
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

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-75">
      <Message props={message}></Message>
      <div className="form-group">
        <p> Número de expediente </p>
        <div className="input-group w-100">
          <select
            className="form-select d-inline w-25 text-center"
            id="tipo_expediente_act"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            name="select"
          >
            {loadTypes()}
          </select>
          <input
            type="text"
            id="expediente_act"
            value={fileNumber}
            onChange={(e) => setFileNumber(e.target.value)}
            className="form-control d-inline w-75"
            required
          />
        </div>
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
          <label className="form-check-label" htmlFor="opcion_turno1">
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
            defaultChecked
          ></input>
          <label className="form-check-label" htmlFor="opcion_turno2">
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
          <label className="form-check-label" htmlFor="opcion_turno3">
            Acto
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="mt-3 form-group">
            <label className="p-1" htmlFor="u_fiscal_act">
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
            <label className="p-1" htmlFor="o_fiscal_act">
              Oficina Fiscal
            </label>
            <select
              className="form-control"
              value={fiscalOfficeId}
              onChange={(e) => setFiscalOfficeId(e.target.value)}
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
            <label className="p-1" htmlFor="f_ingreso_act">
              Fecha ingreso
            </label>
            <input
              className="form-control"
              type="date"
              id="f_ingreso_act"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              name="meeting-time"
              min="2022-01-01"
              max="2100-06-14"
            ></input>
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group mt-3">
            <label className="p-1" htmlFor="f_egreso_act">
              Fecha egreso
            </label>
            <input
              className="form-control"
              type="date"
              id="f_egreso_act"
              value={egressDate}
              onChange={(e) => setEgressDate(e.target.value)}
              name="meeting-time"
              min="2022-01-01"
              max="2100-06-14"
            ></input>
          </div>
        </div>
      </div>
      <div className="form-group mt-3">
        <label className="p-1" htmlFor="f_turno_act">
          Fecha turno
        </label>

        <input
          className="form-control"
          type="datetime-local"
          id="f_turno_act"
          value={shiftDate}
          onChange={(e) => setShiftDate(e.target.value)}
          name="meeting-time"
          min="2022-01-01T00:00"
          max="2100-06-14T00:00"
          required
        ></input>
      </div>
      <div className="row">
        <div className="col">
          <div className="mt-3 form-group">
            <label className="p-1" htmlFor="condicion_act">
              Condición{" "}
            </label>
            <select
              className="form-control"
              value={conditionId}
              onChange={(e) => {
                setConditionId(e.target.value);
              }}
              id="condicion_act"
              required
            >
              {loadCondition()}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mt-3 form-group">
            <label className="p-1" htmlFor="tecnico_act">
              Técnico{" "}
            </label>
            <select
              className="form-control"
              value={technicianId}
              onChange={(e) => {
                setTechnicianId(e.target.value);
              }}
              id="tecnico_act"
              required
            >
              {loadTechnician()}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group mt-3">
        <label className="p-1" htmlFor="detalle_act">
          Detalle
        </label>
        <textarea
          className="form-control"
          id="detalle_act"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows="3"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              ></input>
              <label className="form-check-label" htmlFor="exampleCheck1">
                Enviar correo
              </label>
            </div>
          </div>
          <div className="col">
            <button
              className="mt-3 w-100 btn btn-success"
              type="button"
              onClick={handleUpload}
            >
              Cargar expediente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
