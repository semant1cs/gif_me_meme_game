import React, {useEffect} from "react";
import lobbyStore from "../../Store/LobbyStore";
import {observer} from 'mobx-react-lite';
import {IUserType} from "../../Types/UserType";

const Lobby: React.FC = observer(() => {

    useEffect(() => {
        lobbyStore.getUsers()
    }, [])

    return (
        <div>
            {
                lobbyStore.users
                    ? lobbyStore.users.map((user: IUserType, ind: number) =>
                        <div key={ind}>
                            <img src={user.avatarImg} height="50px" alt={user.nickname}/>
                            {user.id}.{user.nickname}
                        </div>)
                    : "Пользователей нет"
            }
        </div>
    );
})

export default Lobby;
