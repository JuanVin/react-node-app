import { Button, Modal } from "react-bootstrap"
import { useState } from "react"
import apis from "../../apiCalls"
import AccordionFile from "../AccordionFile"
import "../../styles/modal.css"

function FileSearch() {

    const [show, setShow] = useState(false);
    const [data, setData] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function getFetchData() {
        let inputValue = await document.getElementById("file_number").value.trim().replace("/","-")
        if(inputValue !== null && inputValue !== ''){
            setData(await apis.getFileByFileNumber(inputValue))
            handleShow()
        }
    }
   

    return (
        <div className="my-2 my-lg-0 d-flex">
            <input style={{ marginRight: "5px" }} className="form-control mr-sm-2" type="search" placeholder="Expediente" id="file_number" required></input>
            <Button variant="success" onClick={getFetchData}>
                Buscar
            </Button>

            {
                (data !== null) ?
                    <Modal
                        dialogClassName="modal-90w"
                        show={show}
                        onHide={handleClose}
                        keyboard={false}
                    >
                        <Modal.Header closeButton className="bg-dark text-white">
                            <Modal.Title><b>Expedientes encontrados</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-white">
                            <AccordionFile data={{ files: data, option: "a3" }}></AccordionFile>
                        </Modal.Body>
                        <Modal.Footer className="bg-light">
                            <Button variant="success" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    :
                    null
            }
        </div>
    )
}

export default FileSearch