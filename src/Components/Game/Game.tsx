import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import "../../Styles/GameStyle/Game.scss"
import {getURL} from '../../tenorAPI/tenorAPI.ts'
import axios from "axios";
import GameStore from "../../Store/GameStore.ts";
import {observer} from "mobx-react-lite";

const Game: React.FC = observer(() => {
    const navigate = useNavigate()

    useEffect(() => {
        const respURL = getURL("кирюха")
        axios.get(respURL).then((resp) => {
            console.log(resp.data.results)
            const gifs = resp.data.results.map((result) => result.media_formats.nanogif.url);
            GameStore.setTestGifs(gifs)
        })
    }, [GameStore.setTestGifs])

    return (
        <div className={"main_game"}>
            <button className="leave_from_game__btn" onClick={() => navigate('/lobby')}>Выйти в лобби</button>
            {GameStore.testGifs.map((testImg) => <img style={{width: 300, height: 300}} src={testImg} alt="text"/>)}
            <div className="game">
            </div>
        </div>
    );
});

export default Game;
