import React, {useState} from 'react';
import {reactions} from "../../../assets/assetsPicker.ts";

const GameReactions: React.FC = () => {
    const [points, setPoints] = useState(0)

    return (
        <div className="game-reactions">

            {reactions.map((reaction) => <img key={reaction.imgSrc.default} src={reaction.imgSrc.default} alt=""
                                              onClick={() => setPoints(points + reaction.points)}/>)}
            <br/>
            {points}
        </div>
    );
};

export default GameReactions;
