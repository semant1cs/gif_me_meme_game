import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton";
import lobbyStore from "../../Store/LobbyStore";
import ModalWindow from "../../UI/ModalWindow";
import MyInput from "../../UI/MyInput.tsx";
import LobbyParty from "./LobbyParty.tsx";
import axios from "axios";


const LobbyModalBody: React.FC = observer(() => {
    return (
        <div>
            <h1 className="title-modal">СОЗДАНИЕ ЛОББИ</h1>
            <ul className="params-list">
                <li className="lobby_name">Название лобби
                    <MyInput
                        style="lobby-name__input"
                        placeholder="Название лобби"
                        type="text"
                        value={lobbyStore.paramsLobbyName}
                        handleOnChange={e => lobbyStore.setParamsLobbyName(e.target.value)}
                    />
                </li>
                <li className="max-lobby-players__field">Количество игроков
                    <ul className="max-lobby-players">
                        <li className="param-count-player">2</li>
                        <li className="param-count-player">3</li>
                        <li className="param-count-player">4</li>
                        <li className="param-count-player">5</li>
                    </ul>
                </li>
                <li className="is-visible-lobby">Видимость
                    <MyButton
                        btnText="Общедоступное"
                        btnStyle=""
                        handleOnClick={lobbyStore.setParamsIsLobbyPrivate}
                    ></MyButton>
                    /
                    <MyButton
                        btnText="Приватное"
                        btnStyle=""
                        handleOnClick={lobbyStore.setParamsIsLobbyPrivate}
                    ></MyButton>
                </li>
                <li className="is-autostart-game">Автостарт <MyButton
                    btnText="Вкл"
                    btnStyle=""
                    handleOnClick={lobbyStore.setParamsIsAutoStart}
                ></MyButton>
                    /
                    <MyButton
                        btnText="Выкл"
                        btnStyle="modal-window__btn checked"
                        handleOnClick={lobbyStore.setParamsIsLobbyPrivate}
                    ></MyButton>
                </li>
            </ul>
        </div>
    )
});

const LobbyLobbies: React.FC = observer(() => {
    const [parties, setParties] = useState();

    useEffect(() => {
        const URL = "http://localhost:3000/parties"
        axios.get(URL).then(response => {
            const parties = response.data
            setParties(parties)
        });

    }, [setParties])

    return (
        <section className="lobby__lobbies">
            {
                lobbyStore.showCreateModal
                    ? <ModalWindow onClose={() => lobbyStore.changeShowCreateModal()}
                                   onSubmit={() => lobbyStore.createNewLobby()}
                                   body={<LobbyModalBody/>}
                                   windowContentStyles="lobbies__modal"/> : ""
            }
            <div className="lobbies__header">
                <h2>
                    Ожидают игры
                </h2>
                <MyButton btnText="Создать игру"
                          btnStyle="lobbies__button"
                          handleOnClick={() => lobbyStore.changeShowCreateModal()}/>
            </div>
            <div className="lobbies__main">
                {parties !== undefined ? <LobbyParty users={parties}/> : ""}
                <div className="line"></div>
            </div>
        </section>
    );
});

export default LobbyLobbies;
