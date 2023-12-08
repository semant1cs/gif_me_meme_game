import React, {useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import "../../Styles/AuthenticationStyle/Authentication.scss"
import {useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import authStore from "../../Store/AuthStore";
import Auth from "./Auth.tsx";
import Register from "./Register.tsx";

const AuthenticationPage: React.FC = observer(() => {
    const navigate = useNavigate()
    const auth = getAuth()

    const [userNickname, setUserNickname] = useState("")
    const [userAuthEmail, setUserAuthEmail] = useState("")
    const [userAuthPassword, setUserAuthPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [stageAuthentication, setStageAuthentication] = useState("login")


    const handleOnClickLoginButton = useCallback((userAuthEmail: string, userAuthPassword: string) => {
        if (userAuthEmail && userAuthPassword)
            authStore.signIn(userAuthEmail, userAuthPassword).then(() => navigate("/lobby"))
        else if (!userAuthEmail) alert("Введите имя пользователя")
        else if (!userAuthPassword) alert("Введите пароль")
    }, [])

    const handleOnRegister = useCallback((userNickname: string, userAuthEmail: string, userAuthPassword: string) => {
        if (userNickname && userAuthEmail && userAuthPassword)
            authStore.register(userNickname, userAuthEmail, userAuthPassword).then(() => navigate("/lobby"))
    }, [])

    const handleOnChangeEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setUserAuthEmail(e.currentTarget.value)
    }, [])

    const handleOnChangeNickname = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setUserNickname(e.currentTarget.value)
    }, [])

    const handleOnChangePassword = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setUserAuthPassword(e.currentTarget.value)
    }, [])

    const handleOnChangeShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    const setStageAuthenticationHandler = useCallback((stage: string) => {
        setStageAuthentication(stage)
    }, [])

    useEffect(() => {
        // Автовход в сессию
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/lobby")
            }
        })
    }, [])

    function getCurrentStage(stage: string) {
        switch (stage) {
            case "login":
                return (
                    <Auth
                        userAuthEmail={userAuthEmail}
                        handleOnChangeEmail={handleOnChangeEmail}
                        userAuthPassword={userAuthPassword}
                        handleOnChangePassword={handleOnChangePassword}
                        showPassword={showPassword}
                        handleOnChangeShowPassword={handleOnChangeShowPassword}
                        handleOnClickLoginButton={handleOnClickLoginButton}
                        changeStageAuthenticationHandler={setStageAuthenticationHandler}
                    />
                )
            case "register":
                return (
                    <Register
                        userAuthEmail={userAuthEmail}
                        handleOnChangeEmail={handleOnChangeEmail}
                        userNickname={userNickname}
                        handleOnChangeNickname={handleOnChangeNickname}
                        userAuthPassword={userAuthPassword}
                        handleOnChangePassword={handleOnChangePassword}
                        showPassword={showPassword}
                        handleOnChangeShowPassword={handleOnChangeShowPassword}
                        handleOnClickRegisterButton={handleOnRegister}
                        changeStageAuthenticationHandler={setStageAuthenticationHandler}
                    />
                )
        }
    }


    return (
        <div>
            {getCurrentStage(stageAuthentication)}
        </div>

    )
})

export default AuthenticationPage;
