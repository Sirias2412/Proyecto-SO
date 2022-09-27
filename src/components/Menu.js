import React from 'react'
import '../estilos/menuBarra.css'

const Menu = () => {
  return (
    <div>
        <div className='contenedor_busqueda'>
            <input  ctype="text" name="busqueda" placeholder='Buscar'></input>
        </div>
    </div>
  )
}

export default Menu