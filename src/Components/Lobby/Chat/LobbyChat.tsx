import React, {useEffect, useState} from 'react';
import UserIcon from "../../../Imgs/SVG/UserIcon";
import {observer} from "mobx-react-lite";
import chatStore from "../../../Store/ChatStore";
import {MessageType} from "../../../Types/MessageType";
import authStore from "../../../Store/AuthStore";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";

const LobbyChat: React.FC = observer(() => {
    const [messages, setMessages] = useState<MessageType[]>([])

    useEffect(() => {
        if (authStore.dataBase) {
            const q = query(collection(authStore.dataBase, "usersChat"), orderBy("createdAt"), limit(100))

            return onSnapshot(q, (QuerySnapshot) => {

                const fetchedMessages: MessageType[] = [];
                QuerySnapshot.forEach((doc) => {
                    fetchedMessages.push({
                        id: doc.data().uid,
                        displayName: doc.data().displayName,
                        photoURL: doc.data().photoURL,
                        text: doc.data().text,
                        createdAt: doc.data().createdAt
                    });
                });
                setMessages(fetchedMessages)
            })
        }
    }, [])

    useEffect(() => {
        document.getElementById("chat")?.scrollTo(0, 9999999)
    }, [messages])

    return (
        <div className="chats__block" id="chat">
            {
                messages
                    ?
                    messages.map(msg =>
                        msg
                            ?
                            <div className="chats__message" key={msg?.id}>
                                <p className="message__text">{msg?.text}</p>
                                <div className="message__info">
                                    <div className="info__text">
                                             <span className="message__name">
                                                {msg?.displayName}
                                             </span>
                                        <span className="message__time">
                                                {
                                                    chatStore.getFormattedTime(msg?.createdAt?.seconds)
                                                }
                                            </span>
                                    </div>
                                    {
                                        msg?.photoURL
                                            ? <img src={msg?.photoURL} alt="Аватар"/>
                                            : <UserIcon/>
                                    }
                                </div>
                            </div>
                            : ""
                    )
                    : ""
            }
        </div>
    );
});

export default LobbyChat;