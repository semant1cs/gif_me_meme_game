import React from 'react';
import {observer} from "mobx-react-lite";
import "../../Styles/AuthenticationStyle/Authentication.scss"
import MyInput from "../../UI/MyInput";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon";
import authStore from "../../Store/AuthStore";

const Register: React.FC = observer(() => {
    const navigate = useNavigate()

    const handleOnCreate = () => {
        if (authStore.userAuthNickName && authStore.userAuthEmail && authStore.userAuthPassword)
            authStore.register().then(() => navigate("/lobby"))
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
                                 handleOnChange={e => authStore.changeUserAuthNickname(e.target.value)}
                                 value={authStore.userAuthNickName}/>
                        <MyInput style="auth__email" placeholder="email" type="email"
                                 handleOnChange={e => authStore.changeUserAuthEmail(e.target.value)}
                                 value={authStore.userAuthEmail}/>
                        <div className="auth__passwordBlock">
                            <MyInput style="auth__password" placeholder="пароль"
                                     type={authStore.userAuthShowPassword ? "text" : "password"}
                                     handleOnChange={e => authStore.changeUserAuthPassword(e.target.value)}
                                     value={authStore.userAuthPassword}/>
                            <span onClick={() => authStore.changeUserAuthShowPassword()}>
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
