import React, {useEffect, useState} from 'react';
import {ILobbyType} from "../../../Types/LobbyType";
import UserIcon from "../../../Imgs/SVG/UserIcon";
import gameStore from "../../../Store/GameStores/GameStore";
import MyButton from "../../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import authStore from "../../../Store/AuthStore";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {IUserType} from "../../../Types/UserType";
import "../../../Styles/GameStyle/GameUI.scss";
import {getAuth} from "firebase/auth";

type GamePlayersProps = {
    currentUserLobby: ILobbyType | null
}

const GamePlayers: React.FC<GamePlayersProps> = ({currentUserLobby}: GamePlayersProps) => {
    const navigate = useNavigate()
    const [players, setPlayers] = useState<IUserType[] | null>();
    const auth = getAuth()

    useEffect(() => {
        if (authStore.dataBase && currentUserLobby) {
            const q = query(
                collection(authStore.dataBase, "lobbies"),
                where("uid", "==", currentUserLobby.uid),
            );

            return onSnapshot(q, (QuerySnapshot) => {
                const lobby = QuerySnapshot.docs[0]?.data()
                if (lobby)
                    setPlayers(lobby?.players)
                else
                    setPlayers(null)
            })
        }
    }, [currentUserLobby]);


    return (
        <div className="game__players">
            <ul className="players__list">
                {
                    players
                        ?
                        players.map(player =>
                            <li key={player.id} className="players__player">
                                {
                                    player.photoURL
                                        ?
                                        <img className='player__avatar'
                                             src={player.photoURL} alt="playerAvatar"/>
                                        :
                                        <div className='player__avatar'>
                                            <UserIcon/>
                                        </div>
                                }
                                {
                                    auth.currentUser?.uid === player.id
                                        ?
                                        <p className="player__name">{player.nickname}(Вы)</p>
                                        :
                                        <p className="player__name">{player.nickname}</p>
                                }
                            </li>
                        )
                        :
                        <li className="players__all-leave">
                            Все игроки покинули игру Обновите страницу
                        </li>
                }
                <MyButton btnStyle="game-header__leave"
                          handleOnClick={() => gameStore.leaveGame().then(() => navigate("/lobby"))}
                          btnText="Выйти"/>
            </ul>
        </div>
    );
};

export default GamePlayers;
