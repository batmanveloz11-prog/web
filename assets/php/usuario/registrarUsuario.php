<?php

require_once("../config.php");

$valido['success'] = array('success' => false, 'mensaje'=> "");
//Error en la estructura
if($_POST){
    $nombre = $_POST["nombre"];
    $correo = md5($_POST["correo"]);
    $password = $_POST["password"];

    $sql = "SELECT * FROM usuario WHERE correo='$correo'";
    $resultado=$cx->query($sql);
    $n=$resultado->num_rows;
    if($n==0){
        $sqlInsertar = "INSERT INTO usuario VALUES (null, '$correo', '$password', '$nombre')";
        if($cx->query($sqlInsertar) === true){
            $valido['success']=true;
            $valido['mensaje']="Usuario registrado correctamente";
        } else {
            $valido['success'] =false;
            $valido['mensaje'] = "Error no se guardo"; 
        } 
    } else {
        $valido['success']=false;
        $valido['mensaje']="El correo ya existe";
    }
    } else {
        $valido['success']=false;
        $valido['mensaje']="No se han recibido datos";
        
    }
echo json_encode($valido);
?>