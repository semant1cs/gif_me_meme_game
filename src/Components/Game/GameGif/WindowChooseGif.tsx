import React, {useEffect, useState} from 'react';
import GameStore from "../../../Store/GameStore.ts";
import WindowGifItem from "./WindowGifItem.tsx";
import {getNanoGifs} from "../../../tenorAPI/tenorAPI.ts";
import {observer} from "mobx-react-lite";
import SearchIcon from "../../../Imgs/SVG/SearchIcon.tsx";
import {useDebounce} from "usehooks-ts";

const WindowChooseGif: React.FC = observer(() => {
    const [textSearcher, setTextSearcher] = useState("")
    const debounce = useDebounce(textSearcher, 500)
    const countGifsCanSelect = 1;

    useEffect(() => {
        getNanoGifs(debounce, 10)
    }, [debounce])

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
