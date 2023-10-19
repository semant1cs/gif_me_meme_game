import PlayerIcon from "../../Imgs/SVG/PlayerIcon.tsx";

interface ILobbyUser {
    photoURL: string,
    nickname: string
}

const LobbyPartyPlayer = (user: ILobbyUser) => {
    return (
        <div>
            <div className="player_party player-party__1">
                {user.photoURL ? <img className="player_avatar" src={user.photoURL} alt=""/> : <PlayerIcon/>}
                <div className="username user-1">{user.nickname}</div>
            </div>
        </div>
    );
};

export default LobbyPartyPlayer;
