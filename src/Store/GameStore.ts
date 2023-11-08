import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "./AuthStore.ts";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {ILobbyType} from "../Types/LobbyType";
import lobbyStore from "./LobbyStore";
import {ISituationType} from "../Types/SituationType.ts";
import {v4 as uuidv4} from "uuid";

class GameStore {
    testGifs: string[] = [];
    selectedGifs: number = 0;
    chosenGif: string = "";
    situationText: string = "";
    situationId: string = "";

    // Пока что сделал этапы таким образом:
    // 1 предложение идеи
    // 2 ответ пользователя на идею
    // 3 отправка реакции на ответ пользователя
    // рендер компонентов зависит от текущего этапа
    currentStage: number = 0;
    fetchedText: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    setTestGifs(gifs: string[]) {
        this.testGifs = gifs
    }

    setSelectedGifs(value: number) {
        this.selectedGifs = value
    }

    setFetchedText(fetchedText: string) {
        this.fetchedText = fetchedText
    }

    setChosenGif(gif: string) {
        this.chosenGif = gif
    }

    setSituationText(newText: string) {
        this.situationText = newText
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

    setNextStage() {
        this.currentStage++
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

    async sendSituation() {
        const auth = getAuth()
        const currentUserLobby: string | null = await lobbyStore.getCurrentUserLobby().then(lobby => lobby?.uid)
        if (authStore.dataBase && currentUserLobby && auth.currentUser?.uid) {
            const situationId = uuidv4()
            const situation: ISituationType = {
                lobbyId: currentUserLobby,
                situationId: situationId,
                situationUserId: auth.currentUser?.uid,
                situationText: this.situationText,
                answers: [],
            }

            await setDoc(doc(authStore.dataBase, "situations", currentUserLobby), {...situation}).then(() => this.setNextStage())
        }
    }

    async getSituation() {
        const currentUserLobby: string | null = await lobbyStore.getCurrentUserLobby().then(lobby => lobby?.uid)

        if (authStore.dataBase && currentUserLobby) {
            await getDoc(doc(authStore.dataBase, "situations", currentUserLobby)).then((snap) => {
                this.setFetchedText(snap.data()?.situationText)
            })
        }
    }
}

export default new GameStore()
