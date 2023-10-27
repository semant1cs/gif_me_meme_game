import {makeAutoObservable} from "mobx";
import {
    collection, getDocs, serverTimestamp,
    QuerySnapshot, getDoc, doc, setDoc, deleteDoc,
} from "firebase/firestore";
import {v4 as uuidv4} from "uuid";
import {ILobbyType} from "../Types/LobbyType";
import authStore from "./AuthStore";
import {getAuth} from "firebase/auth";
import {IUserType} from "../Types/UserType";

class LobbyStore {
    showCreateModal: boolean = false;
    paramsLobbyName: string = "";
    paramsPlayerCount: number = 0;
    paramsIsLobbyPrivate: boolean = false;
    paramsIsAutoStart: boolean = false;
    currentAvailableParties: ILobbyType[] = [];
    userLobby: ILobbyType | null = null;
    userIsLobbyLeader: boolean = false;
    signOutModal: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    changeSignOutModal() {
        this.signOutModal = !this.signOutModal
    }

    changeShowCreateModal() {
        this.showCreateModal = !this.showCreateModal
    }

    setParamsLobbyName(lobbyName: string) {
        this.paramsLobbyName = lobbyName;
    }

    setParamsPlayerCount(playersCount: number) {
        this.paramsPlayerCount = playersCount
    }

    setParamsIsLobbyPrivate(data?: boolean | undefined) {
        if (typeof (data) === "boolean")
            this.paramsIsLobbyPrivate = data
        else
            this.paramsIsLobbyPrivate = !this.paramsIsLobbyPrivate
    }

    setParamsIsAutoStart(data?: boolean | undefined) {
        if (typeof (data) === "boolean")
            this.paramsIsAutoStart = data
        else
            this.paramsIsAutoStart = !this.paramsIsAutoStart
    }

    setUserLobby(lobby: ILobbyType | null) {
        this.userLobby = lobby
    }

    setUserIsLobbyLeader(isLobbyLeader: boolean) {
        this.userIsLobbyLeader = isLobbyLeader
    }

    makeParamsNull() {
        this.setParamsLobbyName("")
        this.setParamsPlayerCount(0)
        this.setParamsIsLobbyPrivate(false)
        this.setParamsIsAutoStart(false)
    }

