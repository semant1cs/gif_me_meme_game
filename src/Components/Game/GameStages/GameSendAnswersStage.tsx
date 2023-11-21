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
            <p className="answers__round">
                Раунд 1
            </p>
            <p className="answers__situation">
                ddawdawdddawdawdddawdawdddawdawd
            </p>
            <div className="answers__window">
                <WindowChooseGif/>
            </div>
            <div className="answers__bottom">
                <MyTimer seconds={60}/>
                {
                    answerStore.userSelectedGif
                        ?
                        <MyButton btnText="Отменить выбор"
                                  btnStyle="answer__cancel"
                                  handleOnClick={() => answerStore.setUserSelectedGif(null)}/>
                        : ""
                }
                {
                    answerStore.userSelectedGif
                        ?
                        <MyButton btnText=""
                                  btnStyle="answers__button"
                                  handleOnClick={() => answerStore.sendAnswer().then()}/>
                        : ""
                }
            </div>
        </section>
    );
});

export default GameSendAnswersStage;
