import React, {useState} from 'react';
import './StylesUI/ModalWindow.css'
import MyButton from "./MyButton.tsx";
import {PropsWithChildren} from "react";

interface ModalWindowProps {
    isActive: boolean,
    title: string,
    body?: string
    onSubmit?: () => void,
    onClose?: () => void,
}

const ModalWindow: React.FC<ModalWindowProps> =
    ({isActive, title, body, onSubmit, onClose}: PropsWithChildren<ModalWindowProps>) => {
        const [isModalOpen, setIsModalOpen] = useState(false)

        const useModal = () => setIsModalOpen(!isModalOpen)

        return (
            <div className={"modal-window"}>
                <div className={"modal-window__content"}>
                    <h2>{title}</h2>
                    <p>{body}</p>
                    <MyButton
                        btnText={"Закрыть"}
                        btnStyle={"styles-close-brn"}
                        handleOnClick={onClose}></MyButton>
                </div>
            </div>
        );
    };

export default ModalWindow;
