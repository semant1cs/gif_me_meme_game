export interface IUserType {
    id: string,
    nickname: string | null | undefined,
    email: string | null | undefined,
    isLobbyLeader: boolean | null | undefined,
    lobbyID: string | null | undefined,
    currentGameStage: string,
    photoURL: string | null | undefined,
    token: string | undefined,
}
