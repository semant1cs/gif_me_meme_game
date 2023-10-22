import React from "react";
import {observer} from "mobx-react-lite";
import UserIcon from "../../Imgs/SVG/UserIcon";
import {IUserType} from "../../Types/UserType";

type LobbyUserProps =
    {
        player: IUserType,
        handleOnClick: (player: IUserType) => void
    }

const LobbyPartyPlayer: React.FC<LobbyUserProps> = observer(({player, handleOnClick}: LobbyUserProps) => {
    return (
        <div onClick={() => handleOnClick(player)} className="party__player">
            {
                player.photoURL
                    ? <img className="player_avatar" src={player.photoURL} alt="playerAvatar"/>
                    : <UserIcon/>
            }
            <p className="player__name">
                {player.nickname}
            </p>
        </div>
    );
})

export default LobbyPartyPlayer;
