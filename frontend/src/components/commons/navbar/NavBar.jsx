import { Navbar, Nav, Container } from "react-bootstrap"
import FileSearch from "./FileSearch"


const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" className="position-fixed w-100" style={{ zIndex: "1"}}>
            <img src="/logo.png" style={{width: "75px", left: "50px", position: "absolute"}} alt="logo"></img>
            <Container>
                <Navbar.Brand href="#home"><strong>U.D.A.P.I.F.</strong> <small className="text-muted d-block">Departamento de Informática Forense</small></Navbar.Brand>
                <Nav>
                
                    <Nav.Link style={{ fontSize: "18px" }} href="/">Home</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px" }} href="/stadistics">Estadísticas</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px" }} href="/finder">Buscador</Nav.Link>
                    <FileSearch></FileSearch>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar