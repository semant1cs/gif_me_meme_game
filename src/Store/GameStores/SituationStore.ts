import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";
import {ISituationType} from "../../Types/SituationType";
import {doc, getDocs, query, where, setDoc, collection, serverTimestamp, orderBy} from "firebase/firestore";
import gameStore from "./GameStore";

class SituationStore {
    situationText: string = "";
    allGameSituations: ISituationType[] | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setSituationText(newText: string) {
        this.situationText = newText
    }

    getRandomTheme() {

    }

    async deleteAllSituationAfterGameEnd() {

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
                createdAt: serverTimestamp(),
            }

            await setDoc(doc(authStore.dataBase, "situations", situationId), {...situation})
                .then(() => gameStore.setCurrentUserStage("WaitingForPlayers")
                    .then(() => gameStore.getCurrentUserStage()))
        }
    }

    async getSituations() {
        if (authStore.dataBase && gameStore.currentUserLobby) {
            const q = query(
                collection(authStore.dataBase, "situations"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid),
                orderBy("createdAt")
            );

            await getDocs(q)
                .then(doc => {
                    const situations: ISituationType[] = [];

                    doc.forEach(snap => {
                        const situation: ISituationType = {
                            lobbyId: snap.data()?.lobbyId,
                            answers: snap.data()?.answers,
                            situationId: snap.data()?.situationId,
                            situationText: snap.data()?.situationText,
                            situationUserId: snap.data()?.situationUserId,
                            createdAt: snap.data()?.createdAt,
                        }

                        situations.push(situation)
                    })

                    console.log(situations)
                    this.setAllGameSituationsLocal(situations)
                })
        }
    }

    setAllGameSituationsLocal(situations: ISituationType[] | null) {
        this.allGameSituations = situations
    }
}

export default new SituationStore()