import React from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton";
import "../../Styles/WelcomePageStyle/WelcomePage.scss"
import Logo from "../../Imgs/SVG/Logo";
import {useNavigate} from "react-router-dom";
import GifTenor from "../GifTenorOutput/GifTenor.tsx";
import ModalWindow from "../../UI/ModalWindow.tsx";

const WelcomePage: React.FC = observer(() => {
    const navigate = useNavigate()

    return (
        <main className="welcome">
            <div className="welcome__container">
                <div className="welcome__main">
                    <h1 className="welcome__title">
                        Добро пожаловать в игру
                        <p>GIF ME MEME</p>
                    </h1>
                    <p className="welcome__description">
                        Это прекрасное место, чтобы отлично провести время с друзьями
                    </p>
                    <MyButton btnStyle="welcome__button" btnText={"Начать игру"}
                              handleOnClick={() => navigate("/lobby")}/>
                    <ModalWindow title={"Привет"} isActive={false}/>
                    <GifTenor/>
                    <div className="welcome__logo">
                        <Logo/>
                    </div>
                </div>
            </div>
        </main>
    );
})

export default WelcomePage;
