import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../estilos/register.css';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    telefono:"",
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password,telefono, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        telefono,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        telefono,
        error: null,
        loading: false,
      });
      navigate('/Home');
    } catch (err) {
      setData({ ...data,loading: false });
      alert(err.message)
    }
  };

  return (
    <div>
        <h3>
            Crear una nueva cuenta
        </h3>
        <form className="formRegistrar" onSubmit={handleSubmit}>
            <div className='contenedor_input'>
                <input type="text" name="name" placeholder='Nombre de usuario' value={name}  onChange={handleChange} required></input>
            </div>
            <div className='contenedor_input'>
                <input  ctype="email" name="email" placeholder='Correo electrónico' value={email} onChange={handleChange}  required></input>
            </div>
            <div className='contenedor_input'>
                <input type="text" name="password" placeholder='Contraseña' value={password} onChange={handleChange} required></input>
            </div>
            <div className='contenedor_input'>
                <input type="tel" name="telefono" placeholder='Telefono celular' value={telefono} onChange={handleChange} required></input>
            </div>
            <div className='contenedor_boton'>
                <button className='boton'>
                    {loading ? 'Creando ...' : 'Registrarse'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Register;