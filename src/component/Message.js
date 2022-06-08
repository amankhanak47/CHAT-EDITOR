import React from 'react'
import ReactHtmlParser from 'html-react-parser';
import "./message.css"

const Message = ({ user, Message, classs }) => {
    if (user) {
        return (
            <div className={`msg-box ${classs}`}>
                <div className="username">
                    {user}:
                </div>
                <div className="user-msg">
                 {ReactHtmlParser(Message)}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={`msg-box ${classs}`}>
               <div className="username">
                    You :
                </div>
                <div className="user-msg">
                 {ReactHtmlParser(Message)}
                </div>
            </div>
        )
    }
}

export default Message