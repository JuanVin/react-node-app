import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap"
import FileSearch from "./FileSearch"
import AuthService from "../../../services/auth.service"

function handleLogout() {
    AuthService.logout()
    window.location.reload();
}

const NavBar = () => {

    const user = (AuthService.getCurrentUser())

    return (
        <Navbar bg="dark" variant="dark" style={{ zIndex: "1" }}>
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/logo.png"
                    width="55"
                    height="55"
                    className="d-inline-block align-top"
                    style={{ marginLeft: "50px" }}
                />{' '}
            </Navbar.Brand>
            <Navbar.Brand href="#home"><strong>U.D.A.P.I.F.</strong> <small className="text-muted d-block">Departamento de Informática Forense</small></Navbar.Brand>

            <Container>
                <Nav></Nav>
                <Nav>
                    {
                        user !== null
                            ?
                            <>
                                <Navbar.Collapse>
                                    <Navbar.Text>
                                        Logeado como: <a href="/profile">{(user.name + " " + user.lastname).toUpperCase()}</a>
                                    </Navbar.Text>
                                </Navbar.Collapse>
                            </>

                            :
                            ""
                    }
                    <Nav.Link style={{ fontSize: "18px", marginLeft: "20px" }} href="/">Home</Nav.Link>
                    <Nav.Link style={{ fontSize: "18px", marginLeft: "20px" }} href="#">Mis expedientes</Nav.Link>
                    <NavDropdown style={{ fontSize: "18px" }} title="Opciones" id="navbarScrollingDropdown">
                        <NavDropdown.Item style={{ fontSize: "18px" }} href="#">Agenda</NavDropdown.Item>
                        {

                            (user !== null && user.roles.includes('ROLE_ADMIN'))
                                ?
                                <>

                                    <NavDropdown.Item style={{ fontSize: "18px" }} href="/stadistics">Estadísticas</NavDropdown.Item>
                                    <NavDropdown.Item style={{ fontSize: "18px" }} href="/finder">Buscador</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item style={{ fontSize: "18px" }} href="#">Alta usuario</NavDropdown.Item>

                                </>
                                :
                                ""
                        }
                    </NavDropdown>
                    <FileSearch></FileSearch>
                    <Button variant="outline-light" style={{ marginLeft: "10px" }} onClick={handleLogout}>Salir</Button>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default NavBar