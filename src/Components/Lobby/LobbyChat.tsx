import React, {useEffect} from 'react';
import UserIcon from "../../Imgs/SVG/UserIcon";
import {observer} from "mobx-react-lite";
import {DocumentData, QueryDocumentSnapshot} from "firebase/firestore";
import chatStore from "../../Store/ChatStore";

const LobbyChat: React.FC = observer(() => {

    useEffect(() => {
        chatStore.getChatData()
            .then(() => document.getElementById("chat")?.scrollTo(0, 9999999))
    }, [])

    const checkDiffTime = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): boolean => {
        const diffTime = Math.ceil((new Date().getTime() - new Date(doc.data().createdAt.seconds * 1000).getTime()) / (1000 * 3600))
        return diffTime <= 2
    }

    return (
        <div className="chats__block" id="chat">
            {
                chatStore.chatData
                    ?
                    chatStore.chatData.map(doc => {
                            if (checkDiffTime(doc)) {
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
                chatStore.currentChatData
                    ?
                    chatStore.currentChatData.map(msg =>
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
