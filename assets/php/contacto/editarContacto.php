<?php

require_once("../config.php");

$valido['success'] = array('success' => false, 'mensaje'=> "");
//Error en la estructura
if($_POST){
    $id = $_POST['contactoid'];
    $nombre = $_POST['nombre'];
    $ap = $_POST['ap'];
    $am = $_POST['am'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];

    
        $sqlInsertar = "UPDATE contacto SET nombre='$nombre', ap='$ap', am='$am', telefono='$telefono', correo='$correo' WHERE contactoid=$id";
        if($cx->query($sqlInsertar) === true){
            $valido['success']=true;
            $valido['mensaje']="Contacto actualizado correctamente";
        } else {
            $valido['success'] =false;
            $valido['mensaje'] = "Error no se actualizo"; 
        }
    } else {
        $valido['success']=false;
        $valido['mensaje']="No se han recibido datos";
        
    }
echo json_encode($valido);
?>