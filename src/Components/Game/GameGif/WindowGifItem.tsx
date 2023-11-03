import React, {useState} from 'react';
import gameStore from "../../../Store/GameStore.ts";
import {observer} from "mobx-react-lite";

interface IPictureItemProps {
    gif: string,
    countGifsCanSelect: number;
}

const WindowGifItem: React.FC<IPictureItemProps> = observer(({gif, countGifsCanSelect}: IPictureItemProps) => {
    const [isImgSelected, setIsImgSelected] = useState(false)

    function SelectGif(gif: string) {
        if (isImgSelected) {
            gameStore.setSelectedGifs(gameStore.selectedGifs - 1)
        } else if (gameStore.selectedGifs < countGifsCanSelect) {
            gameStore.setSelectedGifs(gameStore.selectedGifs + 1)
            gameStore.appendGifOnDb(gif).then()
        } else return
        setIsImgSelected(!isImgSelected)
    }

    return (
        <img
            className={isImgSelected ? "window-choose-gif-item selected-gif" : "window-choose-gif-item"}
            src={gif} alt="text" onClick={() => SelectGif(gif)}/>
    )
})

export default WindowGifItem;
