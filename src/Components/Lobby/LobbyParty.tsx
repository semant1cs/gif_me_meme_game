import LobbyPartyPlayer from "./LobbyPartyPlayer.tsx";
import {observer} from "mobx-react-lite";
import React from "react";
import MyAddPlayer from "../../UI/MyAddPlayer";
import {ILobbyType} from "../../Types/LobbyType";
import lobbyStore from "../../Store/LobbyStore";
import {useNavigate} from "react-router-dom";

type LobbyProps = {
    lobbyInfo: ILobbyType,
}

const LobbyParty: React.FC<LobbyProps> = observer(({lobbyInfo}: LobbyProps) => {

    const placesToPlayerJoin = Array.from({length: lobbyInfo.playerCount - lobbyInfo.players.length},
        (_, index) => <MyAddPlayer handleOnClick={() => lobbyStore.addPlayer(lobbyInfo)} key={index}/>
    );
    const navigate = useNavigate()

    return (
        <div className="lobbies-main__party">
            {
                lobbyInfo.players.map((player, index) =>
                    <LobbyPartyPlayer
                        lobbyInfo={lobbyInfo}
                        player={player}
                        key={index}/>
                )
            }
            {placesToPlayerJoin}
            <button onClick={() => navigate("/play")}>Начать</button>
        </div>
    );
})

export default LobbyParty;
