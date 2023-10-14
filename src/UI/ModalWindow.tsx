import React, {Dispatch, SetStateAction} from 'react';
import './StylesUI/ModalWindow.scss'
import MyButton from "./MyButton.tsx";
import {PropsWithChildren} from "react";

interface ModalWindowProps {
    isActive: boolean,
    title: string,
    body?: string
    onSubmit?: () => void,
    onClose: Dispatch<SetStateAction<boolean>>,
}

const ModalWindow: React.FC<ModalWindowProps> =
    ({isActive, title, body, onClose}: PropsWithChildren<ModalWindowProps>) => {
        if (!isActive) return ""

        const useModal = () => {
            onClose(!isActive)
        }


        return (
            <div className={"modal-window"}>
                <div className={"modal-window__content"}>
                    <h2>{title}</h2>
                    <p>{body}</p>
                    <MyButton
                        btnText={"Закрыть"}
                        btnStyle={"styles-close-brn"}
                        handleOnClick={useModal}></MyButton>
                </div>
            </div>
        );
    };

export default ModalWindow;
