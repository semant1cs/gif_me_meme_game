import React, {ChangeEvent} from 'react';
import {observer} from "mobx-react-lite";
import "../App.css"

type MyInputProps = {
    style: string,
    placeholder?: string,
    type: string,
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void,
    min?: number,
    max?: number,
    value: number | string,
}

const MyInput: React.FC<MyInputProps> = observer(
    ({style, placeholder, type, handleOnChange, min, max, value}: MyInputProps) => {
        return (
            <input className={style} onChange={e => handleOnChange(e)} type={type} placeholder={placeholder}
                   min={min} max={max} value={value}/>
        );
    })

export default MyInput;
