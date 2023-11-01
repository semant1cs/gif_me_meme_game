import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "./AuthStore.ts";
import {doc, setDoc} from "firebase/firestore";
import {ILobbyType} from "../Types/LobbyType";
import lobbyStore from "./LobbyStore";

class GameStore {
    testGifs: string[] = [];
    selectedGifs: number = 0;
    chosenGif: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    async startGame() {
        const currentUserLobby: ILobbyType | null = await lobbyStore.getCurrentUserLobby().then(lobby => lobby)

        if (authStore.dataBase && currentUserLobby) {
            await setDoc(doc(authStore.dataBase, "lobbies", currentUserLobby.uid), {
                ...currentUserLobby,
                isLobbyInGame: true,
            })
        }
    }

    async leaveGame() {
        const currentUserLobby: ILobbyType | null = await lobbyStore.getCurrentUserLobby()
        const auth = getAuth()

        if (authStore.dataBase && currentUserLobby) {
            const playerInd = currentUserLobby.players.findIndex(p => p.id === auth.currentUser?.uid)
            const leavedPlayer = currentUserLobby.players[playerInd]

            if (lobbyStore.userIsLobbyLeader)
                await lobbyStore.deleteLobbyWithPlayers(currentUserLobby)
            else
                await lobbyStore.removePlayerFromParty(currentUserLobby, leavedPlayer)
        }
    }

    setTestGifs(gifs: string[]) {
        this.testGifs = gifs
    }

    setSelectedGifs(value: number) {
        this.selectedGifs = value
    }

    setChosenGif(gif: string) {
        this.chosenGif = gif
    }

    async appendGifOnDb(gif: string) {
        const auth = getAuth()
        const uid = auth.currentUser?.uid
        if (authStore.dataBase && uid) {
            await setDoc(doc(authStore.dataBase, "playersGifs", uid), {})
        }
    }
}

export default new GameStore()
