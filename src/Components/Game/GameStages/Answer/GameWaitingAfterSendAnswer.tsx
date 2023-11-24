import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../../../../Store/GameStores/GameStore";
import authStore from "../../../../Store/AuthStore";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import situationStore from "../../../../Store/GameStores/SituationStore";
import answerStore from "../../../../Store/GameStores/AnswerStore";

const GameWaitingForPlayersStage: React.FC = observer(() => {
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        if (authStore.dataBase && gameStore.currentUserLobby && situationStore.currentRoundSituation) {
            const q = query(
                collection(authStore.dataBase, "answers"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid),
                where("situationId", "==", situationStore.currentRoundSituation.situationId),
            );

            return onSnapshot(q, (QuerySnapshot) => {
                if (gameStore.currentUserLobby && QuerySnapshot.size !== gameStore.currentUserLobby.players.length)
                    setPlayerCount(QuerySnapshot.size)
                else {
                    answerStore.getAllLobbySituationAnswers()
                        .then(() => gameStore.setCurrentUserStage("SendReaction"))
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
});

export default GameWaitingForPlayersStage;
