import React, { useEffect, useState, useRef} from "react";
import Img from "../usuario.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";


const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");
  

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <img src={ Img} alt="avatar" className="avatar" />
            <h4>{user.name}</h4>
          </div>
          {data?.from !== user1 && data?.unread && (
              <small className="unread">Nuevo</small>
            )}
        </div>
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${chat.name === user.name && "selected_user"}`}
      >
      </div>
    </>
  );
};

export default User;