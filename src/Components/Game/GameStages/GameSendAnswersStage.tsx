import React, {useEffect} from 'react';
import WindowChooseGif from "../GameGif/WindowChooseGif.tsx";
import {observer} from "mobx-react-lite";
import MyButton from "../../../UI/MyButton.tsx";
import MyTimer from "../../../UI/MyTimer.tsx";
import situationStore from "../../../Store/GameStores/SituationStore";
import answerStore from "../../../Store/GameStores/AnswerStore";

const GameSendAnswersStage: React.FC = observer(() => {
    useEffect(() => {
        situationStore.getSituations().then()
    })

    return (
        <section className="game__answers">
            <p className="answers__situation">
                {answerStore.fetchedText}
            </p>
            <WindowChooseGif/>
            <div className="answers__bottom">
                <MyButton btnText=""
                          btnStyle="gif-send__btn"
                          handleOnClick={() => answerStore.sendAnswer().then()}/>
                <div className="game-send-answers__timer"><MyTimer seconds={60}/></div>
            </div>
        </section>
    );
});

export default GameSendAnswersStage;
