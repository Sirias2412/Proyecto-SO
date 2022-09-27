import React, { useEffect, useState } from "react";
import '../estilos/estadisticas.css';
import { db, auth } from "../firebase";
import {
  collection, getDocs} from "firebase/firestore";
const CryptoJS = require("crypto-js");

const Modal_Estadisticas = ({ handleClose, show }) => {
  
    const [cantidadMensajes, setcantidadMensajes] = useState([]);
    const [cantidadImagenes, setcantidadImagenes] = useState([]);
    const [cantidadVideos, setcantidadVideos] = useState([]);
    const [cantidadAudios, setcantidadAudios] = useState([]);
    const [cantidadPalabras, setcantidadPalabras] = useState([]);
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const user1 = auth.currentUser.uid;

    const estadisticas_Resultados = async () => {
      let usuarios=[];
      let mesnajes=[];
      let ids= [];
      let texto=0;
      let imagenes=0;
      let video=0;
      let audio=0;
      let canPalabras=0;

      const usuariosRef = collection(db,"users");
      const querySnapshot = await getDocs(usuariosRef)
      const data = querySnapshot.docs.map(docuemnto => 
        usuarios.push(docuemnto.id)
      )

      for ( var i = 0; i < usuarios.length; i++) {
        if(user1 !=  usuarios[i]){
          const var1 = user1 + usuarios[i];
          const var2 = usuarios[i] + user1;
          ids.push(var1,var2)
        }
      }

      for ( var i = 0; i < usuarios.length; i++) {
        const msgsRef = collection(db, "messages", ids[i], "chat");
        const querySnapshot = await getDocs(msgsRef)
        const data = querySnapshot.docs.map(docuemnto => 
          mesnajes.push(docuemnto.data())
        )
      }

      for ( var i = 0; i < mesnajes.length; i++) {
        if(mesnajes[i].from === user1){
          if(mesnajes[i].type === 'audio'){
            audio=audio+1;
          }else if(mesnajes[i].type === 'image'){
            imagenes=imagenes+1;
          }else if(mesnajes[i].type === 'video'){
            video=video+1;
          }else{
            texto=texto+1;
            const bytes  = CryptoJS.AES.decrypt(mesnajes[i].text, 'dnf key');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            const words = decryptedData.split(" ");
            canPalabras= canPalabras+words.length;
          }
        }
      }      
      setcantidadImagenes(imagenes);
      setcantidadAudios(audio);
      setcantidadMensajes(texto);
      setcantidadVideos(video);
      setcantidadPalabras(canPalabras);
    }

    useEffect(() => {
      estadisticas_Resultados();
    },[])


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='titulo'>
            <h1>Estadisticas del Usuario</h1>
        </div>
        <div className="info_Estadistica">
          <h2>Cant. de mensajes de texto enviados: <text>{cantidadMensajes}</text></h2>
          <h2>Cant. de imagenes enviadas: <text>{cantidadImagenes}</text></h2>
          <h2>Cant. de audios enviados: <text>{cantidadAudios}</text></h2>
          <h2>Cant. de videos enviados:<text>{cantidadVideos}</text></h2>
          <h2>Cant. de numero de palabras enviadas: <text>{cantidadPalabras}</text></h2>
          <h2>Usuario con mayor frecuencia:</h2>
          <h2>Usuario con menos frecuencia:</h2>
        </div>
        <div className='boton_cerrar'>
            <button className='cerrar_estadisticas' type="button" onClick={handleClose}>
            Close
            </button>
        </div>
      </section>
    </div>
  );
};

export default Modal_Estadisticas;