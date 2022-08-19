import { useState } from "react";

import UpdateButton from "../generics/UpdateButton";
import DeleteButton from "../generics/DeleteButton";

import GenericFeature from "../generics/GenericFeature"
import GenericSelectFeature from "../generics/GenericSelectFeature";
import GenericTextArea from "../generics/GenericTextArea";

import Imei from "./generics/Imei";
import Simcard from "./generics/Simcard";
import Battery from "./generics/Battery";
import Microsd from "./generics/Microsd";

function PhoneForm() {
    const initialFormValues =
    {
        type: "1",
        device: {
            brand: "",
            model: "",
            deviceNumber: 0,
            detail: "",
            extraction: ""
        },
        imei: {
            imeiNumber1: "",
            imeiNumber2: ""
        },
        simcard: {
            simcard1: {
                number: "",
                company: ""
            },
            simcard2: {
                number: "",
                company: ""
            }
        },
        battery: {
            brand: "",
            model: ""
        },
        microsd: {
            type: "",
            capacity: ""
        },
        options: {
            simcard: "",
            imei: "",
            microsd: "",
            battery: ""
        },
    };

    const initialFormOptions = {
        imeiForm: "0",
        simcardForm: "0",
        batteryForm: "0",
        microsdForm: "0"
    }

    const [formValues, setFormValues] = useState(initialFormValues)
    const [formOptions, setFormOptions] = useState(initialFormOptions)
    const [deviceInfo, setDeviceInfo] = useState("")
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormOptions({ ...formOptions, [name]: value })
    }

    const handleSimcardChange = (e) => {
        const { name, value } = e.target
        const container = e.target.getAttribute("container")
        console.log(container, name)
        const simcard = formValues.simcard
        simcard[container][name] = value
        setFormValues({ ...formValues, simcard })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const container = e.target.getAttribute("container")
        const aux = formValues[container]
        aux[name] = value
        setFormValues({ ...formValues, [container]: aux })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleDelete = () => {

    }

    return (
        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <h3>Celular</h3>
                <div className="row">
                    <div className="col">
                        <GenericFeature type="text" value={formValues.device.brand} name="brand" container="device" title="Marca" handleChange={handleChange}></GenericFeature>
                    </div>
                    <div className="col">
                        <GenericFeature type="text" value={formValues.device.model} name="model" container="device" title="Modelo" handleChange={handleChange}></GenericFeature>
                    </div>
                </div>
                <hr />
                <section>
                    <h3>IMEI</h3>
                    <GenericSelectFeature
                        title="Cantidad"
                        name="imeiForm"
                        value={formOptions.imeiForm}
                        handleFormChange={handleFormChange}
                        options={["No posee", "1", "2"]}
                    ></GenericSelectFeature>
                    <Imei
                        option={formOptions.imeiForm}
                        value1={formValues.imei.imeiNumber1}
                        value2={formValues.imei.imeiNumber2}
                        name1="imeiNumber1"
                        name2="imeiNumber2"
                        container="imei"
                        handleChange={handleChange}>
                    </Imei>
                </section>
                <hr />
                <section>
                    <h3>SIMCARD</h3>
                    <GenericSelectFeature
                        title="Cantidad"
                        name="simcardForm"
                        value={formOptions.simcardForm}
                        handleFormChange={handleFormChange}
                        options={["No posee", "1", "2"]}
                    ></GenericSelectFeature>
                    <Simcard
                        option={formOptions.simcardForm}
                        numberValue1={formValues.simcard.simcard1.number}
                        numberValue2={formValues.simcard.simcard2.number}
                        companyValue1={formValues.simcard.simcard1.number}
                        companyValue2={formValues.simcard.simcard2.number}
                        handleChange={handleSimcardChange}
                    ></Simcard>
                </section>
                <hr />
                <section>
                    <h3>Batería</h3>
                    <GenericSelectFeature
                        title="Cantidad"
                        name="batteryForm"
                        value={formOptions.batteryForm}
                        handleFormChange={handleFormChange}
                        options={["No posee", "1"]}
                    ></GenericSelectFeature>
                    <Battery
                        option={formOptions.batteryForm}
                        brandValue={formValues.battery.brand}
                        modelValue={formValues.battery.model}
                        brandName="brand"
                        modelName="model"
                        container="battery"
                        handleChange={handleChange}
                    ></Battery>
                </section>
                <hr />
                <section>
                    <h3>MicroSD</h3>
                    <GenericSelectFeature
                        title="Cantidad"
                        name="microsdForm"
                        value={formOptions.microsdForm}
                        handleFormChange={handleFormChange}
                        options={["No posee", "1"]}
                    ></GenericSelectFeature>
                    <Microsd
                        option={formOptions.microsdForm}
                        typeValue={formValues.microsd.type}
                        capacityValue={formValues.microsd.capacity}
                        typeName="type"
                        capacityName="capacity"
                        container="microsd"
                        handleChange={handleChange}
                    ></Microsd>
                </section>
                <hr />
                <section>
                    <h3>Detalle</h3>
                    <GenericTextArea
                        value={formValues.device.detail} name="detail" container="device" handleChange={handleChange}
                    ></GenericTextArea>
                </section>
                <hr />
                <section>
                    <h3>Extracción</h3>
                    <GenericTextArea
                        value={formValues.device.extraction} name="extraction" container="device" handleChange={handleChange}
                    ></GenericTextArea>
                </section>
                <section>
                    <div className="text-center mt-1">
                        <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
                        <DeleteButton deviceInfo={deviceInfo} handleDelete={handleDelete}></DeleteButton>
                    </div>
                </section>
            </form>
        </div>
    )
}
export default PhoneForm