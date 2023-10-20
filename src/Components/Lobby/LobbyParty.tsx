import LobbyPartyPlayer from "./LobbyPartyPlayer.tsx";
import LobbyAddPlayer from "./LobbyAddPlayer.tsx";
import {IPartyType} from "../../Types/PartyType.ts";


const LobbyParty = ({players}: IPartyType) => {
    return (
        <div>
            <div className="line"></div>
            <div className="party_game party_game-1">
                {players.map((player, index) =>
                    <LobbyPartyPlayer nickname={player.nickname} photoURL={player.photoURL} key={index}
                    />)}
                <LobbyAddPlayer/>
            </div>
        </div>
    );
};

export default LobbyParty;
