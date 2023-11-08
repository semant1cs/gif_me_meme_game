import {IAnswerType} from "./AnswerType.ts";

export interface ISituationType {
    userId: string
    situationText: string
    answers: IAnswerType[]
}
