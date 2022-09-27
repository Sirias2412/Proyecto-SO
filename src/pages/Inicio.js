import React, { useState } from "react";
import Log from '../components/Login';
import Reg from '../components/Register';
import '../estilos/inicio.css';
import image from '../logo.png'

const Inicio = () => {
    const [login, setlogin] = useState(false)
    const [register, setregister] = useState(false)
    const [info, setinfo] = useState(true)


    function cambiarLogin() {
        setregister(false)
        setlogin(true)
        setinfo(false)
    }

    function cambiarRegister() {
        setlogin(false)
        setregister(true)
        setinfo(false)
    }
  
    return (
      <section>
        <div className="logReg">
                {info ? (
                    <>
                        <h3>DNF CHAT</h3>
                        <img className="imagenlogo" src={image} />
                        <p>Bienvenido a DNF chat. Registrate y comienza a chatear con tus amigos.</p>
                    </>
                ): null } 
                {login ? (
                <>
                    <Log></Log>
                </> 
                ): null}     
                {register ? (
                    <>
                    <Reg></Reg>
                    </>
                ): null}
        </div>
        <div className="botones">
            <button className='bot' onClick={cambiarLogin}> Login</button>
            <button className='bot' onClick={cambiarRegister}> Register</button>
        </div>     
      </section>
    )
}

export default Inicio;