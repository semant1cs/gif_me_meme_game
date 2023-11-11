import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import {IAnswerType} from "../../Types/AnswerType";
import authStore from "../AuthStore";
import {ISituationType} from "../../Types/SituationType";
import situationStore from "./SituationStore";
import {doc, getDoc, setDoc, Timestamp} from "firebase/firestore";
import gameStore from "./GameStore";

class AnswerStore {
    chosenGif: string = "";
    fetchedText: string = "";
    fetchedGif: string = "";
    testGifs: string[] = [];
    selectedGifs: number = 0;

    fetchedSituationId: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    setChosenGif(gif: string) {
        this.chosenGif = gif
    }

    setFetchedGif(receivedGif: string) {
        this.fetchedGif = receivedGif
    }

    setTestGifs(gifs: string[]) {
        this.testGifs = gifs
    }

    setSelectedGifs(value: number) {
        this.selectedGifs = value
    }

    setFetchedText(receivedText: string) {
        this.fetchedText = receivedText
    }

    setFetchedSituationId(newId: string) {
        this.fetchedSituationId = newId
    }

    async getNewSituationId() {
        const auth = getAuth()
        if (authStore.dataBase && gameStore.currentUserLobby && auth.currentUser?.uid) {
            await getDoc(doc(authStore.dataBase, "situations", gameStore.currentUserLobby.uid)).then((snap) => {
                this.setFetchedSituationId(snap.data()?.situationId)
            })
        }
    }

    async sendAnswer() {
        const auth = getAuth()
        const answerId = uuidv4()
        const answer: IAnswerType = {
            answerId: answerId,
            answeredUserId: auth.currentUser?.uid,
            answerGif: this.chosenGif,
            answerPoints: 0,
            createdAt: Timestamp.now(),
        }

        gameStore.setCurrentUserLobby().then()
        this.getNewSituationId().then()

        if (authStore.dataBase && gameStore.currentUserLobby && auth.currentUser?.uid) {
            const situation: ISituationType = {
                lobbyId: gameStore.currentUserLobby.uid,
                situationId: this.fetchedSituationId,
                situationUserId: auth.currentUser?.uid,
                situationText: situationStore.situationText,
                answers: [{...answer}],
                createdAt: Timestamp.now(),
            }

            await setDoc(doc(authStore.dataBase, "situations", gameStore.currentUserLobby.uid), {...situation})
                .then(() => gameStore.setCurrentUserStage(""))
        }
    }

    async getAnswer() {
        gameStore.setCurrentUserLobby().then()
        if (authStore.dataBase && gameStore.currentUserLobby) {
            await getDoc(doc(authStore.dataBase, "situations", gameStore.currentUserLobby.uid))
                .then((snap) => {
                    this.setFetchedGif(snap.data()?.answers[0].answerGif)
                })
        }
    }

}

export default new AnswerStore()