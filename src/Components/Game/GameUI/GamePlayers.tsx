import React from 'react';
import {ILobbyType} from "../../../Types/LobbyType";
import UserIcon from "../../../Imgs/SVG/UserIcon";
import gameStore from "../../../Store/GameStore";
import MyButton from "../../../UI/MyButton";
import {useNavigate} from "react-router-dom";

type GamePlayersProps = {
    currentUserLobby: ILobbyType | null
}

const GamePlayers: React.FC<GamePlayersProps> = ({currentUserLobby}: GamePlayersProps) => {
    const navigate = useNavigate()

    return (
        <div className="game__players">
            <ul className="players__list">
                {
                    currentUserLobby?.players.map(player =>
                        <li className="players__player">
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
                            <p className="player__name">
                                {player.nickname}
                            </p>
                        </li>
                    )
                }
                <MyButton btnStyle="game-header__leave"
                          handleOnClick={() => gameStore.leaveGame().then(() => navigate("/lobby"))}
                          btnText="Выйти"/>
            </ul>
        </div>
    );
};

export default GamePlayers;