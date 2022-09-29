import React, { useEffect, useState } from "react";
import '../estilos/estadisticas.css';
import { db, auth } from "../firebase";
import {collection, getDocs,query,where,onSnapshot} from "firebase/firestore";
import image from '../logo.png';


const CryptoJS = require("crypto-js");

const Modal_Estadisticas = ({ handleClose, show }) => {
  
    const [cargando, setcargando] = useState(true);
    const [cantidadMensajes, setcantidadMensajes] = useState([]);
    const [cantidadImagenes, setcantidadImagenes] = useState([]);
    const [cantidadVideos, setcantidadVideos] = useState([]);
    const [cantidadAudios, setcantidadAudios] = useState([]);
    const [cantidadPalabras, setcantidadPalabras] = useState([]);
    const [usuarioFrecuante, setusuarioFrecuante] = useState([]);
    const [usuarioFrecuanteMenos, setusuarioFrecuanteMenos] = useState([]);
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const user1 = auth.currentUser.uid;


    const buscarUsuarioMas = async (id) => {
      const usersRef = collection(db, "users");
      //Se crea un query para obtener los usuarios que no son el logueado
      const q = query(usersRef, where("uid", "==", id));
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setusuarioFrecuante(doc.data().name);
        });
      });
    }

    const buscarUsuarioMenos = async (id) => {
      const usersRef = collection(db, "users");
      //Se crea un query para obtener los usuarios que no son el logueado
      const q = query(usersRef, where("uid", "==", id));
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setusuarioFrecuanteMenos(doc.data().name);
        });
      });
    }


    const verificarRepetido = (lista) => {
      let contador=0;
      let mayor=1;
      let indiceMayor=0;
    
      for(var i=0;i<lista.length;i++){
        contador=0;
        for(var j=0;j<lista.length;j++){
          if(lista[i]===lista[j]){
            contador=contador+1;
          }
        }
        if(contador>mayor){
          indiceMayor=i;
          mayor=contador
        }
      }
      buscarUsuarioMas(lista[indiceMayor])

      contador=0;
      let menor=mayor;
      let indiceMenor=0;
      for(var i=0;i<lista.length;i++){
        contador=0;
        for(var j=0;j<lista.length;j++){
          if(lista[i]===lista[j]){
            contador=contador+1;
          }
        }
        if(contador<=menor){
          indiceMenor=i;
          menor=contador
        }
      }
      buscarUsuarioMenos(lista[indiceMenor])
    }

    const estadisticas_Resultados = async () => {
      let usuarios=[];
      let mensajes=[];
      let ids= [];
      let texto=0;
      let imagenes=0;
      let video=0;
      let audio=0;
      let canPalabras=0;
      let constasFrec=[];

      const usuariosRef = collection(db,"users");
      const querySnapshot = await getDocs(usuariosRef)
      const data = querySnapshot.docs.map(docuemnto => 
        usuarios.push(docuemnto.id)
      )

      for ( var i = 0; i < usuarios.length; i++) {
        if(user1 !=  usuarios[i]){
          const var1 = user1 + usuarios[i];
          const var2 = usuarios[i] + user1;
          ids.push(var1)
          ids.push(var2)
        }
      }
      
      for ( var i = 0; i < ids.length; i++) {
        const msgsRef = collection(db, "messages", ids[i], "chat");
        const querySnapshot = await getDocs(msgsRef)
        const data = querySnapshot.docs.map(docuemnto => 
          mensajes.push(docuemnto.data())
        )
      }

      for ( var i = 0; i < mensajes.length; i++) {
        if(mensajes[i].from === user1){
          if(mensajes[i].type === 'audio'){
            audio=audio+1;
          }else if(mensajes[i].type === 'image'){
            imagenes=imagenes+1;
          }else if(mensajes[i].type === 'video'){
            video=video+1;
          }else{
            texto=texto+1;
            const bytes  = CryptoJS.AES.decrypt(mensajes[i].text, 'dnf key');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            const words = decryptedData.split(" ");
            canPalabras= canPalabras+words.length;
          }
          constasFrec.push(mensajes[i].to)
        }
      }      
      verificarRepetido(constasFrec)
      
      setcantidadImagenes(imagenes);
      setcantidadAudios(audio);
      setcantidadMensajes(texto);
      setcantidadVideos(video);
      setcantidadPalabras(canPalabras);
      setcargando(false);
    }

    useEffect(() => {
      estadisticas_Resultados();
    })


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {!cargando ? (
          <>
            <div className='titulo'>
            <h1>Estadisticas del Usuario</h1>
            </div>
            <div className="info_Estadistica">
              <h2>Cant. de mensajes de texto enviados: <text>{cantidadMensajes}</text></h2>
              <h2>Cant. de imagenes enviadas: <text>{cantidadImagenes}</text></h2>
              <h2>Cant. de audios enviados: <text>{cantidadAudios}</text></h2>
              <h2>Cant. de videos enviados:<text>{cantidadVideos}</text></h2>
              <h2>Cant. de numero de palabras enviadas: <text>{cantidadPalabras}</text></h2>
              <h2>Usuario con mayor frecuencia:<text>{usuarioFrecuante}</text></h2>
              <h2>Usuario con menos frecuencia:<text>{usuarioFrecuanteMenos}</text></h2>
            </div>
            <div className='boton_cerrar'>
                <button className='cerrar_estadisticas' type="button" onClick={handleClose}>
                Close
                </button>
            </div>
          </>
        ):(<>
        <div className="cargando">
          <text>Calculando las estadisticas del usuario</text>
        </div> 
        </>)}
      </section>
    </div>
  );
};

export default Modal_Estadisticas;