import {FieldValue} from "firebase/firestore";

export interface ISituationType {
    lobbyId: string | null,
    situationId: string,
    situationUserId: string,
    situationText: string,
    createdAt: FieldValue,
}
