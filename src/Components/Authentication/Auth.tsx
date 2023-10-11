import React from 'react';
import {observer} from "mobx-react-lite";
import "../../Styles/AuthenticationStyle/Authentication.scss"
import MyInput from "../../UI/MyInput";
import gameStore from "../../Store/GameStore";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import authStore from "../../Store/AuthStore";

const Auth: React.FC = observer(() => {
    const navigate = useNavigate()

    const handleOnCreate = () => {
        if (gameStore.userAuthEmail && gameStore.userAuthPassword) {
            const auth = getAuth();

            signInWithEmailAndPassword(auth, gameStore.userAuthEmail, gameStore.userAuthPassword)
                .then((userCredential) => authStore.setUser(userCredential.user))
                .then(() => navigate("/lobby"))
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode + " " + errorMessage)
                })
        }
    }

    return (
        <main className="auth">
            <div className="auth__container container">
                <div className="auth__main">
                    <h2>
                        Авторизуйтесь, чтобы начать играть
                    </h2>
                    <div className="auth__inputs">
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
                        <MyButton btnText="Создать аккаунт" btnStyle="auth__create"
                                  handleOnClick={() => navigate("/register")}/>
                        <MyButton btnText="Войти" btnStyle="auth__login"
                                  handleOnClick={() => handleOnCreate()}/>
                    </div>
                </div>
            </div>
        </main>
    );
})

export default Auth;
