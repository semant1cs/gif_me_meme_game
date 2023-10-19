import AddPlayerLogo from "../../Imgs/SVG/AddPlayerLogo.tsx";

const LobbyAddPlayer = () => {
    return (
        <div>
            <div className="player_party add_player">
                <AddPlayerLogo/>
                <div className="username user-1">Добавить</div>
            </div>
        </div>
    );
};

export default LobbyAddPlayer;