    // Вызывается один раз при первой подгрузке страницы
    async getUserLobbyInfo() {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser)
            await getDoc(doc(authStore.dataBase, "users", auth.currentUser.uid))
                .then((snap) => {
                    // console.log(snap.data()?.lobby)
                    // console.log(snap.data()?.isLobbyLeader)
                    this.setUserLobby(snap.data()?.lobby)
                    this.setUserIsLobbyLeader(snap.data()?.isLobbyLeader)
                })
    }

    // Изменяет значения пользователя, связанные с лобби, изменяет локальные переменные, которые нужны
    // чтобы не делать постоянно запросы в бд
    async changeUserDataInDB(lobby: ILobbyType | null, isLobbyLeader: boolean) {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser)
            await setDoc(doc(authStore.dataBase, "users", auth.currentUser.uid), {
                email: auth.currentUser?.email,
                id: auth.currentUser?.uid,
                nickname: auth.currentUser?.displayName,
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
                lobby: lobby,
                isLobbyLeader: isLobbyLeader,
            })
                .then(() => {
                    // console.log(lobby)
                    // console.log(isLobbyLeader)
                    this.setUserLobby(lobby)
                    this.setUserIsLobbyLeader(isLobbyLeader)
                })
    }

    // Создаёт новое лобби
    async createNewLobby() {
        if (this.paramsLobbyName && this.paramsPlayerCount && authStore.dataBase) {
            const uid = uuidv4()
            const newLobby: ILobbyType = {
                uid: uid,
                lobbyName: this.paramsLobbyName,
                playerCount: this.paramsPlayerCount,
                isLobbyPrivate: this.paramsIsLobbyPrivate,
                isAutoStart: this.paramsIsAutoStart,
                players: [],
                createdAt: serverTimestamp(),
            }
            await setDoc(doc(authStore.dataBase, "lobbies", uid), {...newLobby})
                .then(() => this.changeShowCreateModal())
                .then(() => this.makeParamsNull())
                .then(() => this.addPlayer(newLobby))
                .then(() => this.getLobbiesData())
        }
    }

    // Удаляет существующее лобби
    async deleteLobby(lobbyInfo: ILobbyType) {
        if (authStore.dataBase)
            await deleteDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid))
                .then(() => this.getLobbiesData())
    }

    async deleteLobbyWithPlayers(lobbyInfo: ILobbyType) {
        console.log(lobbyInfo)

        lobbyInfo.players.map(async player => {
            if (authStore.dataBase && player.id)
                await setDoc(doc(authStore.dataBase, "users", player.id), {
                    email: player.email,
                    id: player.id,
                    nickname: player.nickname,
                    photoURL: player.photoURL,
                    token: player.token,
                    lobby: null,
                    isLobbyLeader: false,
                })
                    .then(() => {
                        this.setUserLobby(null)
                        this.setUserIsLobbyLeader(false)
                    })
                    .then(() => this.deleteLobby(lobbyInfo))
        })
    }

    checkLobbyStart(lobbyInfo: ILobbyType) {
        if (lobbyInfo.players.length + 1 === lobbyInfo.playerCount) {
            if (lobbyInfo.isAutoStart)
                alert("AutoStart")
            else
                alert("Start button")
        }
    }

    async getLobbiesData() {
        if (authStore.dataBase) {
            await getDocs(collection(authStore.dataBase, "lobbies"))
                .then(snap => this.setCurrentAvailableParties(snap))
        }
    }

    setCurrentAvailableParties(snap: QuerySnapshot) {
        this.currentAvailableParties = []
        snap.docs.forEach(item => {
            const newLobby = {
                uid: item.data().uid,
                lobbyName: item.data().lobbyName,
                playerCount: item.data().playerCount,
                isLobbyPrivate: item.data().isLobbyPrivate,
                isAutoStart: item.data().isAutoStart,
                players: item.data().players,
                createdAt: item.data().createdAt,
            }

            if (newLobby.players.length !== 0)
                this.currentAvailableParties.push(newLobby)
            else
                this.deleteLobby(newLobby).then()
        })
    }

    // Добавляет игрока в лобби, делается проверка на наличие игрока в других лобби с помощью this.userLobby
    // Если всё нормально, то игрок добавляется, изменяются локальные переменные игрока, связанные с лобби
    // Происходит проверка на начало игры
    async addPlayer(lobbyInfo: ILobbyType) {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser) {
            const user: IUserType = {
                id: auth.currentUser?.uid,
                nickname: auth.currentUser?.displayName,
                email: auth.currentUser?.email,
                isLobbyLeader: false,
                lobby: null,
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
            }
            const isUserNotInThisParty = lobbyInfo.players.findIndex(p => p.id === user.id) === -1

            if (!this.userLobby && isUserNotInThisParty)
                await setDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid), {
                    ...lobbyInfo,
                    players: [...lobbyInfo.players, user]
                })
                    .then(() => {
                        if (lobbyInfo.players.length === 0)
                            this.changeUserDataInDB(lobbyInfo, true)
                        else
                            this.changeUserDataInDB(lobbyInfo, false)
                    })
                    .then(() => this.getLobbiesData())
                    .then(() => this.checkLobbyStart(lobbyInfo))
        }
    }

    async removePlayerFromParty(lobbyInfo: ILobbyType, player: IUserType) {
        const auth = getAuth()
        const isUser = auth.currentUser?.uid === player.id

        if (authStore.dataBase && isUser)
            await getDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid))
                .then(async () => {
                    const newPlayers = lobbyInfo.players.filter((playerLobby) => playerLobby.id !== player.id)

                    if (authStore.dataBase)
                        await setDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid), {
                            ...lobbyInfo,
                            players: [...newPlayers]
                        })
                            .then(() => this.changeUserDataInDB(null, false))
                })
                .then(() => this.getLobbiesData())
    }
}

export default new LobbyStore()
