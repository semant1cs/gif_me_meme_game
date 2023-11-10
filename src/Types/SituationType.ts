import {IAnswerType} from "./AnswerType.ts";
import {FieldValue} from "firebase/firestore";

export interface ISituationType {
    lobbyId: string | null,
    situationId: string,
    situationUserId: string,
    situationText: string,
    answers: IAnswerType[],
    createdAt: FieldValue,
}
