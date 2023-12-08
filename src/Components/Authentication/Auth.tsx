import React, {useCallback} from 'react';
import MyInput from "../../UI/MyInput.tsx";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon.tsx";
import MyButton from "../../UI/MyButton.tsx";

interface IAuthProps {
    userAuthEmail: string;
    handleOnChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
    userAuthPassword: string;
    handleOnChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    handleOnChangeShowPassword: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleOnClickLoginButton: (login: string, password: string) => void;
    changeStageAuthenticationHandler: (stage: string) => void;
}

const Auth: React.FC<IAuthProps> =
    ({
         userAuthEmail,
         handleOnChangeEmail,
         userAuthPassword,
         handleOnChangePassword,
         showPassword,
         handleOnChangeShowPassword,
         handleOnClickLoginButton,
         changeStageAuthenticationHandler
     }) => {

        const onHandleChangeStageAuthentication = useCallback(() => {
            changeStageAuthenticationHandler("register")
        }, [])

        return (
            <main className="auth">
                <div className="auth__container container">
                    <div className="auth__main">
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
                                          handleOnClick={onHandleChangeStageAuthentication}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    };

export default Auth;
