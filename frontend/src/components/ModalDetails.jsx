import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import DetailTable from "./DetailTable"
function ModalDetails(params) {

    const [show, setShow] = useState(false);
    const [showNewDetail, setShowNewDetail] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowNewDetail = () => setShowNewDetail(true)
    const handleCloseNewDetail = () => setShowNewDetail(false)

    
    return (
        <>
            <Button className="w-100 mt-3" variant="primary" onClick={handleShow}>
                Ver detalles
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>Detalles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showNewDetail ?
                        <div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Nuevo detalle</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div> : <DetailTable details={params.details}></DetailTable>}
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    {showNewDetail ?

                        <>
                            <Button variant="success">
                                Agregar
                            </Button>
                            <Button variant="primary" onClick={handleCloseNewDetail}>
                                Volver
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="success" onClick={handleShowNewDetail}>
                                Agregar detalle
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </>
                    }

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDetails