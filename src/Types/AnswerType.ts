import {FieldValue} from "firebase/firestore";

export interface IAnswerType {
    answeredUserId: string | undefined,
    answerId: string,
    answerGif: string,
    answerPoints: number,
    createdAt: FieldValue,
}
