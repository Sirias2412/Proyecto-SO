import React from 'react'
import '../estilos/opcionesBotos.css'

const OpcionesBots = () => {

    return (
        <div>
            <div className='menuBots'>
                <ul>
                    <li className='opcion_1'>
                        <button className='botonBots'>
                            Consultar el clima
                        </button>
                    </li>
                    <li>
                        <button className='botonBots' >
                            Traducir texto
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default OpcionesBots