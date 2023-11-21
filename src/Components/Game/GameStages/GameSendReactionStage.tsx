import React, {useEffect} from 'react';
import GameReactionsWindow from "../GameReactions/GameReactionsWindow.tsx";
import {observer} from "mobx-react-lite";


const GameSendReactionStage: React.FC = observer(() => {
    useEffect(() => {
    })

    return (
        <section className="game-send-answers">
            <GameReactionsWindow/>
        </section>
    );
});

export default GameSendReactionStage;
