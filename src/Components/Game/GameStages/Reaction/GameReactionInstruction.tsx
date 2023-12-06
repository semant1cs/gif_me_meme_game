import React from 'react';
import MyTimer from "../../../../UI/MyTimer";

const GameAnswerInstruction: React.FC = () => {
    return (
        <div className="game__instruction">
            <h1 className="instruction__title">
                Переходим к оценке ответов других игроков
            </h1>
            <p className="instruction__text">
                На данном этапе вашей задачей будет оценить гифки игроков, предложенные на ситуацию
            </p>
            <p className="instruction__text">
                Чем смешнее гифка - тем больше очков
            </p>
            <div className="instruction__timer">
                <MyTimer seconds={5}/>
            </div>
        </div>
    );
};

export default GameAnswerInstruction;
