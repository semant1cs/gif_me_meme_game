import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import lobbyStore from "../../../Store/LobbyStores/LobbyStore.ts";
import UserIcon from "../../../Imgs/SVG/UserIcon.tsx";
import authStore from "../../../Store/AuthStore.ts";
import MyButton from "../../../UI/MyButton.tsx";
import {getAuth} from "firebase/auth";

const LobbySignOutModal: React.FC = observer(() => {
    const navigate = useNavigate()
    const auth = getAuth()
    const [isNicknameEditing, changeIsNicknameEditing] = useState<boolean>(false)

    const handleOnChangeNickname = () => {
        authStore.changeNickname(authStore.userAuthNickName)
        changeIsNicknameEditing(false)
    }

    const onKeypress = (e: KeyboardEvent) => e?.key === "Esc" || e.key === "Escape" ? lobbyStore.changeSignOutModal() : null;
    useEffect(() => {
        document.addEventListener('keyup', onKeypress);

        return () => {
            document.removeEventListener('keyup', onKeypress);
        };
    }, []);


    return (
        <div className="profile-modal-window-content">
            <label className="lobby-header__image">
                {lobbyStore.userImageLocal
                    ? <img src={lobbyStore.userImageLocal}
                           alt="userImage"
                           className="profile-modal-window__image"/>
                    : <UserIcon/>
                }
                <input onChange={(e) => lobbyStore.setUserImage(e.target.files ? e.target.files[0] : null)}
                       accept="image/*,image/jpeg,image/png"
                       className="lobby-header-image__input"
                       type="file"/>
            </label>
            <div className="profile-modal-window-nickname" onClick={() => changeIsNicknameEditing(!isNicknameEditing)}>
                {!isNicknameEditing
                    ? auth.currentUser?.displayName || "Введите ник"
                    : (<div className="change-nickname__input">
                        <input
                            defaultValue={auth.currentUser?.displayName || ""}
                            onChange={(e) => authStore.changeUserAuthNickname(e.target.value)}
                            autoFocus={true} className="profile-modal-window-nickname__input"
                        />
                        <MyButton btnStyle="profile-modal-window-nickname__button"
                                  handleOnClick={() => handleOnChangeNickname()} btnText="Сохранить"/>
                    </div>)
                }

            </div>

            <MyButton btnText="Выйти" btnStyle="lobby-headerModal__button" handleOnClick={() =>
                authStore.logOutUser().then(() => navigate("/"))}/>
        </div>
    )
})

export default LobbySignOutModal;
