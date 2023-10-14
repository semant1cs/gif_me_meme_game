import React from 'react';
import {observer} from "mobx-react-lite";
import MyInput from "../../UI/MyInput";
import MyButton from "../../UI/MyButton";
import userStore from "../../Store/UserStore";
import LobbyChat from "./LobbyChat";

const LobbyChats: React.FC = observer(() => {
    const sendMessage = () => {
        userStore.sendChatMessage().then()
    }

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
                <LobbyChat/>
                <form className="chats__form" onSubmit={(e) => e.preventDefault()}>
                    <MyInput handleOnChange={(e) => userStore.changeUserChatText(e.target.value)}
                             value={userStore.userChatText}
                             type="text"
                             placeholder="Введите сообщение"
                             style="chats__input"/>
                    <MyButton handleOnClick={() => sendMessage()}
                              btnStyle="chats__button"
                              btnText=""/>
                </form>
            </div>
        </section>
    );
})

export default LobbyChats;
