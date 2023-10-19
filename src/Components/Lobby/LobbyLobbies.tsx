import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton";
import lobbyStore from "../../Store/LobbyStore";
import ModalWindow from "../../UI/ModalWindow";
import MyInput from "../../UI/MyInput.tsx";
import LobbyParty from "./LobbyParty.tsx";
import axios from "axios";
import MySwiper from "../../UI/MySwiper";


const LobbyModalBody: React.FC = observer(() => {
    return (
        <div className="lobbies-modal__body">
            <h3 className="lobbies-modal__title">
                Создание лобби
            </h3>
            <MyInput style="lobbies-modal__input"
                     value={lobbyStore.paramsLobbyName}
                     handleOnChange={(e) => lobbyStore.setParamsLobbyName(e.target.value)}
                     type="text" placeholder="Введите название"/>
            <div className="lobbies-modal__players">
                <p>Игроки</p>
                <ul className="lobbies-modal__list">
                    <li onClick={() => lobbyStore.setParamsPlayerCount(2)}
                        className={lobbyStore.paramsPlayerCount === 2 ? "li-selected" : ""}>
                        <span>
                            2
                        </span>
                    </li>
                    <li onClick={() => lobbyStore.setParamsPlayerCount(3)}
                        className={lobbyStore.paramsPlayerCount === 3 ? "li-selected" : ""}>
                        <span>
                            3
                        </span>
                    </li>
                    <li onClick={() => lobbyStore.setParamsPlayerCount(4)}
                        className={lobbyStore.paramsPlayerCount === 4 ? "li-selected" : ""}>
                        <span>
                            4
                        </span>
                    </li>
                    <li onClick={() => lobbyStore.setParamsPlayerCount(5)}
                        className={lobbyStore.paramsPlayerCount === 5 ? "li-selected" : ""}>
                        <span>
                            5
                        </span>
                    </li>
                    <li onClick={() => lobbyStore.setParamsPlayerCount(6)}
                        className={lobbyStore.paramsPlayerCount === 6 ? "li-selected" : ""}>
                        <span>
                            6
                        </span>
                    </li>
                </ul>
            </div>
            <div className="lobbies-modal__private">
                <p>Приватное лобби</p>
                <MySwiper handleOnClick={() => lobbyStore.setParamsIsLobbyPrivate()}
                          value={lobbyStore.paramsIsLobbyPrivate}/>
            </div>
            <div className="lobbies-modal__autoplay">
                <p>Автостарт игры</p>
                <MySwiper handleOnClick={() => lobbyStore.setParamsIsAutoStart()}
                          value={lobbyStore.paramsIsAutoStart}/>
            </div>
            <MyButton btnText="Создать" btnStyle="lobbies-modal__create"
                      handleOnClick={() => lobbyStore.createNewLobby()}/>
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
