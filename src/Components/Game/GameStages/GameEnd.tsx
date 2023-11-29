import React from 'react';
import reactionStore from "../../../Store/GameStores/ReactionStore";
import {observer} from "mobx-react-lite";
import MyButton from "../../../UI/MyButton";
import gameStore from "../../../Store/GameStores/GameStore";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import UserIcon from "../../../Imgs/SVG/UserIcon";

const GameEnd: React.FC = observer(() => {
    const navigate = useNavigate()
    const auth = getAuth()

    return (
        <div className="game__end">
            <ul className="end__users">
                {
                    reactionStore.usersScores.map((u, index) => {
                        if (index <= 2)
                            return (
                                <li key={index} className="end__user">
                                    <h1 className="end__user-place">{index + 1} место</h1>
                                    {
                                        u.photoURL
                                            ?
                                            <img className="end__user-image"
                                                 src={u.photoURL} alt="playerAvatar"/>
                                            :
                                            <div className="end__user-image">
                                                <UserIcon/>
                                            </div>
                                    }
                                    {
                                        auth.currentUser?.uid === u.userId
                                            ?
                                            <p className="end__user-name">
                                                {u.nickName}(Вы)&nbsp;-&nbsp;{u.score}
                                            </p>
                                            :
                                            <p className="end__user-name">
                                                {u.nickName}&nbsp;-&nbsp;{u.score}
                                            </p>
                                    }
                                </li>
                            )
                    })
                }
            </ul>
            <div className="end__button">
                <MyButton btnStyle="end__button-leave"
                          handleOnClick={() => gameStore.leaveGame().then(() => navigate("/lobby"))}
                          btnText="Выйти"/>
            </div>
        </div>
    );
});

export default GameEnd;
