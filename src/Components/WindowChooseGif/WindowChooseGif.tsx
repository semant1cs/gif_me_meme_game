import React, {useDeferredValue, useEffect, useState} from 'react';
import GameStore from "../../Store/GameStore.ts";
import WindowGifItem from "./WindowGifItem.tsx";
import {getNanoGifs} from "../../tenorAPI/tenorAPI.ts";
import {observer} from "mobx-react-lite";

const WindowChooseGif: React.FC = observer(() => {
    const [textSearcher, setTextSearcher] = useState("")
    const debounceSearcher = useDeferredValue(textSearcher)

    const countGifsCanSelect = 1;

    useEffect(() => {
        if (debounceSearcher) {
            getNanoGifs(debounceSearcher, 10)
        }
    }, [debounceSearcher])

    return (
        <div>
            <form className="window-choose-gif">
                <input className="gif-searcher" type="text" value={textSearcher}
                       onChange={(e) => setTextSearcher(e.target.value)}/>
                {GameStore.testGifs.map((testImg, index) =>
                    <WindowGifItem countGifsCanSelect={countGifsCanSelect} key={index} testImg={testImg}/>)}
                <button onClick={(e) => e.preventDefault()} className="choose-gif__btn">Отправить</button>
            </form>
        </div>
    );
});

export default WindowChooseGif;
