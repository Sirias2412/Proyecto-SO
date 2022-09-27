import React, { useRef, useEffect, useState } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1, user2uid }) => {
  const scrollRef = useRef();
  const CryptoJS = require("crypto-js");
  const [texto,setTexto]= useState("")


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    const bytes  = CryptoJS.AES.decrypt(msg.text, 'dnf key');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setTexto(decryptedData)
  }, [msg]);
  
  return (
    <div
      className={`message_wrapper ${msg.from === user1  ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {(msg.type ==="audio")  && ( <audio src={msg.media} controls ></audio>)}
        {(msg.type ==="video")  && (<video src={msg.media} controls ></video>)}
        {msg.media ? <img src={msg.media} alt={texto} /> : null}
        {texto}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;