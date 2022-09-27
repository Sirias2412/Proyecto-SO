import React, { useEffect, useState, useRef} from "react";
import '../estilos/barraNomUs.css'
import { onSnapshot,doc } from "firebase/firestore";
import { db } from "../firebase";

const BarraNomUsuario = ({chat , id} ) => {

    const [data, setData] = useState("");

    useEffect(() => {
        let usuario = onSnapshot( doc(db,'users',id), (doc) => {
          setData(doc.data());
        });
      });
    

  return (
    <div className='contenedor'>
        <div className="info_Usuario">
            <h3>{chat}</h3>
            {data?.isOnline ? (
                <>
                    <h4>En Linea</h4>
                </>
            ) : (
                <>
                    <h4>Desconectado</h4>
                </>)
            }
        </div>
    </div>
  )
}

export default BarraNomUsuario