import LobbyPartyPlayer from "./LobbyPartyPlayer.tsx";
import {observer} from "mobx-react-lite";
import React from "react";
import MyAddPlayer from "../../UI/MyAddPlayer";
import {ILobbyType} from "../../Types/LobbyType";

type LobbyProps = {
    lobbyInfo: ILobbyType,
}

const LobbyParty: React.FC<LobbyProps> = observer(({lobbyInfo}: LobbyProps) => {

    const placesToPlayerJoin = Array.from({length: lobbyInfo.playerCount - lobbyInfo.players.length},
        (_, index) => <MyAddPlayer handleOnClick={() => {
        }} key={index}/>
    );

    return (
        <div className="lobbies-main__party">
            {placesToPlayerJoin}
            {
                lobbyInfo.players.map((player, index) =>
                    <LobbyPartyPlayer nickname={player.nickname} photoURL={player.photoURL} key={index}/>
                )
            }
        </div>
    );
})

export default LobbyParty;
