import React, {lazy, Suspense, useEffect} from 'react';
import "../../Styles/GameStyle/Game.scss"
import GameHeader from "./GameUI/GameHeader";
import GamePlayers from "./GameUI/GamePlayers";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStores/GameStore.ts";
import situationStore from "../../Store/GameStores/SituationStore";
import Loader from "../Loader/Loader";

const Game: React.FC = observer(() => {

    useEffect(() => {
        gameStore.setCurrentUserLobby()
            .then(() => gameStore.getCurrentUserStage()
                .then(() => {
                    if (["SendAnswer", "SendReaction", "WaitingAfterAnswer", "GameEnd"]
                        .includes(gameStore.currentUserStage))
                        situationStore.getSituations()
                            .then(() => situationStore.setCurrentRoundSituation())
                }))
        gameStore.setNullLocalVariables()
    }, [])

    function getCurrentStage(stage: string): JSX.Element {

        const IdeaPropose = lazy(() => import("./GameStages/GameIdeaProposalStage"))
        const GameWaitingForPlayersStage = lazy(() => import("./GameStages/GameWaitingForPlayersStage"))
        const GameSendAnswersStage = lazy(() => import("./GameStages/GameSendAnswersStage"))
        const GameWaitingAfterSendAnswer = lazy(() => import("./GameStages/GameWaitingAfterSendAnswer"))
        const GameSendReactionStage = lazy(() => import("./GameStages/GameSendReactionStage"))
        const GameEnd = lazy(() => import("./GameStages/GameEnd"))
        const Lobby = lazy(() => import("../Lobby/Lobby"))

        switch (stage) {
            case "IdeaPropose":
                return (
                    <Suspense fallback={<Loader/>}>
                        <IdeaPropose/>
                    </Suspense>
                )
            case "WaitingForPlayers":
                return (
                    <Suspense fallback={<Loader/>}>
                        <GameWaitingForPlayersStage/>
                    </Suspense>
                )
            case "SendAnswer":
                return (
                    <Suspense fallback={<Loader/>}>
                        <GameSendAnswersStage/>
                    </Suspense>
                )
            case "SendReaction":
                return (
                    <Suspense fallback={<Loader/>}>
                        <GameSendReactionStage/>
                    </Suspense>
                )
            case "WaitingAfterAnswer":
                return (
                    <Suspense fallback={<Loader/>}>
                        <GameWaitingAfterSendAnswer/>
                    </Suspense>
                )
            case "GameEnd":
                return (
                    <Suspense fallback={<Loader/>}>
                        <GameEnd/>
                    </Suspense>
                )
            default:
                return (
                    <Suspense fallback={<Loader/>}>
                        <Lobby/>
                    </Suspense>
                )
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
