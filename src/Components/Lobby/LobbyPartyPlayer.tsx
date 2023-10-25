import React from "react";
import {observer} from "mobx-react-lite";
import UserIcon from "../../Imgs/SVG/UserIcon";
import {IUserType} from "../../Types/UserType";
import AddPlayerLogo from "../../Imgs/SVG/AddPlayerLogo.tsx";
import {ILobbyType} from "../../Types/LobbyType.ts";
import lobbyStore from "../../Store/LobbyStore.ts";
import {getAuth} from "firebase/auth";

type LobbyUserProps = {
    player: IUserType,
    lobbyInfo: ILobbyType
}

const LobbyPartyPlayer: React.FC<LobbyUserProps> = observer(({player, lobbyInfo}: LobbyUserProps) => {
    const auth = getAuth()
    const isUser = auth.currentUser?.uid === player.id

    const handleOnRemove = (lobbyInfo: ILobbyType, player: IUserType) => {
        if (isUser)
            if (lobbyStore.userIsLobbyLeader)
                lobbyStore.deleteLobbyWithPlayers(lobbyInfo).then()
            else
                lobbyStore.removePlayerFromParty(lobbyInfo, player).then()
    }

    return (
        <div className="party__player"
        onClick={() => handleOnRemove(lobbyInfo, player)}>
            {auth.currentUser?.uid === player.id ? <LeavePlayerButton lobbyInfo={lobbyInfo} player={player}/> : ""}
            {
                player.photoURL
                    ?
                    <img className={`player_avatar ${isUser ? "party__playerLeave" : ""}`}
                         src={player.photoURL} alt="playerAvatar"/>
                    :
                    <div className={`player_avatar ${isUser ? "party__playerLeave" : ""}`}>
                        <UserIcon/>
                    </div>
            }
            <p className="player__name">
                {player.nickname}
            </p>
        </div>
    );
})

const LeavePlayerButton = ({player, lobbyInfo}: LobbyUserProps) => {
    return (
        <div>
            <div className="leave_lobby__btn" onClick={() => lobbyStore.removePlayerFromParty(lobbyInfo, player)}>
                <AddPlayerLogo/>
            </div>
        </div>
    );
};

export default LobbyPartyPlayer;
