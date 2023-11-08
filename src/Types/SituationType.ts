import {IAnswerType} from "./AnswerType.ts";

export interface ISituationType {
    lobbyId: string,
    situationUserId: string,
    situationId: string,
    situationText: string,
    answers: IAnswerType[]
}
