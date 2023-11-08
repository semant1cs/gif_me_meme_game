import React, {useEffect, useState} from 'react';
import "../../Styles/GameStyle/Game.scss"
import GameHeader from "./GameUI/GameHeader";
import GamePlayers from "./GameUI/GamePlayers";
import lobbyStore from "../../Store/LobbyStore";
import {ILobbyType} from "../../Types/LobbyType";
import GameIdeaProposalStage from "./GameIdeaProposalStage.tsx";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStore.ts";
import GameReactionsWindow from "./GameReactions/GameReactionsWindow.tsx";
import GameSendAnswers from "./GameSendAnswers.tsx";

const Game: React.FC = observer(() => {
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
                {
                    gameStore.currentStage === 0 &&
                    <GameIdeaProposalStage/>
                }
                {
                    gameStore.currentStage === 1 &&
                    <GameSendAnswers/>
                }
                {
                    gameStore.currentStage === 2 &&
                    <GameReactionsWindow/>
                }
            </div>
        </div>
    );
});


export default Game;
