const validate = (values) => {
    const errors = {}
    if (!values.username) {
        errors.username = "Nombre de usuario requerido"
    }
    if (!values.password) {
        errors.password = "Contraseña requerida"
    }
    else if (values.password.length < 5) {
        errors.password = "La contraseña debe ser mayor o igual que 5 dígitos"
    }
    return errors
}

export default validate