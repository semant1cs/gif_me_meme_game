import React from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton";

const LobbyLobbies: React.FC = observer(() => {
    return (
        <section className="lobby__lobbies">
            <div className="lobbies__header">
                <h2>
                    Ожидают игры
                </h2>
                <MyButton btnText="Создать игру"
                          btnStyle="lobbies__button"
                          handleOnClick={() => {}}/>
            </div>
            <div className="lobbies__main">

            </div>
        </section>
    );
});

export default LobbyLobbies;
