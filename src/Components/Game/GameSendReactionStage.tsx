import React, {useEffect} from 'react';
import GameReactionsWindow from "./GameReactions/GameReactionsWindow.tsx";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStore.ts";

const GameSendReactionStage: React.FC = observer(() => {
    useEffect(() => {
        gameStore.getAnswer().then()
    })

    return (
        <section className="game-send-answers">
            <img className="game-send-answers-gif" src={gameStore.fetchedGif} alt="text"/>
            <GameReactionsWindow/>
        </section>
    );
});

export default GameSendReactionStage;
