import React from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../UI/MyButton";
import lobbyStore from "../../Store/LobbyStore";
import ModalWindow from "../../UI/ModalWindow";


const LobbyModalBody: React.FC = () => {
    return (
        <div>
            <h1 className="title-modal">СОЗДАНИЕ ЛОББИ</h1>
            <p>Название лобби <input type="text"/></p>
            <p>Количество игроков 2 3 4 5</p>
            <p>Видимость Общедоступное / Закрытое</p>
            <p>Автостарт вкл/выкл</p>
        </div>
    )
};

const LobbyLobbies: React.FC = observer(() => {
    return (
        <section className="lobby__lobbies">
            {
                lobbyStore.showCreateModal
                    ? <ModalWindow onClose={() => lobbyStore.changeShowCreateModal()}
                                   onSubmit={() => lobbyStore.createNewLobby()}
                                   body={<LobbyModalBody/>}
                                   windowContentStyles="lobbies__modal"/> : ""
            }
            <div className="lobbies__header">
                <h2>
                    Ожидают игры
                </h2>
                <MyButton btnText="Создать игру"
                          btnStyle="lobbies__button"
                          handleOnClick={() => lobbyStore.changeShowCreateModal()}/>
            </div>
            <div className="lobbies__main">
            </div>
        </section>
    );
});

export default LobbyLobbies;
