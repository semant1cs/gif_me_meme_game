import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../../UI/MyButton";
import lobbyStore from "../../../Store/LobbyStore";
import ModalWindow from "../../../UI/ModalWindow";
import LobbyParty from "./LobbyParty.tsx";
import {useNavigate} from "react-router-dom";
import LobbyModalBody from "./LobbyModalBody";
import authStore from "../../../Store/AuthStore";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {ILobbyType} from "../../../Types/LobbyType";

const LobbyLobbies: React.FC = observer(() => {
    const navigate = useNavigate()
    const [currentLobbies, setCurrentLobbies] = useState<ILobbyType[]>([])

    useEffect(() => {
        lobbyStore.getUserLobbyInfo().then()

        if (authStore.dataBase) {
            const q = query(collection(authStore.dataBase, "lobbies"), orderBy("createdAt"))

            return onSnapshot(q, (QuerySnapshot) => {

                const fetchedLobbies: ILobbyType[] = []
                QuerySnapshot.forEach((lobby) => {
                    const newLobby: ILobbyType = {
                        uid: lobby.data().uid,
                        lobbyName: lobby.data().lobbyName,
                        playerCount: lobby.data().playerCount,
                        isLobbyPrivate: lobby.data().isLobbyPrivate,
                        isAutoStart: lobby.data().isAutoStart,
                        players: lobby.data().players,
                        createdAt: lobby.data().createdAt,
                    }

                    fetchedLobbies.push(newLobby)
                })
                setCurrentLobbies(fetchedLobbies)
            })
        }
    }, [])

    const handleOnStart = () => {
        navigate("/play")
    }

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
                <div>
                    {
                        lobbyStore.userIsLobbyLeader
                            ?
                            <MyButton btnText="Начать игру"
                                      btnStyle="lobbies__button"
                                      handleOnClick={() => handleOnStart()}/>
                            : ""
                    }
                    {
                        lobbyStore.userLobby
                            ? ""
                            : <MyButton btnText="Создать игру"
                                        btnStyle="lobbies__button"
                                        handleOnClick={() => lobbyStore.changeShowCreateModal()}/>
                    }

                </div>
            </div>
            <div className="lobbies__main">
                {
                    currentLobbies
                        ? currentLobbies.map((lobby, index) =>
                            <LobbyParty lobbyInfo={lobby} key={index}/>)
                        : ""
                }
            </div>
        </section>
    );
});

export default LobbyLobbies;
