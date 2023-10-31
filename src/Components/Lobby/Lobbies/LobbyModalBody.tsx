import React from "react";
import {observer} from "mobx-react-lite";
import lobbyStore from "../../../Store/LobbyStore";
import MyInput from "../../../UI/MyInput";
import MySwiper from "../../../UI/MySwiper";
import MyButton from "../../../UI/MyButton";

const LobbyModalBody: React.FC = observer(() => {
    const playersPartyValues = [2, 3, 4, 5, 6]

    const setPlayersCount = (playersCount: number, ind: number) => {
        return (
            <li onClick={() => lobbyStore.setParamsPlayerCount(playersCount)}
                key={ind}
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
                    {playersPartyValues.map((value, ind) => setPlayersCount(value, ind))}
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

export default LobbyModalBody;