import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import {IAnswerType} from "../../Types/AnswerType";
import {Timestamp} from "firebase/firestore";
import {IGifType} from "../../Types/GifType";

class AnswerStore {
    currentGifs: IGifType[] = [];
    canChooseGif: boolean = false;
    userSelectedGif: IGifType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setUserSelectedGif(gif: IGifType | null) {
        this.userSelectedGif = gif
    }

    setCanChooseGif(canChooseGif: boolean) {
        this.canChooseGif = canChooseGif;
    }

    setCurrentGifs(gifs: IGifType[]) {
        this.currentGifs = gifs
    }

    async sendAnswer() {
        console.log(this.userSelectedGif)
        const auth = getAuth()
        const answerId = uuidv4()
        const answer: IAnswerType = {
            answerId: answerId,
            answeredUserId: auth.currentUser?.uid,
            answerGif: this.userSelectedGif,
            answerPoints: 0,
            createdAt: Timestamp.now(),
        }
    }

}

export default new AnswerStore()
