import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import "../../Styles/GameStyle/Game.scss"
import WindowChooseGif from "../WindowChooseGif/WindowChooseGif.tsx";
import gameStore from "../../Store/GameStore";
import MyButton from "../../UI/MyButton";

const Game: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const lobbyID: string | null = searchParams.get("lobbyID")
    console.log(lobbyID)

    return (
        <div className="main_game">
            <MyButton btnStyle="leave_from_game__btn"
                      handleOnClick={() => gameStore.leaveGame().then(() => navigate("/lobby"))}
                      btnText="Выйти в лобби"/>
            <div className="game">
                <WindowChooseGif/>
            </div>
        </div>
    );
};


export default Game;
