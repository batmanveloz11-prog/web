
var sesion=localStorage.getItem("nombre");
const checarSesion=()=>{
    if(sesion==null){
        window.location.href="index.html";
    }
    document.querySelector("#usuario").innerHTML=sesion;
}
const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}
const cerrarModal=(modal)=>{
    const myModal =bootstrap.Modal.getInstance(document.getElementById(modal));
    myModal.hide(); 
      const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
}

const agregarContacto = async() => {
    var nombre = document.querySelector("#nombre").value;
    var ap = document.querySelector("#ap").value;
    var am = document.querySelector("#am").value;
    var telefono = document.querySelector("#telefono").value;
    var correo = document.querySelector("#correo").value;

    if (nombre.trim() === "" || ap.trim() === "" || am.trim() === "" || telefono.trim() === "" || correo.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, completa todos los campos.",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    
    

    const datos = new FormData();
    
    
    datos.append("nombre", nombre);
    datos.append("ap", ap);
    datos.append("am", am);
    datos.append("telefono", telefono);
    datos.append("correo", correo);


    var respuesta=await fetch("assets/php/contacto/agregarContacto.php", {
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
        document.querySelector("#formAgregar").reset();
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
    }
    document.querySelector("#agregarModal").click();
    cerrarModal("agregarModal");
    cargarContactos();
}
const cargarContactos = async() => {
    var respuesta=await fetch("assets/php/contacto/cargarContactos.php",{});
    var registrosHTML = ``;
    var resultado =await respuesta.json();

    //console.log(resultado);


    resultado.data.forEach(fila=>{
        registrosHTML+=`
            <tr>
                <td>${fila[1]}</td>
                <td>${fila[2]}</td>
                <td>${fila[3]}</td>
                <td>${fila[4]}</td>
                <td>${fila[5]}</td>
                <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarContacto(${fila[0]})"><i class="bi bi-person-add p-1"></i>Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminarContacto(${fila[0]})"><i class="bi bi-person-x p-1"></i>Eliminar</button></td>  
            </tr> 
        `;
    });

    document.querySelector("#registros").innerHTML = registrosHTML;
}
const eliminarContacto = (contactoid) => {
    Swal.fire({
        title: "¿Estás seguro de eliminar este contacto?",
        showDenyButton: true,
        confirmButtonText: "SI",
        confirmButtonColor: "#198754",
        denyButtonText: `NO`,
    }).then(async(result) => {
        if (result.isConfirmed) {
                const datos = new FormData();
                datos.append("contactoid", contactoid);
                var respuesta=await fetch("assets/php/contacto/eliminarContacto.php", {
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
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: resultado.mensaje,
                        footer: "INICIO DE SESIÓN"
                    });
                }
         
        cargarContactos();
      }
    }); 
}
const cargarContacto = async(contactoid) => {
    const datos = new FormData();
    datos.append("contactoid", contactoid);
    var respuesta=await fetch("assets/php/contacto/cargarContacto.php", {
        method: "POST",
        body: datos
    });

    var resultado = await respuesta.json();
    document.querySelector("#contactoid").value = resultado.contactoid;
    document.querySelector("#enombre").value = resultado.nombre;
    document.querySelector("#eap").value = resultado.ap;
    document.querySelector("#eam").value = resultado.am;
    document.querySelector("#etelefono").value = resultado.telefono;
    document.querySelector("#ecorreo").value = resultado.correo;
}
const editarContacto = async() => {
    var contactoid = document.querySelector("#contactoid").value;
    var nombre = document.querySelector("#enombre").value;
    var ap = document.querySelector("#eap").value;
    var am = document.querySelector("#eam").value;
    var telefono = document.querySelector("#etelefono").value;
    var correo = document.querySelector("#ecorreo").value;
    if (nombre.trim() === "" || ap.trim() === "" || am.trim() === "" || telefono.trim() === "" || correo.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, completa todos los campos.",
            footer: "INICIO DE SESIÓN"
        })
        return
    }
    

    const datos = new FormData();
    
    datos.append("contactoid", contactoid);
    datos.append("nombre", nombre);
    datos.append("ap", ap);
    datos.append("am", am);
    datos.append("telefono", telefono);
    datos.append("correo", correo);


    var respuesta=await fetch("assets/php/contacto/editarContacto.php", {
        method: "POST",
        body: datos
    });

    var resultado = await respuesta.json();
    document.querySelector("#editarModal").click();
    cerrarModal("editarModal");
    if (resultado.success==true) {
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
        document.querySelector("#formEditar").reset();
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: resultado.mensaje,
            footer: "INICIO DE SESIÓN"
        });
    }
    cargarContactos();

}