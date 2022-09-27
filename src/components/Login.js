import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../estilos/login.css';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
    
    
      const navigate = useNavigate();
    
      const { email, password, error, loading } = data;
    
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!email || !password) {
          setData({ ...data, error: "All fields are required" });
        }
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
    
          await updateDoc(doc(db, "users", result.user.uid), {
            isOnline: true,
          });
          setData({
            email: "",
            password: "",
            error: null,
            loading: false,
          });
          navigate('/Home');
        } catch (err) {
          setData({ ...data, loading: false });
          alert(err.message)
        }
      }; 

  return (
    <div>
        <h3>
          Ingresar
        </h3>
        <form className="formRegistrar" onSubmit={handleSubmit}>
            <div className='contenedor_input'>
                <input  ctype="email" name="email" placeholder='Correo electrónico' value={email} onChange={handleChange}  required></input>
            </div>
            <div className='contenedor_input'>
                <input type="password" name="password" placeholder='Contraseña' value={password} onChange={handleChange} required></input>
            </div>
            <div className='contenedor_boton'>
                <button className='boton'>
                    {loading ? 'Ingresando ...' : 'Ingresar'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login