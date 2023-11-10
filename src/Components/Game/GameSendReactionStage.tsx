import React, {useEffect} from 'react';
import GameReactionsWindow from "./GameReactions/GameReactionsWindow.tsx";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStore.ts";

const GameSendReactionStage: React.FC = observer(() => {
    useEffect(() => {
        gameStore.getAnswer().then()
    })

    return (
        <div>
            <img style={{textAlign: "center"}} src={gameStore.fetchedGif} alt="text"/>
            <GameReactionsWindow/>
        </div>
    );
});

export default GameSendReactionStage;
