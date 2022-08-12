import { useEffect, useState } from "react";
import apis from "../../../services/apiCalls";
import Message from "../../commons/Message";
import Loading from "../../commons/Loading";
import validate from "./validation";
import FileNumber from "../generics/FileNumber";
import Dates from "../generics/Dates";
import Condition from "../generics/Condition";
import Detail from "../generics/Detail";
import Technician from "../generics/Technician";
import Offices from "../generics/Offices";
import Types from "../generics/Types";
import genericFunctions from "../generics/genericFunctions";

function UploadForm(params) {
  const initialValues = { fiscalOfficeId: 0, fiscalUnitId: 0, conditionId: 1, technicianId: 0, detail: '', egressDate: '', admissionDate: '', shiftDate: '', fileNumber: '', fileType: 1 }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

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
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  if (isLoading) {
    return <h1>Cargando</h1>;
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const aux = validate(formValues)
    setFormErrors(aux)
    if (Object.keys(aux).length === 0) {
      let query = await apis.postFormData(formValues)
      if (query.status === 200) {
        setMessage({ message: query.response.message, status: query.status })
        params.setRefreshData(1);
      }
    }
  }

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-75">
      <Message props={message}></Message>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p> Número de expediente </p>
          <div className="input-group w-100">
            <Types fileType={formValues.fileType} handleChange={handleChange} loadTypes={genericFunctions.loadTypes(data.types)}></Types>
            <FileNumber fileNumber={formValues.fileNumber} handleChange={handleChange}></FileNumber>
          </div>
          <p className="text-danger">{formErrors.fileNumber} </p>
        </div>
        <div className="row">
          <div className="col-sm">
            <Offices name={"fiscalUnitId"} id={formValues.fiscalUnitId} handleChange={handleChange} loadOffices={genericFunctions.loadOffices(data.fiscalUnits)} title={"Unidad"}></Offices>
          </div>
          <div className="col-sm">
            <Offices name={"fiscalOfficeId"} id={formValues.fiscalOfficeId} handleChange={handleChange} loadOffices={genericFunctions.loadOffices(data.fiscalOffices)} title={"Oficina"}></Offices>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <div className="form-group mt-3">
              <Dates date={formValues.admissionDate} name={"admissionDate"} handleChange={handleChange} type={"date"} title={"ingreso"}></Dates>
            </div>
          </div>
          <div className="col-sm">
            <div className="form-group mt-3">
              <Dates date={formValues.egressDate} name={"egressDate"} handleChange={handleChange} type={"date"} title={"egreso"}></Dates>
            </div>
          </div>
        </div>
        <div className="form-group mt-3">
          <Dates date={formValues.shiftDate} name={"shiftDate"} handleChange={handleChange} type={"datetime-local"} title={"turno"}></Dates>
          <p className="text-danger">{formErrors.shiftDate}</p>
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
        <div className="form-group mt-3">
          <Detail detail={formValues.detail} handleChange={handleChange}></Detail>
        </div>
        <div className="form-group">
          <button className="mt-3 w-100 btn btn-success" type="submit">
            Cargar expediente
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
