import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyButton from "../../../UI/MyButton";
import lobbyStore from "../../../Store/LobbyStores/LobbyStore";
import ModalWindow from "../../../UI/ModalWindow";
import LobbyParty from "./LobbyParty.tsx";
import {useNavigate} from "react-router-dom";
import LobbyModalBody from "./LobbyModalBody";
import authStore from "../../../Store/AuthStore";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {ILobbyType} from "../../../Types/LobbyType";
import gameStore from "../../../Store/GameStores/GameStore";
import {getAuth} from "firebase/auth";

const LobbyLobbies: React.FC = observer(() => {
    const navigate = useNavigate()
    const [currentLobbies, setCurrentLobbies] = useState<ILobbyType[]>([])

    useEffect(() => {
        lobbyStore.getUserLobbyInfo().then()

        if (authStore.dataBase) {
            const auth = getAuth()
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
                        isLobbyInGame: lobby.data().isLobbyInGame,
                        players: lobby.data().players,
                        createdAt: lobby.data().createdAt,
                    }

                    if (newLobby.isLobbyInGame && newLobby.players.findIndex(p => p.id === auth.currentUser?.uid) !== -1) {
                        const prom = new Promise(() => {
                            navigate('/loader')
                            setTimeout(() => navigate(`/gameLobby?lobbyID=${newLobby.uid}`), 1500)
                        }).then()
                        Promise.resolve(prom).then()
                    } else {
                        fetchedLobbies.push(newLobby)
                    }

                })
                setCurrentLobbies(fetchedLobbies)
            })
        }
    }, [])

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
                                      handleOnClick={() => gameStore.startGame().then()}/>
                            : ""
                    }
                    {
                        lobbyStore.userLobbyID
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
