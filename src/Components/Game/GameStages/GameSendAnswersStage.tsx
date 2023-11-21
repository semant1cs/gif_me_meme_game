import React from 'react';
import WindowChooseGif from "../GameGif/WindowChooseGif.tsx";
import {observer} from "mobx-react-lite";
import MyButton from "../../../UI/MyButton.tsx";
import MyTimer from "../../../UI/MyTimer.tsx";
import answerStore from "../../../Store/GameStores/AnswerStore";
import gameStore from "../../../Store/GameStores/GameStore";
import situationStore from "../../../Store/GameStores/SituationStore";

const GameSendAnswersStage: React.FC = observer(() => {
    return (
        <section className="game__answers">
            <p className="answers__round">
                Раунд {gameStore.currentUserLobby?.currentGameRound}
            </p>
            {
                gameStore.currentUserLobby && situationStore.allGameSituations
                    ?
                    <p className="answers__situation">
                        {
                            situationStore.currentRoundSituation?.situationText
                        }
                    </p>
                    : ""
            }
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
                                  handleOnClick={() => answerStore.sendAnswer(situationStore.currentRoundSituation).then()}/>
                        : ""
                }
            </div>
        </section>
    );
});

export default GameSendAnswersStage;
