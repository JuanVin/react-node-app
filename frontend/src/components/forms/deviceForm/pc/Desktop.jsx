import apis from "../../../../services/apiCalls"

import Disk from "./generic/Disk"
import Header from "../generics/Header"

import GenericFeature from "../generics/GenericFeature"
import GenericTextArea from "../generics/GenericTextArea"
import DeleteButton from "../generics/DeleteButton"
import UpdateButton from "../generics/UpdateButton"
import Message from "../../../commons/Message"

import { useState, useEffect } from "react"


function Desktop({ device, info }) {

    const initialValues = {
        device: {
            model: "",
            brand: "",
            sn: "",
            detail: "",
        },
        disk: []
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [disabled, setDisabled] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (device) {
            setInputValues()
        }
    }, [])

    const setInputValues = () => {
        setFormValues({
            ...formValues,
            device: {
                model: device.model,
                brand: device.brand,
                sn: device.sn,
                detail: device.detail,
                id: device.id
            },
            disk: device.Disks
        })
    }

    const deleteForm = () => {
        console.log("delete")
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
            if (query.status === 200) {
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
        }
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

    return (
        <>

            <div className="m-3">
                <h3>Pc de escritorio</h3>
                <pre>{/*JSON.stringify(formValues, undefined, 2)}</pre>
                <pre>{JSON.stringify(info, undefined, 2)*/}</pre>
                <Message props={message}></Message>
                <fieldset disabled={disabled}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
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
                        <Header title="Disco" handleAdd={() => handleAdd("disk", { brand: "", model: "", sn: "", capacity: "" })}></Header>
                        {formValues.disk.map(
                            (item, index) => {
                                return (
                                    <Disk brand={item.brand} model={item.model} sn={item.sn} capacity={item.capacity} title={`Disco ${index + 1}`} container="disk" handleChange={(e) => handleChange(e, index)} key={index}></Disk>
                                )
                            }
                        )}
                        <hr />
                        <GenericTextArea name="detail" value={formValues.device.detail} container="device" handleChange={handleChange} title="Detalle"></GenericTextArea>
                        <div className="text-center mt-1">
                            <UpdateButton deviceInfo={device}></UpdateButton>
                            <DeleteButton deviceInfo={device} deleteForm={deleteForm}></DeleteButton>
                        </div>
                    </form>
                </fieldset>

            </div>
        </>
    )
}
export default Desktop