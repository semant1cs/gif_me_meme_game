import React from 'react';
import {observer} from "mobx-react-lite";
import "../App.css"

type MyButtonProps = {
    btnStyle: string,
    btnText: string,
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const MyButton: React.FC<MyButtonProps> = observer(({btnStyle, btnText, handleOnClick}: MyButtonProps) => {

    return (
        <button className={btnStyle} onClick={(e) => handleOnClick(e)}>
            <span>
                {btnText}
            </span>
        </button>
    );
})

export default MyButton;
