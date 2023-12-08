import React, {useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import "../../Styles/AuthenticationStyle/Authentication.scss"
import MyInput from "../../UI/MyInput";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import authStore from "../../Store/AuthStore";

const Auth: React.FC = observer(() => {
    const navigate = useNavigate()
    const auth = getAuth()

    const [userAuthEmail, setUserAuthEmail] = useState("")
    const [userAuthPassword, setUserAuthPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleOnClickLoginButton = useCallback((userAuthEmail: string, userAuthPassword: string) => {
        if (userAuthEmail && userAuthPassword)
            authStore.signIn(userAuthEmail, userAuthPassword).then(() => navigate("/lobby"))
        else if (!userAuthEmail) alert("Введите имя пользователя")
        else if (!userAuthPassword) alert("Введите пароль")
    }, [])

    const handleOnChangeEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setUserAuthEmail(e.currentTarget.value)
    }, [])

    const handleOnChangePassword = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setUserAuthPassword(e.currentTarget.value)
    }, [])

    const handleOnChangeShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    useEffect(() => {
        // Автовход в сессию
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/lobby")
            }
        })
    }, [])


    return (
        <main className="auth">
            <div className="auth__container container">
                <div className="auth__main">
                    <h2>
                        Авторизуйтесь, чтобы начать играть
                    </h2>
                    <div className="auth__inputs">
                        <MyInput style="auth__email" placeholder="email" type="email"
                                 handleOnChange={handleOnChangeEmail}
                                 value={userAuthEmail}
                        />
                        <div className="auth__passwordBlock">
                            <MyInput style="auth__password" placeholder="пароль"
                                     type={showPassword ? "text" : "password"}
                                     handleOnChange={handleOnChangePassword}
                                     value={userAuthPassword}
                            />
                            <span onClick={handleOnChangeShowPassword}>
                                <ShowPasswordIcon/>
                            </span>
                        </div>
                    </div>
                    <div className="auth__bottom">
                        <MyButton btnText="Войти" btnStyle="auth__login"
                                  handleOnClick={() => handleOnClickLoginButton(userAuthEmail, userAuthPassword)}/>
                        <p>
                            или
                        </p>
                        <MyButton btnText="Создать аккаунт" btnStyle="auth__create"
                                  handleOnClick={() => navigate("/register")}/>
                    </div>
                </div>
            </div>
        </main>
    );
})

export default Auth;
