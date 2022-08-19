import Disk from "./generic/Disk"
import DeviceDetail from "./generic/DeviceDetail"
import GenericFeature from "../generics/GenericFeature"
import DeleteButton from "../generics/DeleteButton"
import UpdateButton from "../generics/UpdateButton"
import { useState } from "react"
function Notebook({ device }) {
    const initialValues = {
        type: {
            2: 1
        },
        device: {
            model: "",
            brand: "",
            sn: "",
            detail: ""
        },
        battery: {
            model: "",
            brand: "",
            sn: ""
        },
        disk: {
            brand: "",
            model: "",
            sn: "",
            capacity: ""
        },
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [deviceInfo, setDeviceInfo] = useState(device)


    const deleteForm = () => {
        console.log("delete")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("new")
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

                <form onSubmit={handleSubmit}>
                    <pre>{JSON.stringify(formValues, null, 5)}</pre>
                    <div className="text-center mt-1">
                        <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
                        <DeleteButton deviceInfo={deviceInfo} deleteForm={deleteForm}></DeleteButton>
                    </div>
                    <h3>Notebook</h3>
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
                    <h3>Batería</h3>
                    <div className="row">
                        <div className="col">
                            <GenericFeature type="text" name="brand" value={formValues.battery.brand} container="battery" handleChange={handleChange} title="Marca"></GenericFeature>
                        </div>
                        <div className="col">
                            <GenericFeature type="text" name="model" value={formValues.battery.model} container="battery" handleChange={handleChange} title="Model"></GenericFeature>
                        </div>
                        <div className="col">
                            <GenericFeature type="text" name="sn" value={formValues.battery.model} container="battery" handleChange={handleChange} title="Model"></GenericFeature>
                        </div>
                    </div>
                    <hr />
                    <Disk formValues={formValues} handleChange={handleChange}></Disk>
                    <hr />
                    <DeviceDetail name="detail" value={formValues.device.detail} container="device" handleChange={handleChange} title="Detalle"></DeviceDetail>
                    <div className="text-center mt-1">
                        <UpdateButton deviceInfo={deviceInfo}></UpdateButton>
                        <DeleteButton deviceInfo={deviceInfo} deleteForm={deleteForm}></DeleteButton>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Notebook