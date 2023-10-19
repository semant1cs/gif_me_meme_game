import LobbyPartyPlayer from "./LobbyPartyPlayer.tsx";
import LobbyAddPlayer from "./LobbyAddPlayer.tsx";

interface ILobbyUsers {
    users: { nickname: string, photoURL: string }[]
}

const LobbyParty = ({users}: ILobbyUsers) => {
    return (
        <div>
            <div className="line"></div>
            <div className="party_game party_game-1">
                {users.map((user, index) =>
                    <LobbyPartyPlayer nickname={user.nickname} photoURL={user.photoURL} key={index}
                    />)}
                <LobbyAddPlayer/>
            </div>
        </div>
    );
};

export default LobbyParty;
