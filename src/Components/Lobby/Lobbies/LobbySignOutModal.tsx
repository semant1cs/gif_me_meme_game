import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import MyButton from "../../../UI/MyButton.tsx";
import authStore from "../../../Store/AuthStore.ts";
import React, {useEffect} from "react";
import lobbyStore from "../../../Store/LobbyStores/LobbyStore.ts";

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
                <label className="lobby-header__image">
                    <p className="lobby-header-image__button">
                        Добавить фото
                    </p>
                    <input onChange={e => lobbyStore.setUserImage(e.target.files ? e.target.files[0] : null)}
                           accept="image/*,image/jpeg,image/png"
                           className="lobby-header-image__input"
                           type="file"/>
                </label>
                <MyButton btnText="Выйти" btnStyle="lobby-headerModal__button" handleOnClick={() =>
                    authStore.logOutUser().then(() => navigate("/"))}/>
            </div>
        </div>
    )
})

export default LobbySignOutModal;
