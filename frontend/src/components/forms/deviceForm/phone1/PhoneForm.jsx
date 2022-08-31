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

function PhoneForm({ info, device, amount, setInfo, loaded, setLoaded }) {

    // Valores iniciales cuando no hay un dispositivo cargado
    const initialFormValues =
    {
        device: {
            brand: "",
            model: "",
            detail: "",
            extraction: "al que se le realiza",
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

    // Función que setea los valores de formValues cuando hay un dispositivo cargado previamente
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

    // Maneja todos los cambios de los inputs del form para insertarlos en formValues
    const handleChange = (e, index) => {
        const { name, value, checked } = e.target
        const container = e.target.getAttribute("container")
        const aux = formValues[container]

        if (index || index === 0) {
            if (name === "integrated") {
                aux[index] = {
                    brand: "",
                    model: "",
                    integrated: checked
                }
            } else aux[index][name] = value
        } else {
            aux[name] = value
        }

        setFormValues({ ...formValues, [container]: aux })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        let query
        // Comprueba si se debe agregar un nuevo dispositivo o actualizar el actual
        if (formValues.device.id) {
            query = await apis.updateDevice({ ...formValues, info })
        } else {
            query = await apis.newDevice({ ...formValues, info })
        }

        if (query) {
            console.log(query)
            setMessage({ message: query.response.message, status: query.status })
            if (query.response.reload) { // El parámetro reload indica si se debe recargar la página, útil a la hora de eliminar y mover dispositivos de lugar
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
            else if (query.status === 200) {
                if (isDuplicate(loaded, info.deviceNumber) === false) {
                    setLoaded([...loaded, parseInt(info.deviceNumber)]) // Si no hay duplicados, actualiza el array de la paginación con un nuevo número de dispositivo 
                }
                setInputValues(query.response.data) // Carga los valores obtenidos del backend para ser asignados a los inputs
            }
            else {
                setDisabled(false)
            }
        }
    }

    // Comprueba si hay números duplicados en el array de la paginación
    const isDuplicate = (oldArray, deviceNumber) => {
        if (!oldArray.find(element => element === deviceNumber)) {
            return false
        }
        return true
    }

    // Elimina el dispositivo seleccionado en cascada
    const handleDelete = async () => {
        setDisabled(true)
        const query = await apis.deleteDevice({ ...formValues.device, info })
        if (query) {
            console.log(query)
            setMessage({ message: query.response.message, status: query.status })
            if (query.response.reload) {
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
        }
    }

    // Setea un nuevo campo "remove:true" en aquellos datos que se quieren borrar, dicho campo se analiza en el backend para eliminar elementos con su id 
    const handleRemove = (name, index) => {
        const aux = formValues[name]
        if (aux[index].remove) {
            delete aux[index].remove
        } else {
            aux[index].remove = true
        }
        setFormValues({ ...formValues, [name]: aux })
    }

    // Agrega de forma dinámica campos dentro del array que corresponda para luego ser enviados en formato json al backend
    const handleAdd = (name, options) => {
        const aux = formValues[name]
        aux.push(options)
        setFormValues({ ...formValues, [name]: aux })
    }


    return (
        <div className="p-3">
            {<PhoneDetail formValues={formValues} info={info}></PhoneDetail>}
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
                        <Header title={"Batería"} handleAdd={() => handleAdd("battery", { brand: "", model: "", integrated: false })}></Header>
                        {formValues.battery.map(
                            (item, index) => {
                                return (
                                    <Battery brand={item.brand} model={item.model} integrated={item.integrated} container="battery" remove={item.remove} handleRemove={() => handleRemove("battery", index)} handleChange={(e) => handleChange(e, index)} key={item.id ? item.id : "battery" + index}></Battery>
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