import React from 'react'
import '../estilos/menuOpcionesUs.css'

const MenuOpcionesUsuarios = () => {
  return (
    <div className='menuOpcionesUsuario'>
        <ul>
            <li className='opcion_2'>
                <button className='botonMenuUsuario'>
                    Bloquear Usuaio
                </button>
            </li>
            <li>
                <button className='botonMenuUsuario' >
                    Desbloquear Usuario
                </button>
            </li>
        </ul>
    </div>
  )
}

export default MenuOpcionesUsuarios