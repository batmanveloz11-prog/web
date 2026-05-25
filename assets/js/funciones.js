

const validarCorreo = (correo) => {
    return /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(correo.trim());

}

const validarPassword = (password) => {
    return /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password.trim());
}   

const validarUsuario = (nombre) => {
    return /^([a-z0-9 ñáéíóu]{2,60})$/i.test(nombre.trim());
}

