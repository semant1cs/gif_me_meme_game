import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import MyButton from "../../../UI/MyButton.tsx";
import authStore from "../../../Store/AuthStore.ts";
import React, {useEffect} from "react";
import lobbyStore from "../../../Store/LobbyStore.ts";

const LobbySignOutModal: React.FC = observer(() => {
    const navigate = useNavigate()

    const onKeypress = (e: KeyboardEvent) => e?.key === "Esc" || e.key === "Escape" ? lobbyStore.changeSignOutModal() : null;
    useEffect(() => {
        document.addEventListener('keyup', onKeypress);

        return () => {
            document.removeEventListener('keyup', onKeypress);
        };
    }, []);


    return (
        <div className="lobby-header__modal">
            <div className="lobby-header-wrapper__button">
                <MyButton btnText="Выйти" btnStyle="lobby-headerModal__button" handleOnClick={() =>
                    authStore.logOutUser().then(() => navigate("/"))}/>
            </div>
        </div>
    )
})

export default LobbySignOutModal;
