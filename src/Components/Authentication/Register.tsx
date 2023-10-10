import React from 'react';
import {observer} from "mobx-react-lite";
import "../../Styles/AuthenticationStyle/Authentication.scss"
import MyInput from "../../UI/MyInput";
import gameStore from "../../Store/GameStore";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon";

const Register: React.FC = observer(() => {
    const navigate = useNavigate()

    const handleOnCreate = () => {
        if (gameStore.userAuthNickName && gameStore.userAuthEmail && gameStore.userAuthPassword) {
            gameStore.changeUserIsAuth(true)
            navigate("/lobby")
        }
    }

    return (
        <main className="auth">
            <div className="auth__container container">
                <div className="auth__main">
                    <h2>
                        Зарегистрируйте новый аккаунт
                    </h2>
                    <div className="auth__inputs">
                        <MyInput style="auth__nickname" placeholder="имя пользователя" type="text"
                                 handleOnChange={e => gameStore.changeUserAuthNickname(e.target.value)}
                                 value={gameStore.userAuthNickName}/>
                        <MyInput style="auth__email" placeholder="email" type="email"
                                 handleOnChange={e => gameStore.changeUserAuthEmail(e.target.value)}
                                 value={gameStore.userAuthEmail}/>
                        <div className="auth__passwordBlock">
                            <MyInput style="auth__password" placeholder="пароль"
                                     type={gameStore.userAuthShowPassword ? "text" : "password"}
                                     handleOnChange={e => gameStore.changeUserAuthPassword(e.target.value)}
                                     value={gameStore.userAuthPassword}/>
                            <span onClick={() => gameStore.changeUserAuthShowPassword()}>
                                <ShowPasswordIcon/>
                            </span>
                        </div>
                    </div>
                    <div className="auth__bottom">
                        <MyButton btnText="Назад" btnStyle="auth__create"
                                  handleOnClick={() => navigate("/auth")}/>
                        <MyButton btnText="Создать" btnStyle="auth__login"
                                  handleOnClick={() => handleOnCreate()}/>
                    </div>
                </div>
            </div>
        </main>
    );
})

export default Register;
