<?php

require_once("../config.php");

$valido['success'] = array('success' => false, 'mensaje'=> "");
//Error en la estructura
if($_POST){
    $nombre = $_POST['nombre'];
    $ap = $_POST['ap'];
    $am = $_POST['am'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];

    
        $sqlInsertar = "INSERT INTO contacto VALUES (null, '$nombre', '$ap', '$am', '$telefono', '$correo')";
        if($cx->query($sqlInsertar) === true){
            $valido['success']=true;
            $valido['mensaje']="Contacto registrado correctamente";
        } else {
            $valido['success'] =false;
            $valido['mensaje'] = "Error no se guardo"; 
        }
    } else {
        $valido['success']=false;
        $valido['mensaje']="No se han recibido datos";
        
    }
echo json_encode($valido);
?>