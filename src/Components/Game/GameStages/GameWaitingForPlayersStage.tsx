import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../../../Store/GameStores/GameStore";
import authStore from "../../../Store/AuthStore";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import situationStore from "../../../Store/GameStores/SituationStore";

const GameWaitingForPlayersStage: React.FC = observer(() => {
    const [playerCount, setPlayerCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.dataBase && gameStore.currentUserLobby) {
            const q = query(
                collection(authStore.dataBase, "situations"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid),
            );

            return onSnapshot(q, (QuerySnapshot) => {
                if (gameStore.currentUserLobby && QuerySnapshot.size !== gameStore.currentUserLobby.players.length)
                    setPlayerCount(QuerySnapshot.size)
                else {
                    const prom = new Promise(() => {
                        navigate('/loader')
                        setTimeout(() => {
                            gameStore.setCurrentUserStage("SendAnswer")
                                .then(() => gameStore.getCurrentUserStage()
                                    .then(() => situationStore.getSituations()
                                        .then(() => navigate(`/gameLobby?lobbyID=${gameStore.currentUserLobby?.uid}`))
                                    )
                                )
                        }, 1000)
                    }).then()
                    Promise.resolve(prom).then()
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
