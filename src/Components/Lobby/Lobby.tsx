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

const Lobby: React.FC = observer(() => {
    const auth = getAuth()
    const navigate = useNavigate()

    return (
        <main className="lobby">
            <div className="lobby__container">
                <header className="lobby__header">
                    <ul className="header__list">
                        <li>
                            Друзья
                        </li>
                    </ul>
                    <MyButton btnText="Выйти" btnStyle="ad" handleOnClick={() =>
                        authStore.logOutUser().then(() => navigate("/"))}/>
                    <div className="header__user">
                        <span>
                            {auth.currentUser?.displayName || authStore.userAuthNickName || "userNickName"}
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
