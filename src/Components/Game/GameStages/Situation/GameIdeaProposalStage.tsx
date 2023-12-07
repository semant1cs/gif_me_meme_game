import React from 'react';
import MyTextArea from "../../../../UI/MyTextArea";
import MyButton from "../../../../UI/MyButton";
import {observer} from "mobx-react-lite";
import MyTimer from "../../../../UI/MyTimer.tsx";
import situationStore from "../../../../Store/GameStores/SituationStore";

const GameIdeaProposalStage: React.FC = observer(() => {
    return (
        <section className="game__idea">
            <p className="idea__title">
                Предложите идею, ситуацию или событие, на которое смогут отреагировать другие игроки
            </p>
            <MyTextArea value={situationStore.situationText}
                        placeholder="Например..."
                        handleOnChange={(e) => situationStore.setSituationText(e.target.value)}
                        style="idea__textarea"/>
            <div className="idea__down">
                <MyTimer seconds={40}
                         handleOnTimerEnd={() => situationStore.getRandomTheme()
                             .then(() => situationStore.sendSituation())}/>
                <div className="idea__buttons">
                    <MyButton btnText="Случайная тема"
                              btnStyle="idea-buttons__random"
                              handleOnClick={() => situationStore.getRandomTheme()}/>
                    <MyButton btnText=""
                              btnStyle="idea-buttons__send"
                              handleOnClick={() => situationStore.sendSituation()}/>
                </div>
            </div>
        </section>
    );
});

export default GameIdeaProposalStage;
