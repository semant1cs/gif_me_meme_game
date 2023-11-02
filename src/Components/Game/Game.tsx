import React from 'react';
import {useSearchParams} from "react-router-dom";
import "../../Styles/GameStyle/Game.scss"
import GameHeader from "./GameHeader";
import GameIdea from "./GameIdea";

const Game: React.FC = () => {
    const [searchParams] = useSearchParams()
    const lobbyID: string | null = searchParams.get("lobbyID")
    console.log(lobbyID)

    return (
        <div className="game">
            <GameHeader/>
            <div className="game__centerBlock">
                <GameIdea/>
            </div>
        </div>
    );
};


export default Game;
