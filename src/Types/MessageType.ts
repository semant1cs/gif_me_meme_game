import {Timestamp} from "firebase/firestore";

export interface MessageType {
    id: string | undefined;
    displayName: string | null | undefined,
    photoURL: string | null | undefined;
    text: string;
    createdAt: Timestamp;
}
