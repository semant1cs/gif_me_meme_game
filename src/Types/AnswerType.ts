import {FieldValue} from "firebase/firestore";
import {IGifType} from "./GifType";

export interface IAnswerType {
    answeredUserId: string,
    answerId: string,
    lobbyId: string,
    situationId: string,
    answerGif: IGifType | null,
    answerPoints: number,
    createdAt: FieldValue,
}
