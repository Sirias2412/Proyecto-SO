import React from 'react'
import '../estilos/iniciar_chat.css'
import image from '../logo.png'

const Iniciar_chat = () => {
  return (
    <div className='inicio'>
        <img className="imagenlogo2" src={image} />
        <h3 className="frase">Empieza a chatear con tus amigos</h3>
    </div>
  )
}

export default Iniciar_chat