import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";
import {ISituationType} from "../../Types/SituationType";
import {doc, getDocs, query, where, setDoc, collection, serverTimestamp, orderBy, deleteDoc} from "firebase/firestore";
import gameStore from "./GameStore";

class SituationStore {
    situationText: string = "";
    allGameSituations: ISituationType[] | null = null;
    currentRoundSituation: ISituationType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setSituationText(newText: string) {
        this.situationText = newText
    }

    getRandomTheme() {

    }

    setCurrentRoundSituation() {
        if (gameStore.currentUserLobby && this.allGameSituations)
            this.currentRoundSituation = this.allGameSituations[gameStore.currentUserLobby?.currentGameRound - 1]
    }

    async deleteAllSituationAfterGameEnd() {
        if (authStore.dataBase && gameStore.currentUserLobby) {
            const q = query(collection(authStore.dataBase, "situations"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid))

            await getDocs(q)
                .then((snap) =>
                    snap.docs.forEach(document => {
                        if (authStore.dataBase)
                            deleteDoc(doc(authStore.dataBase, "situations", document.data().situationId))
                    })
                )
        }
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
                createdAt: serverTimestamp(),
            }

            await setDoc(doc(authStore.dataBase, "situations", situationId), {...situation})
                .then(() => gameStore.setCurrentUserStage("WaitingForPlayers"))
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
                            situationId: snap.data()?.situationId,
                            situationText: snap.data()?.situationText,
                            situationUserId: snap.data()?.situationUserId,
                            createdAt: snap.data()?.createdAt,
                        }

                        situations.push(situation)
                    })
                    this.setAllGameSituationsLocal(situations)
                })
        }
    }

    setAllGameSituationsLocal(situations: ISituationType[] | null) {
        this.allGameSituations = situations
    }
}

export default new SituationStore()
