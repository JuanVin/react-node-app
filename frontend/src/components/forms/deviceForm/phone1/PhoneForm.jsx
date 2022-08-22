import { useState } from "react";

import apis from "../../../../services/apiCalls"
import UpdateButton from "../generics/UpdateButton";
import DeleteButton from "../generics/DeleteButton";

import GenericFeature from "../generics/GenericFeature"
import GenericTextArea from "../generics/GenericTextArea";
import Header from "./generics/Header";

import Imei from "./generics/Imei";
import Simcard from "./generics/Simcard";
import Battery from "./generics/Battery";
import Microsd from "./generics/Microsd";

function PhoneForm({ info }) {

    const initialFormValues =
    {
        device: {
            brand: "",
            model: "",
            detail: "",
            extraction: ""
        },
        imei: [],
        simcard: [],
        battery: [],
        microsd: [],
    };

    const [formValues, setFormValues] = useState(initialFormValues)
    const [deviceInfo, setDeviceInfo] = useState("")

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const container = e.target.getAttribute("container")
        const aux = formValues[container]
        if (index || index === 0) {
            aux[index][name] = value
        } else {
            aux[name] = value
        }
        setFormValues({ ...formValues, [container]: aux })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = await apis.newDevice({ ...formValues, info })
        if(query.status === 200){
            console.log(query)
        }
    }

    const handleDelete = () => {

    }

    const handleRemove = (name, index) => {
        const aux = formValues[name]
        aux.splice(index, 1)
        setFormValues({ ...formValues, [name]: aux })
    }

    const handleAdd = (name, options) => {
        const aux = formValues[name]
        aux.push(options)
        setFormValues({ ...formValues, [name]: aux })
    }

    return (
        <div className="p-3">
            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            <pre>{JSON.stringify(info, undefined, 2)}</pre>
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
                    <Header title={"Imei"} handleAdd={() => handleAdd("imei", { number: "" })}></Header>
                    {formValues.imei.map(
                        (item, index) => {
                            return (
                                <Imei value={item.number} name="number" container="imei" title={`Imei ${index + 1}`} handleRemove={() => handleRemove("imei", index)} handleChange={(e) => handleChange(e, index)} key={index}></Imei>
                            )
                        }
                    )}

                </section>
                <hr />
                <section>
                    <Header title={"Simcard"} handleAdd={() => handleAdd("simcard", { number: "", company: "" })}></Header>
                    {formValues.simcard.map(
                        (sim, index) => {
                            return (
                                <Simcard company={sim.company} number={sim.number} container="simcard" handleRemove={() => handleRemove("simcard", index)} handleChange={(e) => handleChange(e, index)} key={index}></Simcard>
                            )
                        }
                    )}

                </section>
                <hr />
                <section>
                    <Header title={"Batería"} handleAdd={() => handleAdd("battery", { brand: "", model: "" })}></Header>
                    {formValues.battery.map(
                        (item, index) => {
                            return (
                                <Battery brand={item.brand} model={item.model} container="battery" handleRemove={() => handleRemove("battery", index)} handleChange={(e) => handleChange(e, index)} key={index}></Battery>
                            )
                        }
                    )}
                </section>
                <hr />
                <section>
                    <Header title={"MicroSD"} handleAdd={() => handleAdd("microsd", { type: "", capacity: "" })}></Header>
                    {formValues.microsd.map(
                        (item, index) => {
                            return (
                                <Microsd type={item.type} capacity={item.capacity} container="microsd" handleRemove={() => handleRemove("microsd", index)} handleChange={(e) => handleChange(e, index)} key={index}></Microsd>
                            )
                        }
                    )}
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