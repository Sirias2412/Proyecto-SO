import React from 'react'
import { Link } from 'react-router-dom'
import '../estilos/navBar.css';
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import {auth,db} from '../firebase';
import {useNavigate} from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav>
        <h1>
          <Link to='/inicio'>App Chat</Link>
        </h1>
        <div>
          {auth.currentUser ? (
            <>
            <button className='btn' onClick={handleSignout}> Cerrar secion</button>
            </>
          ): (
            <>
              <Link to='/register'>Registrase</Link>
              <Link to='/login'>Ingresar</Link>
            </>
          )}
        </div>
    </nav>
  )
}

export default Navbar