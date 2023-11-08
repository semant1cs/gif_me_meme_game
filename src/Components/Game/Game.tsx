import React, {useEffect, useState} from 'react';
import "../../Styles/GameStyle/Game.scss"
import GameHeader from "./GameUI/GameHeader";
import GamePlayers from "./GameUI/GamePlayers";
import lobbyStore from "../../Store/LobbyStore";
import {ILobbyType} from "../../Types/LobbyType";
import GameIdea from "./GameIdea.tsx";

const Game: React.FC = () => {
    const [currentUserLobby, setCurrentUserLobby] = useState<ILobbyType | null>(null);
    // const [searchParams] = useSearchParams()
    // const lobbyID: string | null = searchParams.get("lobbyID")

    useEffect(() => {
        lobbyStore.getCurrentUserLobby().then(r => setCurrentUserLobby(r))
    }, [])

    return (
        <div className="game">
            <GameHeader/>
            <GamePlayers currentUserLobby={currentUserLobby}/>
            <div className="game__centerBlock">
                <GameIdea/>
                {/*<WindowChooseGif/>*/}
                {/*<GameReactionsWindow/>*/}
            </div>
        </div>
    );
};


export default Game;
