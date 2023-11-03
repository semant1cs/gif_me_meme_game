import React from 'react';
import gameStore from "../../Store/GameStore";
import MyTextArea from "../../UI/MyTextArea";
import MyButton from "../../UI/MyButton";
import {observer} from "mobx-react-lite";

const GameIdea: React.FC = observer(() => {
    return (
        <section className="game__idea">
            <p className="idea__title">
                Предложите идею, ситуацию или событие, на которое смогут отреагировать другие игроки
            </p>
            <MyTextArea value={gameStore.currentUserIdea}
                        placeholder="Например..."
                        handleOnChange={(e) => gameStore.setCurrentUserIdea(e.target.value)}
                        style="idea__textarea"/>
            <div className="idea__buttons">
                <MyButton btnText="Случайная тема"
                          btnStyle="idea-buttons__random"
                          handleOnClick={() => gameStore.getRandomTheme()}/>
                <MyButton btnText=""
                          btnStyle="idea-buttons__send"
                          handleOnClick={() => gameStore.sendIdea()}/>
            </div>
        </section>
    );
});

export default GameIdea;