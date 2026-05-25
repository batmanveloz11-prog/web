
var sesion=localStorage.getItem("nombre");
const checarSesion=()=>{
    if(sesion!=null){
        window.location.href="inicio.html";
    }

}

const registraUsuario = async() => {
    
    var correo = document.querySelector("#correo").value;
    var password = document.querySelector("#password").value;
    var nombre = document.querySelector("#nombre").value;

    if (correo.trim() === "" || password.trim() === "" || nombre.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, completa todos los campos.",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    
    if (!validarCorreo(correo)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "INTRODUCE UN CORREO VÁLIDO",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    if (!validarPassword(password)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            html: "INTRODUCE UNA CONTRASEÑA VÁLIDA <br> [Maysculas, minusculas, números y min, 8 caracteres]",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    if (!validarUsuario(nombre)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "INTRODUCE UN NOMBRE",
            footer: "INICIO DE SESIÓN"
        })
        return
    }

    const datos = new FormData();
    
    datos.append("correo", correo);
    datos.append("password", password);
    datos.append("nombre", nombre);
    


    var respuesta=await fetch("assets/php/usuario/registrarUsuario.php", {
        method: "POST",
        body: datos
    });

    var resultado = await respuesta.json();

    if (resultado.success==true) {
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
        document.querySelector("#formRegistrar").reset();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
    }
}
const loginUsuario = async() => {
    
    var correo = document.querySelector("#correo").value;
    var password = document.querySelector("#password").value;

    if (correo.trim() === "" || password.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, completa todos los campos.",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    
    if (!validarCorreo(correo)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "INTRODUCE UN CORREO VÁLIDO",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    if (!validarPassword(password)) {
        Swal.fire({
            icon: "error",
            title: "Error",
            html: "INTRODUCE UNA CONTRASEÑA VÁLIDA <br> [Maysculas, minusculas, números y min, 8 caracteres]",
            footer: "INICIO DE SESIÓN"
        })
        return
    }

    
    const datos = new FormData();
    
    datos.append("correo", correo);
    datos.append("password", password);
    


    var respuesta=await fetch("assets/php/usuario/loginUsuario.php", {
        method: "POST",
        body: datos
    });

    var resultado = await respuesta.json();

    if (resultado.success==true) {
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
        document.querySelector("#formIniciar").reset();
        localStorage.setItem("nombre", resultado.nombre);
        setTimeout(() => {
            window.location.href = "inicio.html";
        }, 2000);
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
    }
}