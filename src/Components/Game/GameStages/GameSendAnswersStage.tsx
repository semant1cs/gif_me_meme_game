import React, {useEffect} from 'react';
import WindowChooseGif from "../GameGif/WindowChooseGif.tsx";
import {observer} from "mobx-react-lite";
import MyButton from "../../../UI/MyButton.tsx";
import MyTimer from "../../../UI/MyTimer.tsx";
import situationStore from "../../../Store/GameStores/SituationStore";
import answerStore from "../../../Store/GameStores/AnswerStore";

const GameSendAnswersStage: React.FC = observer(() => {
    useEffect(() => {
        situationStore.getSituation().then()
    })

    return (
        <section className="game-send-answers">
            <div className="situation-text">{answerStore.fetchedText}</div>
            <WindowChooseGif/>
            <MyButton btnText=""
                      btnStyle="gif-send__btn"
                      handleOnClick={() => answerStore.sendAnswer().then()}/>
            <div className="game-send-answers__timer"><MyTimer seconds={60}/></div>
        </section>
    );
});

export default GameSendAnswersStage;
