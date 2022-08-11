export default function validation(values) {
    console.log("asdads")
    const errors = {}
    if (!values.fileNumber) {
        errors.fileNumber = "Debe ingresar un número de expediente"
    }
    if (isNaN(values.fileNumber.replace("/", ""))) {
        errors.fileNumber = "Formato incorrecto, debe respetar el formato XXXX/YY ó XXXXYY"
    }
    if (!values.shiftDate) {
        errors.shiftDate = "Debe asignarse una fecha de turno"
    }
    return errors
}