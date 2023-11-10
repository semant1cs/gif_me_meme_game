import React, {ReactNode, useEffect} from 'react';
// import {useSearchParams} from "react-router-dom";
import "../../Styles/GameStyle/Game.scss"
import GameHeader from "./GameUI/GameHeader";
// import GameIdea from "./GameIdea";
import GamePlayers from "./GameUI/GamePlayers";
import GameIdeaProposalStage from "./GameStages/GameIdeaProposalStage.tsx";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStores/GameStore.ts";
import GameSendAnswersStage from "./GameStages/GameSendAnswersStage.tsx";
import GameSendReactionStage from "./GameStages/GameSendReactionStage.tsx";
import GameWaitingForPlayersStage from "./GameStages/GameWaitingForPlayersStage";
import situationStore from "../../Store/GameStores/SituationStore";
import Lobby from "../Lobby/Lobby";
// import situationStore from "../../Store/GameStores/SituationStore";

const Game: React.FC = observer(() => {
    // const [searchParams] = useSearchParams()
    // const lobbyID: string | null = searchParams.get("lobbyID")

    useEffect(() => {
        gameStore.setCurrentUserLobby().then()
        gameStore.getCurrentUserStage().then()
        situationStore.setSituationText("")
        // situationStore.getSituations().then()
    }, [])

    function getCurrentStage(stage: string): ReactNode {
        switch (stage) {
            case "IdeaPropose":
                return <GameIdeaProposalStage/>
            case "SendAnswer":
                return <GameSendAnswersStage/>
            case "SendReaction":
                return <GameSendReactionStage/>
            case "WaitingForPlayers":
                return <GameWaitingForPlayersStage/>
            default:
                return <Lobby/>
        }
    }

    return (
        <div className="game">
            <GameHeader/>
            <GamePlayers currentUserLobby={gameStore.currentUserLobby}/>
            <div className="game__centerBlock">
                {
                    getCurrentStage(gameStore.currentUserStage)
                }
            </div>
        </div>
    );
});


export default Game;
