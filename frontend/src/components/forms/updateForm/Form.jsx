import apis from "../../../services/apiCalls";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Message from "../../commons/Message";
import Loading from "../../commons/Loading";
import AuthService from "../../../services/auth.service";
import ModalDetails from "./updateDetails/ModalDetails";
import FileNumber from "../generics/FileNumber";
import Types from "../generics/Types";
import genericFunctions from "../generics/genericFunctions";
import Offices from "../generics/Offices";
import Dates from "../generics/Dates";
import Condition from "../generics/Condition";
import Technician from "../generics/Technician";
function Form(params) {

  let fileData = params.data;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  const initialValues =
  {
    fiscalOfficeId: fileData.FiscalOfficeId,
    fiscalUnitId: fileData.FiscalUnitId,
    conditionId: fileData.ConditionId,
    technicianId: fileData.TechnicianId,
    detail: fileData.Details,
    admissionDate: fileData.FileDate.admission_date,
    egressDate: fileData.FileDate.egress_date,
    shiftDate: fileData.FileDate.shift_date,
    fileNumber: fileData.file_number,
    fileType: fileData.FileTypeId
  }

  const [formValues, setFormValues] = useState(initialValues)

  const [fiscalOfficeId, setFiscalOfficeId] = useState(fileData.FiscalOfficeId);
  const [fiscalUnitId, setFiscalUnitId] = useState(fileData.FiscalUnitId);
  const [conditionId, setConditionId] = useState(fileData.ConditionId);
  const [technicianId, setTechnicianId] = useState(fileData.TechnicianId);
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
      TechnicianId: technicianId,
      file_number: fileNumber.replace("/", "").trim(),
      file_type: fileType,
      file_id: fileId,
      date_id: dateId,
    }

    let query = await apis.postUpdateData(body);
    setMessage({ message: query.response.message, status: query.status })

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <Message props={message}></Message>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <p className="p-1"> Número de expediente </p>
      <div className="input-group w-100">
        <Types fileType={formValues.fileType} handleChange={handleChange} loadTypes={genericFunctions.loadTypes(data.types)}></Types>
        <FileNumber fileNumber={formValues.fileNumber} handleChange={handleChange}></FileNumber>
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
          <Offices name={"fiscalOfficeId"} id={formValues.fiscalOfficeId} handleChange={handleChange} loadOffices={genericFunctions.loadOffices(data.fiscalOffices)} title={"Oficina"}></Offices>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group mt-3">
            <Dates date={genericFunctions.setDataValues(formValues.admissionDate, 0)} name={"admissionDate"} handleChange={handleChange} type={"date"} title={"ingreso"}></Dates>
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group mt-3">
            <Dates date={genericFunctions.setDataValues(formValues.egressDate, 0)} name={"egressDate"} handleChange={handleChange} type={"date"} title={"egreso"}></Dates>
          </div>
        </div>
      </div>
      <div className="form-group mt-3">
        <Dates date={genericFunctions.setDataValues(formValues.shiftDate, 1)} name={"shiftDate"} handleChange={handleChange} type={"datetime-local"} title={"turno"}></Dates>
      </div>
      <div className="row">
        <div className="col">
          <div className="mt-3 form-group">
            <Condition conditionId={formValues.conditionId} handleChange={handleChange} loadCondition={genericFunctions.loadCondition(data.condition)}></Condition>
          </div>
        </div>
        <div className="col">
          <div className="mt-3 form-group">
            <Technician handleChange={handleChange} technicianId={formValues.technicianId} loadTechnician={genericFunctions.loadTechnician(data.technicians)}></Technician>
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
            className="mt-3 btn btn-dark w-100 m-1"
            type="button"
            onClick={handleUpdate}
          >
            Actualizar expediente
          </button>
        </div>
        <div className="col">
          <Link className="btn btn-outline-dark mt-3 w-100"
            to={{
              pathname: "/device",
              search: `?file=${fileData.file_number}&id=${fileData.id}`,
            }}
          >Cargar extracción</Link>
        </div>
        {(AuthService.getCurrentUser()).roles.includes("ROLE_ADMIN")
          ?
          <div className="col">
            <button
              className="mt-3 btn btn-outline-danger w-100 m-1"
              type="button"
            >
              Borrar
            </button>
          </div>
          :
          ""
        }
      </div>
    </>
  );
}

export default Form;
