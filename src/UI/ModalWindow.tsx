import React, {useEffect} from 'react';
import './StylesUI/ModalWindow.scss'
import MyButton from "./MyButton.tsx";
import {PropsWithChildren} from "react";

interface ModalWindowProps {
    body: React.ReactNode,
    windowContentStyles: string,
    onSubmit?: () => void,
    onClose: () => void,
}

const ModalWindow: React.FC<ModalWindowProps> =
    ({body, onClose, windowContentStyles}: PropsWithChildren<ModalWindowProps>) => {

        const onKeypress = (e: KeyboardEvent) => e?.key === "Esc" || e.key === "Escape" ? onClose() : null;
        useEffect(() => {

            document.addEventListener('keyup', onKeypress);

            return () => {
                document.removeEventListener('keyup', onKeypress);
            };
        }, []);

        return (
            <div className={"modal-window"} onClick={onClose}>
                <div className={`modal-window__content ${windowContentStyles}`} onClick={(e) => e.stopPropagation()}>
                    <div className="modal-window__body" children={body}></div>
                    <MyButton
                        btnText="X"
                        btnStyle="close-modal__btn"
                        handleOnClick={() => onClose()}/>
                </div>
            </div>
        );
    };

export default ModalWindow;
