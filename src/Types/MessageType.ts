import {Timestamp} from "firebase/firestore";

export interface IMessageType {
    id: string | undefined,
    userId: string | undefined,
    text: string,
    createdAt: Timestamp,
}
