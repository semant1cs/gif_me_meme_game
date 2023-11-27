import {Timestamp} from "firebase/firestore";

export interface IMessageType {
    id: string | undefined;
    displayName: string | null | undefined,
    photoURL: string | null | undefined,
    userId: string | undefined,
    text: string,
    createdAt: Timestamp,
}
