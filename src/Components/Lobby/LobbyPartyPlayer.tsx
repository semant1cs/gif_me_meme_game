import React from "react";
import {observer} from "mobx-react-lite";
import UserIcon from "../../Imgs/SVG/UserIcon";

type LobbyUserProps =
    {
        photoURL: string,
        nickname: string
    }

const LobbyPartyPlayer: React.FC<LobbyUserProps> = observer((user: LobbyUserProps) => {
    return (
        <div className="party__player">
            {
                user.photoURL
                    ? <img className="player_avatar" src={user.photoURL} alt="playerAvatar"/>
                    : <UserIcon/>
            }
            <p className="player__name">
                {user.nickname}
            </p>
        </div>
    );
})

export default LobbyPartyPlayer;
