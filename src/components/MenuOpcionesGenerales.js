import React, {useState} from "react";
import '../estilos/menuOpcionesGene.css'
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import {auth,db} from '../firebase';
import {useNavigate} from 'react-router-dom';
import Modal_Estadisticas from '../components/Estadisticas.js';

const MenuOpcionesGenerales = () => {

    const navigate = useNavigate();

    const [estadisticas, setestadisticas] = useState(false);
  
    const handleClose = () => setestadisticas(false);
    const handleShow = () => setestadisticas(true);

    const handleSignout = async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          isOnline: false,
        });
        await signOut(auth);
        navigate("/");
      };

    return (
        <div>
            <div className='menuOpcionesGene'>
                <ul>
                    <li className='opcion_1'>
                        <button className='botonMenuGenral' onClick={handleShow}>
                            Estadísticas
                        </button>
                    </li>
                    <li className='opcion_1'>
                        <button className='botonMenuGenral' >
                            Programar recordatorio
                        </button>
                    </li>
                    <li >
                        <button className='botonMenuGenral' onClick={handleSignout}>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
            {estadisticas ? (
                <>
                    <Modal_Estadisticas show={estadisticas} handleClose={handleClose}></Modal_Estadisticas>
                </>
            ): null}
        </div>
    )
}

export default MenuOpcionesGenerales