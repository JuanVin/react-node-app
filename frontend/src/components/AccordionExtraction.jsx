import { Accordion } from "react-bootstrap"
import "./styles/accordionFile.css"
import DeviceForm from "./DeviceForm"
function AccordionExtraction(param) {

    let accordion = []

    for (let index = 0; index < param.props; index++) {
        accordion.push(
            <Accordion.Item eventKey={index} flush>
                <Accordion.Header>
                    <b>Dispositivo N° {index+1} - SAMSUNG SM-G532M</b>
                </Accordion.Header>
                <Accordion.Body style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <DeviceForm></DeviceForm>
                </Accordion.Body>
            </Accordion.Item >
        )
    }

    return (
        <>
            <Accordion className="w-75 mt-5" defaultActiveKey="0">
                {accordion}
            </Accordion>
        </>
    )
}

export default AccordionExtraction