import React, {useEffect} from "react";
// import game from "../../Store/GameStore";
import {observer} from 'mobx-react-lite';
// import {IUserType} from "../../Types/UserType";
import "../../Styles/LobbyStyle/Lobby.scss";
import MyButton from "../../UI/MyButton";
import UserIcon from "../../Imgs/SVG/UserIcon";
import authStore from "../../Store/AuthStore";
import gameStore from "../../Store/GameStore";

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
                            {authStore.userInfo?.displayName || gameStore.userAuthNickName || "userNickName"}
                        </span>
                        <UserIcon/>
                    </div>
                </header>
                <div className="lobby__main">
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

                        </div>
                    </section>
                    <section className="lobby__lobbies">
                        <div className="lobbies__header">
                            <h2>
                                Ожидают игры
                            </h2>
                            <MyButton btnText="Создать игру"
                                      btnStyle="lobbies__button"
                                      handleOnClick={() => {}}/>
                        </div>
                        <div className="lobbies__main">

                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
})

export default Lobby;
