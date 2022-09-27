/*
Esta clase fue creada para importar un modelo de barra a traves de la cual enviar mensajes al chat de otro usuario
*/
import React from "react";
import { FaPaperclip } from 'react-icons/fa';
import '../estilos/barraMensaje.css'

const Attachment = () => {
  return (
    <div className='contenedor_boton_opciones3'>
        <div className='boton_opciones3'>
            <FaPaperclip color='white' size={22}></FaPaperclip>
        </div>
    </div>
  );
};

export default Attachment;
