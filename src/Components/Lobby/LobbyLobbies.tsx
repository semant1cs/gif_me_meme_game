import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton";
import lobbyStore from "../../Store/LobbyStore";
import ModalWindow from "../../UI/ModalWindow";
import MyInput from "../../UI/MyInput.tsx";
import LobbyParty from "./LobbyParty.tsx";
import MySwiper from "../../UI/MySwiper";


const LobbyModalBody: React.FC = observer(() => {
    const playersPartyValues = [2, 3, 4, 5, 6]

    const setPlayersCount = (playersCount: number) => {
        return (
            <li onClick={() => lobbyStore.setParamsPlayerCount(playersCount)}
                className={lobbyStore.paramsPlayerCount === playersCount ? "li-selected" : ""}>
                        <span>
                            {playersCount}
                        </span>
            </li>
        )
    }

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
                    {playersPartyValues.map(value => setPlayersCount(value))}
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
    useEffect(() => {
        lobbyStore.getLobbiesData().then()
    }, [])
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

                {lobbyStore.currentAvailableParties !== undefined
                    ? lobbyStore.currentAvailableParties.map((party) => <LobbyParty players={party.data().players}/>)
                    : ""}
                <div className="line"></div>
            </div>
        </section>
    );
});

export default LobbyLobbies;
