import React from 'react';
import {observer} from "mobx-react-lite";
import "../App.css"

type MyButtonProps = {
    btnStyle: string,
    btnText: string,
    handleOnClick: () => void,
}

const MyButton: React.FC<MyButtonProps> = observer(({btnStyle, btnText, handleOnClick}: MyButtonProps) => {

    return (
        <button className={btnStyle} onClick={handleOnClick}>
            <span>
                {btnText}
            </span>
        </button>
    );
})

export default MyButton;
