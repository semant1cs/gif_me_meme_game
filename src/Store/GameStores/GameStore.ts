import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore.ts";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {ILobbyType} from "../../Types/LobbyType";
import lobbyStore from "../LobbyStores/LobbyStore";

class GameStore {
    currentUserStage: string = "";
    currentUserLobby: ILobbyType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    async setCurrentUserLobby() {
        await lobbyStore.getCurrentUserLobby().then(lobby => this.currentUserLobby = lobby)
    }

    async setCurrentUserStage(stage: string) {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser)
            await setDoc(doc(authStore.dataBase, "users", auth.currentUser.uid), {
                email: auth.currentUser?.email,
                id: auth.currentUser?.uid,
                nickname: auth.currentUser?.displayName,
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
                lobbyID: lobbyStore.userLobbyID,
                isLobbyLeader: lobbyStore.userIsLobbyLeader,
                currentGameStage: stage,
            })
    }

    async getCurrentUserStage() {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser) {
            await getDoc(doc(authStore.dataBase, "users", auth.currentUser.uid))
                .then((snap) => this.currentUserStage = snap.data()?.currentGameStage)
        }
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

    async leaveGame(currentUserLobby: ILobbyType | null) {
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
}

export default new GameStore()
