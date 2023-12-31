import {IUserType} from "./UserType";
import {
    FieldValue
} from "firebase/firestore";

export interface ILobbyType {
    uid: string,
    lobbyName: string,
    playerCount: number,
    isLobbyPrivate: boolean,
    isAutoStart: boolean,
    isLobbyInGame: boolean,
    currentGameRound: number,
    players: IUserType[],
    createdAt: FieldValue,
}
