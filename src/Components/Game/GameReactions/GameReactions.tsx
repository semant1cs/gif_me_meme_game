import React from 'react';
import {reactions} from "../../../assets/assetsPicker.ts";

const GameReactions: React.FC = () => {
    return (
        <div className="game-reactions">
            {reactions.map((reaction) => <img src={reaction.default} alt=""/>)}
        </div>
    );
};

export default GameReactions;
