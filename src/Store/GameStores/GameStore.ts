import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore.ts";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {ILobbyType} from "../../Types/LobbyType";
import lobbyStore from "../LobbyStores/LobbyStore";
import situationStore from "./SituationStore";
import answerStore from "./AnswerStore";
// import {v4 as uuidv4} from "uuid";

class GameStore {
    currentUserStage: string = "";
    currentUserLobby: ILobbyType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setNullLocalVariables() {
        situationStore.setSituationText("")
        answerStore.setUserSelectedGif(null)
        answerStore.setCurrentGifs([])
        answerStore.setCanChooseGif(false)
    }

    async setCurrentUserLobby() {
        await lobbyStore.getCurrentUserLobby().then(lobby => this.setCurrentUserLobbyLocal(lobby))
    }

    setCurrentUserLobbyLocal(lobby: ILobbyType | null) {
        this.currentUserLobby = lobby
    }

    async setCurrentGameRound(round: number) {
        if (authStore.dataBase && this.currentUserLobby)
            await setDoc(doc(authStore.dataBase, "lobbies", this.currentUserLobby.uid), {
                ...this.currentUserLobby,
                currentGameRound: round,
            })
                .then(() => this.setCurrentUserLobby())
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
                .then(() => this.getCurrentUserStage())
    }

    async getCurrentUserStage() {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser) {
            await getDoc(doc(authStore.dataBase, "users", auth.currentUser.uid))
                .then((snap) => this.setCurrentUserStageLocal(snap.data()?.currentGameStage))
        }
    }

    setCurrentUserStageLocal(stage: string) {
        this.currentUserStage = stage
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
        const auth = getAuth()
        const currentUserLobby: ILobbyType | null = await lobbyStore.getCurrentUserLobby()

        if (authStore.dataBase && currentUserLobby?.uid) {
            const playerInd = currentUserLobby.players.findIndex(p => p.id === auth.currentUser?.uid)
            const leavedPlayer = currentUserLobby.players[playerInd]

            if (lobbyStore.userIsLobbyLeader)
                await lobbyStore.deleteLobbyWithPlayers(currentUserLobby)
            else
                await lobbyStore.removePlayerFromParty(currentUserLobby, leavedPlayer)
        }
    }

    // setRandomThemes() {
    //     const themes = []
    //     themes.forEach(async (theme) => {
    //         if (authStore.dataBase) {
    //             const themeId = uuidv4()
    //             await setDoc(doc(authStore.dataBase, "randomThemes", themeId), {
    //                 themeId: themeId,
    //                 themeTitle: theme,
    //             })
    //         }
    //     })
}

export default new

GameStore()
