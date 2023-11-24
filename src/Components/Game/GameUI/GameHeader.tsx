import React from 'react';
import GameLogo from "../../../Imgs/SVG/GameLogo";
import "../../../Styles/GameStyle/GameUI.scss";

const GameHeader: React.FC = () => {

    return (
        <header className="game__header">
            <GameLogo/>
        </header>
    );
};

export default GameHeader;
