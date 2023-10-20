export interface ILobbyType {
    uid: string,
    lobbyName: string,
    isLobbyPrivate: boolean,
    isAutoStart: boolean,
    players: {
        nickname: string;
        photoURL: string;
    }[];
    playerCount: number;
    createdAt: Date;
}