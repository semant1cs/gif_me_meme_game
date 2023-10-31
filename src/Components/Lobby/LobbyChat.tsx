import React, {useEffect, useState} from 'react';
import UserIcon from "../../Imgs/SVG/UserIcon";
import {observer} from "mobx-react-lite";
import {collection, DocumentData, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot} from "firebase/firestore";
import authStore from "../../Store/AuthStore.ts";
import {MessageType} from "../../Types/MessageType.ts";

const LobbyChat: React.FC = observer(() => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const q = query(collection(authStore.dataBase, "usersChat"), orderBy("createdAt"), limit(10))

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages: MessageType[] = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({
                    id: doc.id,
                    displayName: doc.data().displayName,
                    photoURL: doc.data().photoURL,
                    text: doc.data().text,
                    createdAt: doc.data().createdAt
                });
            });
            setMessages(fetchedMessages)
        })

        return () => unsubscribe
    }, [])


    const checkDiffTime = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): boolean => {
        const diffTime = Math.ceil((new Date().getTime() - new Date(doc.data().createdAt.seconds * 1000).getTime()) / (1000 * 3600))
        return diffTime <= 2
    }

    const getFormattedTime = (time: number) => {
        const hours = new Date(time * 1000).getHours().toString().padStart(2, "0")
        const minutes = new Date(time * 1000).getMinutes().toString().padStart(2, "0")
        return hours + ":" + minutes
    }

    return (
        <div className="chats__block" id="chat">
            {
                messages
                    ?
                    messages.map(doc => {
                            return (
                                <div className="chats__message" key={doc.id}>
                                    <p className="message__text">{doc.text}</p>
                                    <div className="message__info">
                                        <div className="info__text">
                                             <span className="message__name">
                                                {doc.displayName}
                                             </span>
                                            <span className="message__time">
                                                {
                                                    getFormattedTime(doc.createdAt)
                                                }
                                            </span>
                                        </div>
                                        {
                                            doc.photoURL
                                                ? <img src={doc.photoURL} alt="Аватар"/>
                                                : <UserIcon/>
                                        }
                                    </div>
                                </div>
                            )

                        }
                    )
                    : ""
            }
        </div>
    );
});

export default LobbyChat;
