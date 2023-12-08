import React from 'react';
import "../../Styles/AuthenticationStyle/Authentication.scss"
import MyInput from "../../UI/MyInput";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon";

interface IRegisterProps {
    userAuthEmail: string;
    handleOnChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
    userNickname: string,
    handleOnChangeNickname: (e: React.FormEvent<HTMLInputElement>) => void;
    userAuthPassword: string;
    handleOnChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    handleOnChangeShowPassword: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleOnClickRegisterButton: (nickname: string, email: string, password: string) => void;
}

const Register: React.FC<IRegisterProps> = ({
                                                userAuthEmail,
                                                handleOnChangeEmail,
                                                userNickname,
                                                handleOnChangeNickname,
                                                userAuthPassword,
                                                handleOnChangePassword,
                                                showPassword,
                                                handleOnChangeShowPassword,
                                                handleOnClickRegisterButton
                                            }) => {
    const navigate = useNavigate()


    return (
        <div>
            <h2>
                Зарегистрируйте новый аккаунт
            </h2>
            <div className="auth__inputs">
                <MyInput style="auth__nickname" placeholder="имя пользователя" type="text"
                         handleOnChange={handleOnChangeNickname}
                         value={userNickname}/>
                <MyInput style="auth__email" placeholder="email" type="email"
                         handleOnChange={handleOnChangeEmail}
                         value={userAuthEmail}/>
                <div className="auth__passwordBlock">
                    <MyInput style="auth__password" placeholder="пароль"
                             type={showPassword ? "text" : "password"}
                             handleOnChange={handleOnChangePassword}
                             value={userAuthPassword}/>
                    <span onClick={handleOnChangeShowPassword}>
                                <ShowPasswordIcon/>
                            </span>
                </div>
            </div>
            <div className="auth__bottom auth__bottom-register">
                <MyButton btnText="Назад" btnStyle="auth__create"
                          handleOnClick={() => navigate("/auth")}/>
                <MyButton btnText="Создать" btnStyle="auth__login"
                          handleOnClick={() => handleOnClickRegisterButton(userNickname, userAuthEmail, userAuthPassword)}/>
            </div>
        </div>
    );
}

export default Register;
