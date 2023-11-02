import React from 'react';
import GameLogo from "../../Imgs/SVG/GameLogo";
import gameStore from "../../Store/GameStore";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";

const GameHeader: React.FC = () => {
    const navigate = useNavigate()

    return (
        <header className="game__header">
            <GameLogo/>
            <MyButton btnStyle="game-header__leave"
                      handleOnClick={() => gameStore.leaveGame().then(() => navigate("/lobby"))}
                      btnText="Выйти в лобби"/>
        </header>
    );
};

export default GameHeader;
