import apis from "../../../../services/apiCalls"
import Header from "../generics/Header"

import Disk from "./generic/Disk"
import GenericFeature from "../generics/GenericFeature"
import GenericTextArea from "../generics/GenericTextArea"
import DeleteButton from "../generics/DeleteButton"
import UpdateButton from "../generics/UpdateButton"
import Battery from "./generic/Battery"
import { useState } from "react"
function Notebook({ device, info }) {

    const initialValues = {
        device: {
            model: "",
            brand: "",
            sn: "",
            detail: "",
        },
        battery: [],
        disk: [],
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
            <div className="mt-3">

                <form onSubmit={handleSubmit}>
                    <pre>{JSON.stringify(formValues, null, 5)}</pre>
                    <pre>{JSON.stringify(info, undefined, 2)}</pre>
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
                    <Header title="Batería" handleAdd={() => handleAdd("battery", { brand: "", model: "", sn: "" })}></Header>
                    {formValues.battery.map(
                        (item, index) => {
                            return (
                                <Battery brand={item.brand} model={item.model} sn={item.sn} container="battery" handleChange={(e) => handleChange(e, index)} key={item}></Battery>
                            )
                        }
                    )}
                    <hr />
                    <Header title="Disco" handleAdd={() => handleAdd("disk", { brand: "", model: "", sn: "", capacity: "" })}></Header>
                    {formValues.disk.map(
                        (item, index) => {
                            return (
                                <Disk brand={item.brand} model={item.model} sn={item.sn} capacity={item.capacity} title={`Disco ${index + 1}`} container="disk" handleChange={(e) => handleChange(e, index)} key={item}></Disk>
                            )
                        }
                    )}
                    <hr />
                    <h3>Detalle</h3>
                    <GenericTextArea name="detail" value={formValues.device.detail} container="device" handleChange={handleChange} title=""></GenericTextArea>
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