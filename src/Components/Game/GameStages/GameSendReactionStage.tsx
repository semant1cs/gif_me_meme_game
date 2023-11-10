import React, {useEffect} from 'react';
import GameReactionsWindow from "../GameReactions/GameReactionsWindow.tsx";
import {observer} from "mobx-react-lite";
import answerStore from "../../../Store/GameStores/AnswerStore";

const GameSendReactionStage: React.FC = observer(() => {
    useEffect(() => {
        answerStore.getAnswer().then()
    })

    return (
        <section className="game-send-answers">
            <img className="game-send-answers-gif" src={answerStore.fetchedGif} alt="text"/>
            <GameReactionsWindow/>
        </section>
    );
});

export default GameSendReactionStage;
