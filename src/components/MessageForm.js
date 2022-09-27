import React, {useState} from "react";
import Attachment from "./barraMensaje";
import { FaTelegramPlane , FaRobot} from 'react-icons/fa';
import '../estilos/barraMensaje.css';

const MessageForm = ({ handleSubmit, text, setText, setImg, abrirOpciones }) => {

  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        style={{ display: "none" }}
      />
      <div>
        <input
          type="text"
          placeholder="Escribe un mensaje"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='contenedor_boton_opciones3'>
        <button className='boton_opciones3'>
            <FaTelegramPlane color='white' size={22}></FaTelegramPlane>
        </button>
      </div>
      <div className='contenedor_boton_bots'>
        <div className='boton_bots'  onClick = {abrirOpciones}>
            <FaRobot color='white' size={22}></FaRobot>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;