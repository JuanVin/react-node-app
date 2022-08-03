import apis from "../../services/apiCalls"
import { useState, useEffect } from "react";
import AccordionFile from "../commons/AccordionFile";
import Loading from "../commons/Loading";
function TechnicianSearcher(param) {
  const [data, setData] = useState(null);
  const [technicians, setTechnicians] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [technician, setTechnician] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      getTechnicianFromLocalStorage();
    } else {
      getTechnicianFromApiCall();
    }
  }, [isLoading]);

  const getTechnicianFromLocalStorage = () => {
    setTechnicians(JSON.parse(localStorage.getItem("data")).technicians);
    setIsLoading(false);
  };
  const getTechnicianFromApiCall = async () => {
    setTechnicians(await apis.getTechnicians());
    setIsLoading(false);
  };

  function loadTechnician() {
    let techData = [];
    techData.push(
      <option key={Math.random()} value={0}>
        No asignado
      </option>
    );
    technicians.forEach((technician) => {
      techData.push(
        <option
          key={parseInt(technician.id) * Math.random()}
          value={technician.id}
        >
          {technician.name.toUpperCase()}
        </option>
      );
    });
    return techData;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let body = {
      technician: technician,
      startDate: startDate,
      endDate: endDate,
    };
    setData(await apis.getFilesByTechnician(body));
  }

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="p-3">
        <h2>Filtro: Técnico</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-3 form-group w-25">
            <label className="p-1" htmlFor="tecnico_act">
              Técnico{" "}
            </label>
            <select
              className="form-control"
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              required
            >
              {loadTechnician()}
            </select>
          </div>
          <div
            style={{ display: "inline-block" }}
            className="mt-3 form-group w-25"
          >
            <label className="p-1" htmlFor="start">
              Fecha de Inicio{" "}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              style={{ display: "inline-block" }}
              className="form-control"
              required
            ></input>
          </div>
          <div
            style={{ display: "inline-block" }}
            className="mt-3 m-3 form-group w-25"
          >
            <label className="p-1" htmlFor="end">
              Fecha final{" "}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              style={{ display: "inline-block" }}
              className="form-control"
              required
            ></input>
          </div>

          <input type="submit" className="btn btn-success" value="Submit" />
        </form>

        <hr></hr>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data !== null ? (
            <div className="w-50 mt-3">
              <AccordionFile
                files={data} option={"a5"}
              ></AccordionFile>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default TechnicianSearcher;
