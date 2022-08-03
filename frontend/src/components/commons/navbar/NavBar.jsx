import { Navbar, Nav, Container } from "react-bootstrap"
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
            <img src="/logo.png" style={{ width: "75px", left: "50px", position: "absolute" }} alt="logo"></img>
            <Container>
                <Navbar.Brand href="#home"><strong>U.D.A.P.I.F.</strong> <small className="text-muted d-block">Departamento de Informática Forense</small></Navbar.Brand>
                <Nav>
                    <Nav.Link style={{ fontSize: "18px" }} href="/">Home</Nav.Link>
                    {
                        (user !== null && user.roles.includes('ROLE_ADMIN'))
                            ?
                            <>
                                <Nav.Link style={{ fontSize: "18px" }} href="/stadistics">Estadísticas</Nav.Link>
                                <Nav.Link style={{ fontSize: "18px" }} href="/finder">Buscador</Nav.Link>
                            </>
                            :
                            ""
                    }
                    <Nav.Link style={{ fontSize: "18px" }} onClick={handleLogout}>Salir</Nav.Link>
                    <FileSearch></FileSearch>
                </Nav>
            </Container>
            {
                user !== null
                    ?
                    <Navbar.Brand href="#home"><strong>{(user.username).toUpperCase()}</strong></Navbar.Brand>
                    :
                    ""
            }

        </Navbar>
    )
}

export default NavBar