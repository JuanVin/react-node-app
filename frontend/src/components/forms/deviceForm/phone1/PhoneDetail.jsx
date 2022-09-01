function PhoneDetail({ formValues, info }) {
    return (
        <>
            <p className="border border-success rounded p-2">
                {
                    `
                    ${info.deviceNumber}) celular marca ${formValues.device.brand.toUpperCase()} modelo ${formValues.device.model.toUpperCase() + ","}
                    ${formValues.simcard.length > 0 ?
                        formValues.simcard.map(
                            (sim, index) => {
                                return `SIMCARD #${index + 1} N° ${sim.number} perteneciente a la empresa ${sim.company.toUpperCase()},`
                            }
                        )
                        :
                        "NO POSEE SIMCARD,"
                    }
                    ${formValues.battery.length > 0 ?
                        formValues.battery.map(
                            (battery, index) => {
                                return battery.integrated ? "batería INTERNA INTEGRADA," : `batería marca ${battery.brand.toUpperCase()} modelo ${battery.model.toUpperCase()},`
                            }
                        )
                        :
                        "NO POSEE batería,"
                    }
                    ${formValues.microsd.length > 0 ?
                        formValues.microsd.map(
                            (micro, index) => {
                                return `tarjeta de memoria tipo ${micro.type.toUpperCase()} de ${micro.capacity}GB de capacidad,`
                            }
                        )
                        :
                        "no posee tarjeta de memoria,"
                    }
                    ${formValues.imei.length > 0 ?
                        formValues.imei.map(
                            (imei, index) => {
                                return `IMEI físico #${index + 1} N° ${imei.number}`
                            }
                        )
                        :
                        "IMEI físico no visible,"
                    }
                    ${formValues.device.detail ? "el cual presenta el siguiente detalle: " + formValues.device.detail + "," : ""} 
                    ${formValues.device.extraction ? formValues.device.extraction : ""}.
                    `
                }
            </p>
        </>
    )
}
export default PhoneDetail