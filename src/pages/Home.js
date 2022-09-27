import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import {v4} from "uuid";
import Menu from '../components/Menu';
import Iniciar_chat from '../components/Iniciar_chat';
import BarraNomUsuario from "../components/BarraNomUsuario";
import MenuOpcionesGenerales from '../components/MenuOpcionesGenerales';
import { FaEllipsisV } from 'react-icons/fa';
import MenuOpcionesUsuarios from '../components/MenuOpcionesUsuarios';
import OpcionesBots from "../components/OpcionesBots";


const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [menuOpciones, setmenuOpciones] = useState(false);
  const [menuOpcionesUsuario, setmenuOpcionesUsuario] = useState(false);
  const [menuBots, setmenuBots] = useState(false);
  const CryptoJS = require("crypto-js");

  const user1 = auth.currentUser.uid;


  useEffect(() => {
    const usersRef = collection(db, "users");
    //Se crea un query para obtener los usuarios que no son el logueado
    const q = query(usersRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const abrirOpciones =  async ()  => {
    setmenuBots(!menuBots);
  }


   
  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    //Logica de muestra de mensajes, ordenaos por fecha de envio
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    //Saca los mensajes
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    //Obtiene el ultimo mensaje enviado
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      // Actualiza la NO lectura a falso para que no muestre el icono de nuevo mensaje
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url = "";
    let type = "";

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), 'dnf key').toString();
    
    //Carga la imagen o video en FireStorege
    if (img) {
      const imgRef = ref(storage,`files/${img.name + v4()}`);
      type = img.type.split('/')[0]
      await uploadBytes(imgRef, img)
      await getDownloadURL(imgRef).then(function(url1) {
        url = url1
      })
    }

    //Agrega un nuevo mensaje a la collecion
    await addDoc(collection(db, "messages", id, "chat"), {
      text: ciphertext,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      type:type,
    });

    //Ingresa o actualiza el último mensaje
    await setDoc(doc(db, "lastMsg", id), {
      text: ciphertext,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      type:type,
      unread: true,
    });
    setText("");
    setImg("");
  };

  return (
    <div className="home_container">
      <div>
        <div className='barraMenu'>
          <Menu> </Menu>
          <div className='contenedor_boton_opciones'>
            <button className='boton_opciones' onClick = {() => setmenuOpciones(!menuOpciones)}>
                <FaEllipsisV color='white'></FaEllipsisV>
            </button>
          </div>
          {menuOpciones ? (
            <>
              <MenuOpcionesGenerales></MenuOpcionesGenerales>
            </>
          ): null }
        </div>
        <div className="users_container">
          {users.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </div>
      </div>

      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <BarraNomUsuario chat={chat.name} id={chat.uid}> </BarraNomUsuario>
              <div className='contenedor_boton_opciones2'>
                <button className='boton_opciones' onClick = {() => setmenuOpcionesUsuario(!menuOpcionesUsuario)}>
                  <FaEllipsisV color='white'></FaEllipsisV>
                </button>
              </div>
              {menuOpcionesUsuario ? (
                <>
                  <MenuOpcionesUsuarios></MenuOpcionesUsuarios>
                </>
              ): null }
            </div>
            {menuBots ? (
                <>
                  <OpcionesBots></OpcionesBots>
                </>
              ): null }
           
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            
            <div className="form_mensajes">
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
                setImg={setImg}
                abrirOpciones={abrirOpciones}
              />
            </div>
          </>
        ) : (
          <Iniciar_chat></Iniciar_chat>
        )}
      </div>
    </div>
  );
};

export default Home;