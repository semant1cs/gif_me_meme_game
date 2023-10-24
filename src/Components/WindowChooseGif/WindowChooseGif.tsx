import React, {useEffect, useState} from 'react';
import GameStore from "../../Store/GameStore.ts";
import WindowGifItem from "./WindowGifItem.tsx";
import {getNanoGifs} from "../../tenorAPI/tenorAPI.ts";
import {useDebounce} from "usehooks-ts";

const WindowChooseGif: React.FC = () => {
    const [textSearcher, setTextSearcher] = useState("")
    const [isSearching, setIsSearching] = useState(false);

    const debounceSearcher = useDebounce(textSearcher, 500)

    useEffect(() => {
        if (debounceSearcher) {
            setIsSearching(true);
            getNanoGifs(debounceSearcher, 10)
        }
    }, [debounceSearcher])

    return (
        <div>
            <form className="window-choose-gif">
                <input className="gif-searcher" type="text" value={textSearcher}
                       onChange={(e) => setTextSearcher(e.target.value)}/>
                {isSearching ? GameStore.testGifs.map((testImg, index) =>
                        <WindowGifItem key={index} testImg={testImg}/>)
                    : ""}
                <button onClick={(e) => e.preventDefault()} className="choose-gif__btn">Отправить</button>
            </form>
        </div>
    );
};

export default WindowChooseGif;
