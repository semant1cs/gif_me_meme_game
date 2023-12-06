import React from 'react';
import MyTimer from "../../../../UI/MyTimer";

const GameAnswerInstruction: React.FC = () => {
    return (
        <div className="game__instruction">
            <h1 className="instruction__title">
                Переходим к отправке смешных гифок
            </h1>
            <p className="instruction__text">
                Сейчас вам нужно найти и загрузить гифку, которая покажется вам самой смешной
            </p>
            <p className="instruction__text">
                Чем смешнее гифка - тем лучше
            </p>
            <div className="instruction__timer">
                <MyTimer seconds={5}/>
            </div>
        </div>
    );
};

export default GameAnswerInstruction;
