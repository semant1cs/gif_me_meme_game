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
    currentUserIdea: string = "";

    constructor() {
        makeAutoObservable(this)
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

    setCurrentUserIdea(idea: string) {
        this.currentUserIdea = idea
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

    getRandomTheme() {

    }

    sendIdea() {

    }

    // async sendSituation() {
    //     if (authStore.dataBase && lobbyStore.userLobbyID && lobbyStore) {
    //         const userCurrent: IUserType = {
    //             email: auth.currentUser?.email,
    //             id: auth.currentUser?.uid,
    //             nickname: auth.currentUser?.displayName || this.userAuthNickName,
    //             photoURL: auth.currentUser?.photoURL,
    //             token: auth.currentUser?.refreshToken,
    //             lobbyID: null,
    //             isLobbyLeader: false,
    //         }
    //
    //         await setDoc(doc(this.dataBase, "users", auth.currentUser?.uid), {...userCurrent})
    //     }
    // }
}

export default new GameStore()
