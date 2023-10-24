import React, {useState} from 'react';
import gameStore from "../../Store/GameStore.ts";
import {observer} from "mobx-react-lite";

interface IPictureItemProps {
    testImg: string,
}

const WindowGifItem: React.FC<IPictureItemProps> = observer(({testImg}: IPictureItemProps) => {
    const [isImgSelected, setIsImgSelected] = useState(false)

    function SelectGif() {
        if (isImgSelected) {
            gameStore.setSelectedGifs(gameStore.selectedGifs - 1)
        } else if (gameStore.selectedGifs < 1) {
            gameStore.setSelectedGifs(gameStore.selectedGifs + 1)
        } else return
        setIsImgSelected(!isImgSelected)
    }

    return (
        <img
            className={isImgSelected ? "window-choose-gif-item selected-gif" : "window-choose-gif-item"}
            src={testImg} alt="text" onClick={SelectGif}/>
    )
})

export default WindowGifItem;
