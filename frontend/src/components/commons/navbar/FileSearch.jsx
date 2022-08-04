import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import apis from "../../../services/apiCalls";
import AccordionFile from "../AccordionFile";
import "../../styles/modal.css";

function FileSearch() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(event) {
    event.preventDefault();
    if (event.target.checkValidity()) {
      let query = await apis.getFileByFileNumber(input.trim().replace("/", "-"))
      if (query.status === 200) {
        setData(query.data);
        handleShow();
      }
    }
  }

  return (
    <div className="my-2 my-lg-0 d-flex">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <input
            className="form-control text-center"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="search"
            placeholder="Expediente"
            required
          ></input>
          <button type="submit" className="btn btn-success">Buscar</button>
        </div>
      </form>

      {data !== null
        ?
        <Modal
          dialogClassName="modal-90w"
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>
              <b>Expedientes encontrados</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white">
            <AccordionFile files={data} option={"a3"}></AccordionFile>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button variant="success" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        :
        ""}
    </div>
  );
}

export default FileSearch;
