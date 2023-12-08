import React from 'react';
import MyInput from "../../UI/MyInput.tsx";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon.tsx";
import MyButton from "../../UI/MyButton.tsx";
import {useNavigate} from "react-router-dom";

interface IAuthProps {
    userAuthEmail: string;
    handleOnChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
    userAuthPassword: string;
    handleOnChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    handleOnChangeShowPassword: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleOnClickLoginButton: (login: string, password: string) => void;
}

const Auth: React.FC<IAuthProps> = ({
                                        userAuthEmail,
                                        handleOnChangeEmail,
                                        userAuthPassword,
                                        handleOnChangePassword,
                                        showPassword,
                                        handleOnChangeShowPassword,
                                        handleOnClickLoginButton
                                    }) => {
    const navigate = useNavigate()

    return (
        <div>
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
    )
        ;
};

export default Auth;
