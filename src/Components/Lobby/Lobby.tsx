import React, {useEffect} from "react";
import {observer} from 'mobx-react-lite';
import "../../Styles/LobbyStyle/Lobby.scss";
import UserIcon from "../../Imgs/SVG/UserIcon";
import authStore from "../../Store/AuthStore";
import gameStore from "../../Store/GameStore";
import LobbyChats from "./LobbyChats";
import LobbyLobbies from "./LobbyLobbies";

const Lobby: React.FC = observer(() => {

    useEffect(() => {
        authStore.getCurrentUser()
    }, [])

    return (
        <main className="lobby">
            <div className="lobby__container">
                <header className="lobby__header">
                    <ul className="header__list">
                        <li>
                            Друзья
                        </li>
                    </ul>
                    <div className="header__user">
                        <span>
                            {authStore.userInfo?.nickname || gameStore.userAuthNickName || "userNickName"}
                        </span>
                        <UserIcon/>
                    </div>
                </header>
                <div className="lobby__main">
                    <LobbyChats/>
                    <LobbyLobbies/>
                </div>
            </div>
        </main>
    );
})

export default Lobby;
