import React, { useState, useEffect, memo } from "react";

import apis from "../../../../services/apiCalls"
import UpdateButton from "../generics/UpdateButton";
import DeleteButton from "../generics/DeleteButton";
import Message from "../../../commons/Message";

import GenericFeature from "../generics/GenericFeature"
import GenericTextArea from "../generics/GenericTextArea";
import GenericSelectFeature from "../generics/GenericSelectFeature";
import Header from "../generics/Header";

import Imei from "./generics/Imei";
import Simcard from "./generics/Simcard";
import Battery from "./generics/Battery";
import Microsd from "./generics/Microsd";
import PhoneDetail from "./PhoneDetail";

function PhoneForm({ info, device, amount, setInfo }) {

    const initialFormValues =
    {
        device: {
            brand: "",
            model: "",
            detail: "",
            extraction: "",
        },
        imei: [],
        simcard: [],
        battery: [],
        microsd: [],
    };

    const [formValues, setFormValues] = useState(initialFormValues)
    const [message, setMessage] = useState(null)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (device) {
            setInputValues(device)
        }
    }, [])

    const setInputValues = (values) => {
        setFormValues({
            ...formValues,
            device: {
                brand: values.brand,
                model: values.model,
                detail: values.detail,
                extraction: values.extraction,
                id: values.id
            },
            simcard: values.Simcards,
            imei: values.Imeis,
            battery: values.Batteries,
            microsd: values.Microsds
        })
        setDisabled(false)
    }

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
        setDisabled(true)
        let query
        if (formValues.device.id) {
            query = await apis.updateDevice({ ...formValues, info })
        } else {
            query = await apis.newDevice({ ...formValues, info })
        }
        if (query) {
            setMessage({ message: query.response.message, status: query.status })
            if (query.status === 200) {
                /*
                setTimeout(() => {
                    window.location.reload()
                }, 500);*/

                console.log(query.response)
                setInputValues(query.response.data)
            }
        }
    }

    const handleDelete = async () => {
        const query = await apis.deleteDevice({ ...formValues.device, info })
        console.lol(query)
        if (query.status === 200) {
            window.location.reload()
        }
    }

    const handleRemove = (name, index) => {
        const aux = formValues[name]
        if (aux[index].remove) {
            delete aux[index].remove
        } else {
            aux[index].remove = true
        }
        setFormValues({ ...formValues, [name]: aux })
    }

    const handleAdd = (name, options) => {
        const aux = formValues[name]
        aux.push(options)
        setFormValues({ ...formValues, [name]: aux })
    }

    return (
        <div className="p-3">
            <PhoneDetail formValues={formValues} info={info}></PhoneDetail>
            {/*<pre>{JSON.stringify(formValues, undefined, 2)}</pre>*/}

            <Message props={message}></Message>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={disabled}>
                    <h3>Celular</h3>
                    <div className="row">
                        <div className="col">
                            <GenericSelectFeature title="Número" value={info.deviceNumber} handleFormChange={(e) => setInfo({ ...info, deviceNumber: e.target.value })} options={amount}></GenericSelectFeature>
                        </div>
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
                        {
                            formValues.imei.map(
                                (item, index) => {
                                    return (
                                        <Imei value={item.number} remove={item.remove} name="number" container="imei" title={`Imei ${index + 1}`} handleRemove={() => handleRemove("imei", index)} handleChange={(e) => handleChange(e, index)} key={(item.id ? item.id : "imei" + index)}></Imei>
                                    )
                                }
                            )
                        }
                    </section>
                    <hr />
                    <section>
                        <Header title={"Simcard"} handleAdd={() => handleAdd("simcard", { number: "", company: "" })}></Header>
                        {formValues.simcard.map(
                            (item, index) => {
                                return (
                                    <Simcard company={item.company} number={item.number} container="simcard" remove={item.remove} handleRemove={() => handleRemove("simcard", index)} handleChange={(e) => handleChange(e, index)} key={item.id ? item.id : "sim" + index}></Simcard>
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
                                    <Battery brand={item.brand} model={item.model} container="battery" remove={item.remove} handleRemove={() => handleRemove("battery", index)} handleChange={(e) => handleChange(e, index)} key={item.id ? item.id : "battery" + index}></Battery>
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
                                    <Microsd type={item.type} capacity={item.capacity} container="microsd" remove={item.remove} handleRemove={() => handleRemove("microsd", index)} handleChange={(e) => handleChange(e, index)} key={item.id ? item.id : "microsd" + index}></Microsd>
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
                            <UpdateButton deviceInfo={formValues.device.id}></UpdateButton>
                            <DeleteButton deviceInfo={formValues.device.id} handleDelete={handleDelete}></DeleteButton>
                        </div>
                    </section>
                </fieldset>
            </form>
        </div>
    )
}
export default memo(PhoneForm)