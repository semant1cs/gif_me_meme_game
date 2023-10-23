import {IUserType} from "./UserType";
import {ILobbyType} from "./LobbyType";

export interface IUserWithLobbyType extends IUserType {
    lobby: ILobbyType | undefined | null,
    isLobbyLeader: boolean | undefined | null,
}
