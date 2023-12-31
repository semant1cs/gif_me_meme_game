import {Timestamp} from "firebase/firestore";

export interface IMessageType {
    id: string | undefined,
    userId: string | undefined,
    text: string,
    createdAt: Timestamp,
    photoURL: string | undefined,
    displayName: string | undefined,
}
