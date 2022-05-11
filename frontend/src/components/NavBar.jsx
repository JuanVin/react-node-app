import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap"
import { useState } from "react"

const NavBar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"><b>U.D.A.P.I.F.</b> <small className="text-muted d-block">Departamento de informática forense</small></Navbar.Brand>
                <Nav>
                    <Nav.Link style={{ fontSize: "18px" }} href="#home">Home</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px" }} href="#features">Buscador</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px", marginRight: "50px" }} href="#pricing">Trabajo</Nav.Link>
                    <div className="my-2 my-lg-0 d-flex">
                        <input style={{marginRight:"5px"}}className="form-control mr-sm-2" type="search" placeholder="Expediente" aria-label="Expediente"></input>
                        <Button variant="success"  onClick={handleShow}>
                            Buscar
                        </Button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                I will not close if you click outside me. Don't even try to press
                                escape key.
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary">Understood</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar