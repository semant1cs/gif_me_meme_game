import React from 'react';
import {observer} from "mobx-react-lite";
import "../App.css"

type MyButtonProps = {
    btnStyle: string,
    btnText: string,
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    disabled?: boolean
}

const MyButton: React.FC<MyButtonProps> = observer(({btnStyle, btnText, handleOnClick, disabled}: MyButtonProps) => {

    return (
        <button className={btnStyle} onClick={(e) => handleOnClick(e)} disabled={disabled}>
            <span>
                {btnText}
            </span>
        </button>
    );
})

export default MyButton;
