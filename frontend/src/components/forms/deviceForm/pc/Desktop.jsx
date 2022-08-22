import apis from "../../../../services/apiCalls"

import Disk from "./generic/Disk"
import GenericFeature from "../generics/GenericFeature"
import DeleteButton from "../generics/DeleteButton"
import UpdateButton from "../generics/UpdateButton"

import { useState } from "react"

function Desktop({ device, info }) {

    const initialValues = {
        device: {
            model: "",
            brand: "",
            sn: "",
            detail: "",
        },
        disk: {
            brand: "",
            model: "",
            sn: "",
            capacity: ""
        }
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [deviceInfo, setDeviceInfo] = useState(device)

    const deleteForm = () => {
        console.log("delete")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await apis.newDevice({ ...formValues, info })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const container = e.target.getAttribute("container")
        const aux = formValues[container]
        aux[name] = value
        setFormValues({ ...formValues, [container]: aux })
    }

    return (
        <>
            <div className="mt-3">
                <h3>Pc de escritorio</h3>
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                <pre>{JSON.stringify(info, undefined, 2)}</pre>
                <form onSubmit={handleSubmit}>
                    <div className="text-center mt-1">
                        <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
                        <DeleteButton deviceInfo={deviceInfo} deleteForm={deleteForm}></DeleteButton>
                    </div>
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
                    <Disk formValues={formValues} handleChange={handleChange}></Disk>
                    <hr />
                    <GenericFeature name="detail" value={formValues.device.detail} container="device" handleChange={handleChange} title="Detalle"></GenericFeature>
                    <div className="text-center mt-1">
                        <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
                        <DeleteButton deviceInfo={deviceInfo} deleteForm={deleteForm}></DeleteButton>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Desktop