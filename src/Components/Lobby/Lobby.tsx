import React, {useEffect} from "react";
import {observer} from 'mobx-react-lite';
import "../../Styles/LobbyStyle/Lobby.scss";
import UserIcon from "../../Imgs/SVG/UserIcon";
import authStore from "../../Store/AuthStore";
import LobbyChats from "./Chat/LobbyChats";
import LobbyLobbies from "./Lobbies/LobbyLobbies";
import {getAuth} from "firebase/auth";
import lobbyStore from "../../Store/LobbyStores/LobbyStore";
import LobbySignOutModal from "./Lobbies/LobbySignOutModal.tsx";

const Lobby: React.FC = observer(() => {
    const auth = getAuth()

    useEffect(() => {
        lobbyStore.changeSignOutModal(false)
    }, []);


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
                            {auth.currentUser?.displayName || authStore.userAuthNickName || "userNickName"}
                        </span>
                        <div onClick={() => lobbyStore.changeSignOutModal()}>
                            <UserIcon/>
                        </div>
                    </div>
                    {
                        lobbyStore.signOutModal
                            ? <LobbySignOutModal/>
                            : ""
                    }
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
