// import React, { useEffect, useState } from 'react'
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import ScrollToBottom from 'react-scroll-to-bottom';
import { user } from "./Home";
import "./chat.css";
import socketIO from "socket.io-client";
import Message from "./Message";
// import { Button } from "@mui/material";


import { useNavigate } from "react-router-dom";

const ENDPOINT = "https://chat-with-editor.herokuapp.com/";
let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    height: 2,
    allowResizeX: false,
    readonly:false,
    allowResizeY: false,
    placeholder:'Chat comes here...',
    buttons: [
      "bold",
      "italic",
      "strikethrough",
      "|",
      "link",
      "|",
      "ul",
      "ol",
      "|",
      "indent",
      "|",
      "source",
      "|",
    ],
    buttonsXS: [
      "bold",
      "italic",
      "strikethrough",
      "|",
      "link",
      "|",
      "ul",
      "ol",
      "|",
      "indent",
      "|",
      "underline",
      "source",
      "|",
    ],
  };

  let navigate = useNavigate();
 
   useEffect(() => {
    if(!user){
      navigate('/');
    }
   }, []);
  

  //send msg
  const send = () => {
    if (content.length === 0) { 
    }
    else {
      // console.log(content)
      const message = content;
      socket.emit("message", { message, id });
      setContent("");
    }
  };


   //left
  const handleleave = () => {
    socket.emit("left", { user });
  }



  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });
    
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
    });
   
    
    
    return () => {
      socket.off();
    };
  }, []);
  
  
  useEffect(() => {

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });
    
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });

    return () => {

      socket.off();

    };
  }, [messages]);


  return (
    <div className="chat">
      <div className="chat-box">
        <div className="chat-header">
          <img
            className="img"
            src="https://shardings.com/resources/img/logo-3.svg"
            alt=""
          />
          <button onClick={handleleave} className="leave-btn">
            <a href={"/"} className="text-color">
              Leave
            </a>
            
          </button>
        </div>
      

        <div className="chat-msg">
          <ScrollToBottom className="chat-msg">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              Message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
          </ScrollToBottom>
        </div>

        <div className="chat-footer">
          <JoditEditor
            className="text-editor"
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <div className="editor-footer">
            <div className="icons">
              
            </div>
            <div className="send">
              <button onClick={send} className="send-btn">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
