import React from 'react';
import AddPlayerLogo from "../Imgs/SVG/AddPlayerLogo";
import {observer} from "mobx-react-lite";
import "../Styles/UIStyle/UIStyle.scss"

type MyAddPlayerProps = {
    handleOnClick: () => void,
}

const MyAddPlayer: React.FC<MyAddPlayerProps> = observer(({handleOnClick}: MyAddPlayerProps) => {
    return (
        <div className="joinGame">
            <div onClick={handleOnClick}>
                <AddPlayerLogo/>
            </div>
            <p>Присоединиться</p>
        </div>
    )
})

export default MyAddPlayer;
