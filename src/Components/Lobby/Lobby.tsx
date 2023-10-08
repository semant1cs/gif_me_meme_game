import React, {useEffect} from "react";
import game from "../../Store/GameStore";
import {observer} from 'mobx-react-lite';
import {IUserType} from "../../Types/UserType";
import "../../Styles/LobbyStyle/Lobby.scss";

const Lobby: React.FC = observer(() => {

    useEffect(() => {
        game.getUsers()
    }, [])

    return (
        <main className="lobby">
            <div className="lobby__container container">
                {
                    game.users
                        ? game.users.map((user: IUserType, ind: number) =>
                            <div key={ind}>
                                <img src={user.avatarImg} height="50px" alt={user.nickname}/>
                                {user.id}.{user.nickname}
                            </div>)
                        : "Пользователей нет"
                }
            </div>
        </main>
    );
})

export default Lobby;
