import {IUserType} from "./UserType";
import {
    FieldValue
} from "firebase/firestore";

export interface ILobbyType {
    uid: string,
    lobbyName: string,
    isLobbyPrivate: boolean,
    isAutoStart: boolean,
    players: IUserType[];
    playerCount: number;
    createdAt: FieldValue;
}