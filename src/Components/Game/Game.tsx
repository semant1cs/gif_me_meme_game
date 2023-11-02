import React from 'react';
import {useSearchParams} from "react-router-dom";
import "../../Styles/GameStyle/Game.scss"
import WindowChooseGif from "../WindowChooseGif/WindowChooseGif.tsx";
import GameHeader from "./GameHeader";

const Game: React.FC = () => {
    const [searchParams] = useSearchParams()
    const lobbyID: string | null = searchParams.get("lobbyID")
    console.log(lobbyID)

    return (
        <div className="game">
            <GameHeader/>
            <div className="game__container">
                <div>
                    <WindowChooseGif/>
                </div>
            </div>
        </div>
    );
};


export default Game;
