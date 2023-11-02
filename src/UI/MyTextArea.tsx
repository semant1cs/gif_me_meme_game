import React, {ChangeEvent} from 'react';

type MyTextAreaProps = {
    style: string,
    placeholder?: string,
    handleOnChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    value: number | string,
}

const MyTextArea: React.FC<MyTextAreaProps> = ({style, placeholder, handleOnChange, value}: MyTextAreaProps) => {

    return (
        <textarea className={style} onChange={e => handleOnChange(e)} placeholder={placeholder} value={value}/>
    );
};

export default MyTextArea;
