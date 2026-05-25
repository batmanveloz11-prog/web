<?php

require_once("../config.php");

$valido['success'] = array('success' => false, 'mensaje'=> "");
//Error en la estructura
if($_POST){
    $contactoid = $_POST['contactoid'];

    
        $sqlEliminar = "DELETE FROM contacto WHERE contactoid='$contactoid'";
        if($cx->query($sqlEliminar) === true){
            $valido['success']=true;
            $valido['mensaje']="Contacto eliminado correctamente";
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