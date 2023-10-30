import React, {useDeferredValue, useEffect, useState} from 'react';
import GameStore from "../../Store/GameStore.ts";
import WindowGifItem from "./WindowGifItem.tsx";
import {getNanoGifs} from "../../tenorAPI/tenorAPI.ts";
import {observer} from "mobx-react-lite";
import SearchIcon from "../../Imgs/SVG/SearchIcon.tsx";

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
        <div className="window-choose-gif">
            <form className="form-choose-gif">
                <div className="searcher__field">
                    <input className="gif-searcher" type="text" value={textSearcher}
                           onChange={(e) => setTextSearcher(e.target.value)}/>
                    <SearchIcon/>
                </div>
                {GameStore.testGifs.map((gif, index) =>
                    <WindowGifItem countGifsCanSelect={countGifsCanSelect} key={index} gif={gif}/>)}
            </form>
        </div>
    );
});

export default WindowChooseGif;
