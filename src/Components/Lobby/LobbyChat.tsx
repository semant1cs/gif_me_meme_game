import React, {useEffect} from 'react';
import userStore from "../../Store/UserStore";
import UserIcon from "../../Imgs/SVG/UserIcon";
import {observer} from "mobx-react-lite";

const LobbyChat: React.FC = observer(() => {

    useEffect(() => {
        userStore.getChatData()
            .then(() => document.getElementById("chat")?.scrollTo(0, 9999999))
    }, [])


    return (
        <div className="chats__block" id="chat">
            {
                userStore.chatData
                    ?
                    userStore.chatData.map(doc => {
                            if (new Date().getHours() - new Date(doc.data().createdAt.seconds * 1000).getHours() < 2) {
                                return (
                                    <div className="chats__message" key={doc.id}>
                                        <p className="message__text">{doc.data().text}</p>
                                        <div className="message__info">
                                            <div className="info__text">
                                             <span className="message__name">
                                                {doc.data().displayName}
                                             </span>
                                                <span className="message__time">
                                            {
                                                new Date(doc.data().createdAt.seconds * 1000)
                                                    .getHours().toString().padStart(2, "0")
                                                + ":" +
                                                new Date(doc.data().createdAt.seconds * 1000)
                                                    .getMinutes().toString().padStart(2, "0")
                                            }
                                            </span>
                                            </div>
                                            {
                                                doc.data().photoURL
                                                    ? <img src={doc.data().photoURL} alt="Аватар"/>
                                                    : <UserIcon/>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )
                    : ""
            }
            {
                userStore.currentChatData
                    ?
                    userStore.currentChatData.map(msg =>
                        <div key={msg.id} className="chats__message">
                            <p className="message__text">{msg.text}</p>
                            <div className="message__info">
                                <div className="info__text">
                                    <span className="message__name">
                                        {msg.displayName}
                                    </span>
                                    <span className="message__time">
                                            {
                                                msg.createdAt.getHours().toString().padStart(2, "0")
                                                + ":" +
                                                msg.createdAt.getMinutes().toString().padStart(2, "0")
                                            }
                                    </span>
                                </div>
                                {
                                    msg.photoURL
                                        ? <img src={msg.photoURL} alt="Аватар"/>
                                        : <UserIcon/>
                                }
                            </div>
                        </div>
                    )
                    : ""
            }
        </div>
    );
});

export default LobbyChat;
