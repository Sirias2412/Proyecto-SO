import React from "react";
import '../estilos/menuOpcionesMensajes.css'

const MenuOpcionesMensajes = () => {
    return (
        <div>
            <div className='menuOpcionesMensajes'>
                <ul>
                    <li className='opcion_1'>
                        <button className='botonMenuMensajes'>
                            Editar Mensaje
                        </button>
                    </li>
                    <li className='opcion_1'>
                        <button className='botonMenuMensajes' >
                            Eliminar Mensaje
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuOpcionesMensajes