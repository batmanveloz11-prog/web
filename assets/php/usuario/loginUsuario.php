<?php

require_once("../config.php");

$valido['success'] = array('success' => false, 'mensaje'=> "", 'nombre'=> "");
//Error en la estructura
if($_POST){
    $correo = md5($_POST["correo"]);
    $password = $_POST["password"];

    $sql = "SELECT * FROM usuario WHERE correo='$correo' AND password='$password'";
    $resultado=$cx->query($sql);
    $n=$resultado->num_rows;
    if($n>0){
        $row=$resultado->fetch_array();
            $valido['success']=true;
            $valido['mensaje']="BIENVENIDO ".strtoupper($row['nombre']);
            $valido['nombre']=strtoupper($row['nombre']);

    } else {
        $valido['success']=false;
        $valido['mensaje']="El correo o contraseña son incorrectos";
    }
    } else {
        $valido['success']=false;
        $valido['mensaje']="No se han recibido datos";
        
    }
echo json_encode($valido);
?>