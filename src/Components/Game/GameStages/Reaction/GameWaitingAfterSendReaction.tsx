import React, {useEffect, useState} from 'react';
import authStore from "../../../../Store/AuthStore";
import gameStore from "../../../../Store/GameStores/GameStore";
import situationStore from "../../../../Store/GameStores/SituationStore";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import answerStore from "../../../../Store/GameStores/AnswerStore";

const GameWaitingAfterSendReaction: React.FC = () => {
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        if (authStore.dataBase &&
            gameStore.currentUserLobby &&
            situationStore.currentRoundSituation &&
            answerStore.currentAnswer) {
            const q = query(
                collection(authStore.dataBase, "reactions"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid),
                where("situationId", "==", situationStore.currentRoundSituation.situationId),
                where("answerId", "==", answerStore.currentAnswer.answerId)
            );

            return onSnapshot(q, (QuerySnapshot) => {
                if (gameStore.currentUserLobby && QuerySnapshot.size !== gameStore.currentUserLobby.players.length)
                    setPlayerCount(QuerySnapshot.size)
                else {
                    if (gameStore.currentUserLobby &&
                        gameStore.currentUserLobby.currentGameRound < gameStore.currentUserLobby.players.length) {
                        gameStore.setCurrentGameRound(gameStore.currentUserLobby.currentGameRound + 1)
                            .then(() => situationStore.setCurrentRoundSituation()
                                .then(() => gameStore.setCurrentUserStage("SendAnswer")))
                    } else
                        gameStore.setCurrentUserStage("GameEnd").then()
                }
            })
        }
    }, []);


    return (
        <section className="game__waiting">
            <p className="waiting__ready-players">
                {
                    `${playerCount}/${gameStore.currentUserLobby?.players.length} игроков готовы`
                }
            </p>
        </section>
    );
};

export default GameWaitingAfterSendReaction;
