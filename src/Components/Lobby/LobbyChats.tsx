import React from 'react';
import {observer} from "mobx-react-lite";

const LobbyChats: React.FC = observer(() => {

    return (
        <section className="lobby__chats">
            <div className="chats__head">
                <h2>
                    Чаты
                </h2>
                <ul className="chats__list">
                    <li className="chats__chat active">общий</li>
                    <li className="chats__chat">лобби</li>
                </ul>
            </div>
            <div className="chats__main">

            </div>
        </section>
    );
})

export default LobbyChats;
