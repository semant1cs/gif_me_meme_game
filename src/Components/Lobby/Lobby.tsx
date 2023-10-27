import React from "react";
import {observer} from 'mobx-react-lite';
import "../../Styles/LobbyStyle/Lobby.scss";
import UserIcon from "../../Imgs/SVG/UserIcon";
import authStore from "../../Store/AuthStore";
import LobbyChats from "./LobbyChats";
import LobbyLobbies from "./LobbyLobbies";
import {getAuth} from "firebase/auth";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import lobbyStore from "../../Store/LobbyStore";

const Lobby: React.FC = observer(() => {
    const auth = getAuth()

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

const LobbySignOutModal = observer(() => {
    const navigate = useNavigate()

    return (
        <div className="lobby-header__modal">
            <MyButton btnText="Выйти" btnStyle="lobby-headerModal__button" handleOnClick={() =>
                authStore.logOutUser().then(() => navigate("/"))}/>
        </div>
    )
})

export default Lobby;
