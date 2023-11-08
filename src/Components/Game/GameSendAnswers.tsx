import React, {useEffect} from 'react';
import WindowChooseGif from "./GameGif/WindowChooseGif.tsx";
import {observer} from "mobx-react-lite";
import gameStore from "../../Store/GameStore.ts";
import MyButton from "../../UI/MyButton.tsx";
import MyTimer from "../../UI/MyTimer.tsx";

const GameSendAnswers: React.FC = observer(() => {
    useEffect(() => {
        gameStore.getSituation().then()
    })

    return (
        <section className="game-send-answers">
            <div className="situation-text">{gameStore.fetchedText}</div>
            <WindowChooseGif/>
            <MyButton btnText=""
                      btnStyle="gif-send__btn"
                      handleOnClick={() => gameStore.sendSituation().then(() => gameStore.setNextStage())}/>
            <div className="game-send-answers__timer"><MyTimer seconds={60}/></div>
        </section>
    );
});

export default GameSendAnswers;
