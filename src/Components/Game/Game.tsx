import React, {useEffect} from 'react';
import "../../Styles/GameStyle/Game.scss"
import GameHeader from "./GameUI/GameHeader";
import GamePlayers from "./GameUI/GamePlayers";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStores/GameStore.ts";
import situationStore from "../../Store/GameStores/SituationStore";
import GameWaitingForPlayersStage from "./GameStages/Situation/GameWaitingForPlayersStage";
import GameSendAnswersStage from "./GameStages/Answer/GameSendAnswersStage";
import GameSendReactionStage from "./GameStages/Reaction/GameSendReactionStage";
import GameWaitingAfterSendAnswer from "./GameStages/Answer/GameWaitingAfterSendAnswer";
import GameEnd from "./GameStages/GameEnd";
import Lobby from "../Lobby/Lobby";
import GameIdeaProposalStage from "./GameStages/Situation/GameIdeaProposalStage";
import answerStore from "../../Store/GameStores/AnswerStore";
import GameWaitingAfterSendReaction from "./GameStages/Reaction/GameWaitingAfterSendReaction";

const Game: React.FC = observer(() => {

    useEffect(() => {
        gameStore.getCurrentUserStage().then(() =>
            gameStore.setCurrentUserLobby()
                .then(() => situationStore.getSituations()
                    .then(() => answerStore.getAllLobbySituationAnswers())))
        gameStore.setNullLocalVariables()
    }, [])

    function getCurrentStage(stage: string): JSX.Element {

        switch (stage) {
            case "IdeaPropose":
                return (<GameIdeaProposalStage/>)
            case "SendAnswer":
                return (<GameSendAnswersStage/>)
            case "SendReaction":
                return (<GameSendReactionStage/>)
            case "WaitingAfterReaction":
                return (<GameWaitingAfterSendReaction/>)
            case "WaitingAfterAnswer":
                return (<GameWaitingAfterSendAnswer/>)
            case "WaitingForPlayers":
                return (<GameWaitingForPlayersStage/>)
            case "GameEnd":
                return (<GameEnd/>)
            default:
                return (<Lobby/>)
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
