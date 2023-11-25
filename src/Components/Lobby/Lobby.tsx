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
import ModalWindow from "../../UI/ModalWindow.tsx";

const Lobby: React.FC = observer(() => {
    const auth = getAuth()

    useEffect(() => {
        lobbyStore.changeSignOutModal(false)
        lobbyStore.getUserImage()
    }, []);


    return (
        <main className="lobby" onClick={() => lobbyStore.changeSignOutModal(false)}>
            <div className="lobby__container">
                <header className="lobby__header">
                    <ul className="header__list">
                        <li>
                            Друзья
                        </li>
                    </ul>
                    <div className="header__user" onClick={(e) => e.stopPropagation()}>
                        <span>
                            {authStore.userAuthNickName || auth.currentUser?.displayName || "userNickName"}
                        </span>
                        <div onClick={() => lobbyStore.changeSignOutModal()}>
                            {
                                lobbyStore.userImageLocal
                                    ?
                                    <img src={lobbyStore.userImageLocal}
                                         alt="userImage"
                                         className="header__image"/>
                                    :
                                    <UserIcon/>
                            }
                        </div>
                    </div>
                    {
                        lobbyStore.signOutModal
                            ? <ModalWindow body={<LobbySignOutModal/>} windowContentStyles="profile-modal-window"
                                           onClose={() => {
                                               lobbyStore.changeSignOutModal()
                                               authStore.changeNickname(authStore.userAuthNickName)
                                           }}/>
                            : ""
                    }
                </header>
                <div className="lobby__main">
                    <LobbyChats/>
                    <LobbyLobbies/>
                </div>
            </div>
        </main>
    )
        ;
})


export default Lobby;
