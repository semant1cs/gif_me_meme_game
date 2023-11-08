import React from 'react';
import GameReactions from "./GameReactions.tsx";

const GameReactionsWindow: React.FC = () => {
    return (
        <div className="game-reactions-window">
            <p className="game-reactions__title">Поставьте оценку этому игроку</p>
            <GameReactions/>
        </div>
    );
};

export default GameReactionsWindow;
