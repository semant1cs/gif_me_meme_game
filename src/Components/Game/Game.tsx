import React from 'react';
import {useNavigate} from "react-router-dom";
import "../../Styles/GameStyle/Game.scss"
import WindowChooseGif from "../WindowChooseGif/WindowChooseGif.tsx";

const Game: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="main_game">
            <button className="leave_from_game__btn" onClick={() => navigate('/lobby')}>Выйти в лобби</button>
            <div className="game">
                <WindowChooseGif/>
            </div>
        </div>
    );
};


export default Game;
