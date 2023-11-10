import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import answerStore from "../../../Store/GameStores/AnswerStore";

interface IPictureItemProps {
    gif: string,
    countGifsCanSelect: number;
}

const WindowGifItem: React.FC<IPictureItemProps> = observer(({gif, countGifsCanSelect}: IPictureItemProps) => {
    const [isImgSelected, setIsImgSelected] = useState(false)

    function SelectGif(gif: string) {
        if (isImgSelected) {
            answerStore.setSelectedGifs(answerStore.selectedGifs - 1)
        } else if (answerStore.selectedGifs < countGifsCanSelect) {
            answerStore.setSelectedGifs(answerStore.selectedGifs + 1)
        } else return
        setIsImgSelected(!isImgSelected)
        answerStore.setChosenGif(gif)
    }

    return (
        <img
            className={isImgSelected ? "window-choose-gif-item selected-gif" : "window-choose-gif-item"}
            src={gif} alt="text" onClick={() => SelectGif(gif)}/>
    )
})

export default WindowGifItem;
