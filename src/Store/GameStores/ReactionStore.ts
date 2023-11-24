import {makeAutoObservable} from "mobx";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";
import {IReactionType} from "../../Types/ReactionType";
import answerStore from "./AnswerStore";
import {doc, setDoc} from "firebase/firestore";

class ReactionStore {
    reactionValues: number[] = [0, 125, 250, 375, 500]

    constructor() {
        makeAutoObservable(this)
    }

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

            console.log(reactionIndex, answerIndex)
            console.log(reaction)

            await setDoc(doc(authStore.dataBase, "reactions", reaction.reactionId), {...reaction}).then()
        }
    }
}

export default new ReactionStore()