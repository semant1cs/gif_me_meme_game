import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";
import {ISituationType} from "../../Types/SituationType";
import {doc, getDoc, setDoc} from "firebase/firestore";
import gameStore from "./GameStore";
import answerStore from "./AnswerStore";

class SituationStore {
    situationText: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    setSituationText(newText: string) {
        this.situationText = newText
    }

    getRandomTheme() {

    }

    async sendSituation() {
        const auth = getAuth()
        const situationId = uuidv4()

        if (authStore.dataBase && gameStore.currentUserLobby && auth.currentUser?.uid) {
            const situation: ISituationType = {
                lobbyId: gameStore.currentUserLobby.uid,
                situationId: situationId,
                situationUserId: auth.currentUser?.uid,
                situationText: this.situationText,
                answers: [],
            }

            await setDoc(doc(authStore.dataBase, "situations", situationId), {...situation})
                .then(() => gameStore.setCurrentUserStage("WaitingForPlayers"))
        }
    }

    async getSituation() {
        if (authStore.dataBase && gameStore.currentUserLobby) {
            await getDoc(doc(authStore.dataBase, "situations", gameStore.currentUserLobby.uid))
                .then((snap) => {
                    answerStore.setFetchedText(snap.data()?.situationText)
                })
        }
    }
}

export default new SituationStore()