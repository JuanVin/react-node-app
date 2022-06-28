import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
function PreView({ fileExtraction }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(fileExtraction);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Vista previa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vista previa</Modal.Title>
        </Modal.Header>
        <Modal.Body>{fileExtraction.file}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default PreView;
