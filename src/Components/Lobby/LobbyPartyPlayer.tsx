import React from "react";
import {observer} from "mobx-react-lite";
import UserIcon from "../../Imgs/SVG/UserIcon";
import {IUserType} from "../../Types/UserType";
import AddPlayerLogo from "../../Imgs/SVG/AddPlayerLogo.tsx";
import {ILobbyType} from "../../Types/LobbyType.ts";
import lobbyStore from "../../Store/LobbyStore.ts";

type LobbyUserProps =
    {
        player: IUserType,
        lobbyInfo: ILobbyType
    }

const LobbyPartyPlayer: React.FC<LobbyUserProps> = observer(({player, lobbyInfo}: LobbyUserProps) => {
    return (
        <div className="party__player">
            <button className="leave_lobby__btn" onClick={() => lobbyStore.removePlayerFromParty(lobbyInfo, player)}>
                <AddPlayerLogo/>
            </button>
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
