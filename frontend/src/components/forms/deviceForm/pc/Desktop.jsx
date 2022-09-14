import apis from "../../../../services/apiCalls"

import Disk from "./generic/Disk"
import Header from "../generics/Header"

import GenericFeature from "../generics/GenericFeature"
import GenericTextArea from "../generics/GenericTextArea"
import DeleteButton from "../generics/DeleteButton"
import UpdateButton from "../generics/UpdateButton"
import Message from "../../../commons/Message"
import GenericSelectFeature from "../generics/GenericSelectFeature"

import { useState, useEffect } from "react"


function Desktop({ device, info, setInfo, amount, setLoaded }) {

    const initialValues = {
        device: {
            model: "",
            brand: "",
            sn: "",
            detail: "",
            origin: info.deviceNumber
        },
        disk: []
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [disabled, setDisabled] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (device) {
            setInputValues(device)
        }
    }, [])

    const setInputValues = (device) => {
        setFormValues({
            ...formValues,
            device: {
                model: device.model,
                brand: device.brand,
                sn: device.sn,
                detail: device.detail,
                id: device.id,
                origin: device.deviceNumber
            },
            disk: device.Disks
        })
        setDisabled(false)
    }

    const handleDelete = async () => {
        setDisabled(true)
        const query = await apis.deleteDevice({ ...formValues.device, info })
        if (query) {
            setMessage({ message: query.response.message, status: query.status })
            if (query.response.reload) {
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        let query
        if (formValues.device.id) {
            query = await apis.updateDevice({ ...formValues, info })
        }
        else {
            query = await apis.newDevice({ ...formValues, info })
        }
        if (query) {
            setMessage({ message: query.response.message, status: query.status })
            console.log(query)
            if (query.response.reload) { // El parámetro reload indica si se debe recargar la página, útil a la hora de eliminar y mover dispositivos de lugar
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
            else if (query.status >= 200 && query.status <= 210) {
                console.log(query.response)
                setLoaded(oldArray => {
                    if (isDuplicate(oldArray, info.deviceNumber) === false) {
                        return [...oldArray, parseInt(info.deviceNumber)]
                    }
                    return oldArray
                })
                setInputValues(query.response.data) // Carga los valores obtenidos del backend para ser asignados a los inputs con los correspondientes ids, para poder actualizarlos
            }
            else {
                setDisabled(false)
            }
        }
    }
    // Comprueba si hay números duplicados en el array de la paginación
    const isDuplicate = (oldArray, deviceNumber) => {
        if (oldArray.find(element => element === deviceNumber)) {
            return true
        }
        return false
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

    const handleAdd = (name, options) => {
        const aux = formValues[name]
        aux.push(options)
        setFormValues({ ...formValues, [name]: aux })
    }

    const handleRemove = (name, index) => {
        const aux = formValues[name]
        console.log(aux)
        if (aux[index].remove) {
            delete aux[index].remove
        } else {
            aux[index].remove = true
        }
        setFormValues({ ...formValues, [name]: aux })
    }

    return (
        <>
            <div className="m-3">
                <h3>Pc de escritorio</h3>
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                <pre>{JSON.stringify(info, undefined, 2)}</pre>
                <Message props={message}></Message>
                <fieldset disabled={disabled}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <GenericSelectFeature title="Número" value={info.deviceNumber} handleFormChange={(e) => setInfo({ ...info, deviceNumber: e.target.value })} options={amount}></GenericSelectFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" name="brand" value={formValues.device.brand} container="device" handleChange={handleChange} title="Marca"></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" name="model" value={formValues.device.model} container="device" handleChange={handleChange} title="Modelo"></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" name="sn" value={formValues.device.sn} container="device" handleChange={handleChange} title="S/N"></GenericFeature>
                            </div>
                        </div>
                        <hr />
                        <Header title="Disco" handleAdd={() => handleAdd("disk", { brand: "", model: "", sn: "", capacity: "", integrated: false })}></Header>
                        {formValues.disk.map(
                            (item, index) => {
                                return (
                                    <Disk info={item} handleRemove={() => handleRemove("disk", index)} title={`Disco ${index + 1}`} container="disk" handleChange={(e) => handleChange(e, index)} key={index}></Disk>
                                )
                            }
                        )}
                        <hr />
                        <GenericTextArea name="detail" value={formValues.device.detail} container="device" handleChange={handleChange} title="Detalle"></GenericTextArea>
                        <div className="text-center mt-1">
                            <UpdateButton deviceInfo={device}></UpdateButton>
                            <DeleteButton deviceInfo={device} handleDelete={handleDelete}></DeleteButton>
                        </div>
                    </form>
                </fieldset>

            </div>
        </>
    )
}
export default Desktop