import {IAnswerType} from "./AnswerType.ts";

export interface ISituationType {
    lobbyId: string | null,
    situationId: string,
    situationUserId: string,
    situationText: string,
    answers: IAnswerType[]
}
