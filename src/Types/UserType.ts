import {ILobbyType} from "./LobbyType.ts";

export interface IUserType {
    id: string | undefined,
    nickname: string | null | undefined,
    email: string | null | undefined,
    isLobbyLeader: boolean | null | undefined,
    lobby: ILobbyType | null | undefined,
    photoURL: string | null | undefined,
    token: string | undefined,
}
