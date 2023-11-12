import React, {useEffect, useState} from 'react';
import WindowGifItem from "./WindowGifItem.tsx";
import {getNanoGifs} from "../../../tenorAPI/tenorAPI.ts";
import {observer} from "mobx-react-lite";
import SearchIcon from "../../../Imgs/SVG/SearchIcon.tsx";
import {useDebounce} from "usehooks-ts";
import answerStore from "../../../Store/GameStores/AnswerStore";

const WindowChooseGif: React.FC = observer(() => {
    const [textSearcher, setTextSearcher] = useState("")
    const debounce = useDebounce(textSearcher, 500)
    const countGifsCanSelect = 1;

    useEffect(() => {
        getNanoGifs(debounce, 10)
        answerStore.selectedGifs = 0
    }, [debounce])

    return (
        <div className="window-choose-gif">
            <div className="form-choose-gif">
                <div className="searcher__field">
                    <input className="gif-searcher" type="text" value={textSearcher}
                           onChange={(e) => setTextSearcher(e.target.value)}/>
                    <SearchIcon/>
                </div>
                <div className="window-choose-gif-items">
                {answerStore.testGifs.map((gif, index) =>
                    <WindowGifItem countGifsCanSelect={countGifsCanSelect} key={index} gif={gif}/>)}
                </div>
            </div>
        </div>
    );
});

export default WindowChooseGif;
