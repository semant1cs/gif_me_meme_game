import React from 'react';
import gameStore from "../../Store/GameStore";
import MyTextArea from "../../UI/MyTextArea";
import MyButton from "../../UI/MyButton";
import {observer} from "mobx-react-lite";
import MyTimer from "../../UI/MyTimer.tsx";

const GameIdeaProposalStage: React.FC = observer(() => {
    return (
        <section className="game__idea">
            <p className="idea__title">
                Предложите идею, ситуацию или событие, на которое смогут отреагировать другие игроки
            </p>
            <MyTextArea value={gameStore.situationText}
                        placeholder="Например..."
                        handleOnChange={(e) => gameStore.setSituationText(e.target.value)}
                        style="idea__textarea"/>
            <div className="idea__buttons">
                <MyButton btnText="Случайная тема"
                          btnStyle="idea-buttons__random"
                          handleOnClick={() => gameStore.getRandomTheme()}/>
                <MyButton btnText=""
                          btnStyle="idea-buttons__send"
                          handleOnClick={() => gameStore.sendSituation()}/>
                <MyTimer seconds={30}/>
            </div>
        </section>
    );
});

export default GameIdeaProposalStage;
