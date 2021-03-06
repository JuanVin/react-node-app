import { useState } from "react";
import apis from "../apiCalls";
import BarGraphic from "./BarGraphic";
import PendingFilesTable from "./PendingFilesTable";

import FilesPercentage from "./FilesPercentage";
function Stadistics() {

  const [fileStadistic, setFileStadistic] = useState(null);
  const [technicianStadistic, setTechnicianStadistic] = useState(null);
  const [pendingFiles, setPendingFiles] = useState(null);
  const [archivedFile, setArchivedFile] = useState(null);
  const [deliverFile, setDeliverFile] = useState(null);
  const [total, setTotal] = useState(null);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  async function postFetchData() {

    let query = await apis.getStadisticsByDate({
      start: startDate,
      end: endDate,
    });

    setFileStadistic(query.fileStadistic);
    setTechnicianStadistic(query.technicianStadistic);
    setPendingFiles(query.pendingFiles);
    setTotal(query.fileStadistic[query.fileStadistic.length - 1].total);
    setArchivedFile(
      query.fileStadistic.find((element) => element.name === "archivado")
    );
    setDeliverFile(
      query.fileStadistic.find(
        (element) => element.name === "falta_entregar"
      )
    );
  }
  return (
    <>
      <div className="bg-light shadow p-3 rounded">
        <h1 className="p-3">Estadísticas</h1>
        <div className="form-group">
          <label className="p-3" for="start">
            Fecha de inicio:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={{ display: "inline-block" }}
            className="form-control w-25"
          ></input>
          <label className="p-3" for="end">
            Fecha de fin:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            style={{ display: "inline-block" }}
            className="form-control w-25"
          ></input>
          <button className="btn btn-success m-3" onClick={postFetchData}>
            Ingresar
          </button>
        </div>
        <hr className="mt-5"></hr>
        {!fileStadistic && !technicianStadistic ? (
          ""
        ) : (
          <>
            <div className="row">
              <h3 className="text-center p-3">
                Registros entre:{" "}
                <span style={{ color: "orange" }}>
                  {startDate}
                </span>{" "}
                y{" "}
                <span style={{ color: "orange" }}>
                  {endDate}
                </span>
              </h3>
              <div className="col">
                <h3 className="p-3 text-center">
                  Cantidad de registros:{" "}
                  <span style={{ color: "orange" }}>{total}</span>
                </h3>
                <BarGraphic
                  props={{ data: fileStadistic, opt: 0 }}
                ></BarGraphic>
              </div>
              <div className="col">
                <h3 className="text-center p-3">
                  Archivados (
                  <span style={{ color: "rgb(0, 138, 180)" }}>
                    {archivedFile.amount}
                  </span>
                  ) - Falta entregar (
                  <span style={{ color: "rgb(0, 180, 120)" }}>
                    {deliverFile.amount}
                  </span>
                  )
                </h3>
                <BarGraphic
                  props={{ data: technicianStadistic, opt: 1 }}
                ></BarGraphic>
              </div>
            </div>
            <div className="row bg-dark text-light rounded">
              <div className="col p-5">
                <h2 className="text-center">Porcentajes</h2>
                <div className="p-3">
                  <FilesPercentage
                    props={{ fileStadistic: fileStadistic, total: total }}
                  ></FilesPercentage>
                </div>
              </div>
              <div className="col p-5">
                <h2 className="text-center">Pedidos</h2>
              </div>
            </div>

            <h2 className="p-3">Expedientes por comenzar: </h2>
            <div className="p-5">
              <PendingFilesTable props={pendingFiles}></PendingFilesTable>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Stadistics;
