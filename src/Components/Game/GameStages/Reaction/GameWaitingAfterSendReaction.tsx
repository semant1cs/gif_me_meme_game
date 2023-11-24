import React, {useEffect, useState} from 'react';
import authStore from "../../../../Store/AuthStore";
import gameStore from "../../../../Store/GameStores/GameStore";
import situationStore from "../../../../Store/GameStores/SituationStore";
import {collection, onSnapshot, query, where} from "firebase/firestore";

const GameWaitingAfterSendReaction: React.FC = () => {
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        if (authStore.dataBase &&
            gameStore.currentUserLobby &&
            situationStore.currentRoundSituation) {
            const q = query(
                collection(authStore.dataBase, "reactions"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid),
                where("situationId", "==", situationStore.currentRoundSituation.situationId),
            );

            return onSnapshot(q, (QuerySnapshot) => {
                const lobbyPlayersCount: number | undefined = gameStore.currentUserLobby?.players.length

                if (lobbyPlayersCount && (QuerySnapshot.size / lobbyPlayersCount) !== lobbyPlayersCount) {
                    setPlayerCount(QuerySnapshot.size / lobbyPlayersCount)
                } else {
                    if (gameStore.currentUserLobby && lobbyPlayersCount &&
                        gameStore.currentUserLobby.currentGameRound < lobbyPlayersCount) {
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
