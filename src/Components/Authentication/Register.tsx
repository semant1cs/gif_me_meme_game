import React from 'react';
import {observer} from "mobx-react-lite";
import "../../Styles/AuthenticationStyle/Authentication.scss"
import MyInput from "../../UI/MyInput";
import userStore from "../../Store/UserStore";
import MyButton from "../../UI/MyButton";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../../Imgs/SVG/ShowPasswordIcon";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import authStore from "../../Store/AuthStore";

const Register: React.FC = observer(() => {
    const navigate = useNavigate()

    const handleOnCreate = () => {
        if (userStore.userAuthNickName && userStore.userAuthEmail && userStore.userAuthPassword) {
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, userStore.userAuthEmail, userStore.userAuthPassword)
                .then((userCredential) => authStore.setUser(userCredential.user))
                .then(() => {
                    const user = auth.currentUser
                    if (user)
                        updateProfile(user, {displayName: userStore.userAuthNickName})
                })
                .then(() => navigate("/lobby"))
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode + " " + errorMessage)
                });
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
                                 handleOnChange={e => userStore.changeUserAuthNickname(e.target.value)}
                                 value={userStore.userAuthNickName}/>
                        <MyInput style="auth__email" placeholder="email" type="email"
                                 handleOnChange={e => userStore.changeUserAuthEmail(e.target.value)}
                                 value={userStore.userAuthEmail}/>
                        <div className="auth__passwordBlock">
                            <MyInput style="auth__password" placeholder="пароль"
                                     type={userStore.userAuthShowPassword ? "text" : "password"}
                                     handleOnChange={e => userStore.changeUserAuthPassword(e.target.value)}
                                     value={userStore.userAuthPassword}/>
                            <span onClick={() => userStore.changeUserAuthShowPassword()}>
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
