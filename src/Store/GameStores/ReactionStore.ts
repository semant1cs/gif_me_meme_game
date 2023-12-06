import {makeAutoObservable} from "mobx";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";
import {IReactionType} from "../../Types/ReactionType";
import answerStore from "./AnswerStore";
import {collection, deleteDoc, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import gameStore from "./GameStore";

type UsersScores = {
    userId: string,
    nickName: string | null | undefined,
    photoURL: string | null | undefined,
    score: number,
}

class ReactionStore {
    reactionValues: number[] = [0, 125, 250, 375, 500]
    usersScores: UsersScores[] = []

    constructor() {
        makeAutoObservable(this)
    }

    // TODO Ввести искусственное ограничего на отправку реакции.
    //  Если булевая переменная тру, то можем отправить, если нет, то не можем.
    //  Значение переменной меняется на фолс во время отправки реации и на тру после выполнения отправки.
    //  Если фолс, но мы нажимаем на отправку, то открывается окошко, в котором просят подождать, пока не смениться гифка
    async sendReaction(reactionIndex: number, answerIndex: number) {
        if (authStore.dataBase && answerStore.allLobbySituationAnswers) {

            const currentAnswer = answerStore.allLobbySituationAnswers[answerIndex]
            const reactionId = uuidv4()
            const reaction: IReactionType = {
                reactionId: reactionId,
                reactionPoints: this.reactionValues[reactionIndex],
                lobbyId: currentAnswer.lobbyId,
                situationId: currentAnswer.situationId,
                answerId: currentAnswer.answerId,
                answerUserId: currentAnswer.answeredUserId,
            }

            // console.log(reactionIndex, answerIndex)
            // console.log(reaction)

            await setDoc(doc(authStore.dataBase, "reactions", reaction.reactionId), {...reaction}).then()
        }
    }

    async deleteReaction(lobbyId: string) {
        if (authStore.dataBase) {
            const q = query(collection(authStore.dataBase, "reactions"),
                where("lobbyId", "==", lobbyId))

            await getDocs(q)
                .then((snap) =>
                    snap.docs.forEach(document => {
                        if (authStore.dataBase)
                            deleteDoc(doc(authStore.dataBase, "reactions", document.data().reactionId))
                    })
                )
        }
    }

    async calculateUsersPoints() {
        if (authStore.dataBase && gameStore.currentUserLobby) {
            const q = query(collection(authStore.dataBase, "reactions"),
                where("lobbyId", "==", gameStore.currentUserLobby.uid))

            await getDocs(q)
                .then((snap) => {
                    if (gameStore.currentUserLobby) {
                        const scores: UsersScores[] = []
                        gameStore.currentUserLobby.players.forEach(p => scores.push({
                            userId: p.id,
                            nickName: p.nickname,
                            photoURL: p.photoURL,
                            score: 0
                        }))
                        console.log(scores)

                        snap.docs.forEach(document => {
                            const userIndex = scores.findIndex(u => u.userId === document.data()?.answerUserId)
                            scores[userIndex].score += document.data()?.reactionPoints
                        })
                        console.log(scores)

                        this.setUsersScores(scores.sort((u1, u2) => u2.score - u1.score))
                    }
                })
        }
    }

    setUsersScores(scores: UsersScores[]) {
        this.usersScores = scores
    }
}

export default new ReactionStore()