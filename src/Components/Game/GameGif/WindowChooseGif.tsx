import React, {useEffect, useState} from 'react';
import {getGifs} from "../../../Helpers/tenorAPI/tenorAPI.ts";
import {observer} from "mobx-react-lite";
import SearchIcon from "../../../Imgs/SVG/SearchIcon.tsx";
import {useDebounce} from "usehooks-ts";
import answerStore from "../../../Store/GameStores/AnswerStore";
import MyInput from "../../../UI/MyInput";

const WindowChooseGif: React.FC = observer(() => {
    const [textSearcher, setTextSearcher] = useState("")
    const debounce = useDebounce(textSearcher, 500)

    useEffect(() => {
        getGifs(debounce, 10)
    }, [debounce])

    return (
        <div className="window">
            {
                answerStore.canChooseGif
                    ?
                    answerStore.userSelectedGif
                        ?
                        <div className="window__currentGif">
                            <img className="window__currentGif-img"
                                 src={answerStore.userSelectedGif.gif || answerStore.userSelectedGif.mediumGif}
                                 alt="gifImage"/>
                        </div>
                        :
                        <div className="window__block">
                            <div className="window__search">
                                <MyInput style="window__search-input" type="text" value={textSearcher}
                                         handleOnChange={(e) => setTextSearcher(e.target.value)}/>
                                <div className="window__search-search">
                                    <SearchIcon/>
                                </div>
                            </div>
                            <div className="window__items">
                                {
                                    answerStore.currentGifs.map(gif =>
                                        <div key={gif.id} className="window__items-item">
                                            <img className="window__item-gif"
                                                 src={gif.tinyGif || gif.nanoGif} alt="gifImage"
                                                 onClick={() => answerStore.setUserSelectedGif(gif)}/>
                                        </div>
                                    )}
                            </div>
                        </div>
                    :
                    <div className="window__choose" onClick={() => answerStore.setCanChooseGif(true)}>
                    </div>
            }
        </div>
    );
});

export default WindowChooseGif;
