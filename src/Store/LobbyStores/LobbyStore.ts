import {makeAutoObservable} from "mobx";
import {
    serverTimestamp, getDoc, doc, setDoc, deleteDoc, updateDoc,
} from "firebase/firestore";
import {v4 as uuidv4} from "uuid";
import {ILobbyType} from "../../Types/LobbyType";
import authStore from "../AuthStore";
import {getAuth, updateProfile} from "firebase/auth";
import {IUserType} from "../../Types/UserType";
import gameStore from "../GameStores/GameStore";
import situationStore from "../GameStores/SituationStore";
import answerStore from "../GameStores/AnswerStore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import reactionStore from "../GameStores/ReactionStore";

class LobbyStore {
    showCreateModal: boolean = false;
    paramsLobbyName: string = "";
    paramsPlayerCount: number = 0;
    paramsIsLobbyPrivate: boolean = false;
    paramsIsAutoStart: boolean = false;
    userLobbyID: string | null = null;
    userIsLobbyLeader: boolean = false;
    signOutModal: boolean = false;
    userImageLocal: string | null | undefined = "";

    constructor() {
        makeAutoObservable(this)
    }

    setUserImage(img: File | null) {
        if (img && authStore.storage) {
            const auth = getAuth();
            const user = auth.currentUser

            const userImage = ref(authStore.storage, img.name)

            uploadBytes(userImage, img)
                .then(() => getDownloadURL(userImage)
                    .then((url) => {
                        if (user && authStore.dataBase) {
                            updateProfile(user, {photoURL: url}).then()
                            updateDoc(doc(authStore.dataBase, "users", user.uid), {photoURL: url}).then()
                            this.userImageLocal = url
                            this.changeSignOutModal(false)
                        }
                    })
                )
        }
    }

    getUserImage() {
        const auth = getAuth()
        this.userImageLocal = auth.currentUser?.photoURL
    }

    changeSignOutModal(flag?: boolean) {
        if (flag !== undefined)
            this.signOutModal = flag
        else
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

    setUserLobbyID(lobby: string | null) {
        this.userLobbyID = lobby
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
                    // console.log(snap.data()?.lobbyID)
                    // console.log(snap.data()?.isLobbyLeader)
                    this.setUserLobbyID(snap.data()?.lobbyID)
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
                lobbyID: lobby?.uid || null,
                isLobbyLeader: isLobbyLeader,
                currentGameStage: "IdeaPropose",
            })
                .then(() => {
                    // console.log(lobby)
                    // console.log(isLobbyLeader)
                    this.setUserLobbyID(lobby?.uid || "")
                    this.setUserIsLobbyLeader(isLobbyLeader)
                })
    }

    async getCurrentUserLobby() {
        if (authStore.dataBase && this.userLobbyID) {
            return await getDoc(doc(authStore.dataBase, "lobbies", this.userLobbyID))
                .then((snap) => {
                    return {
                        uid: snap.data()?.uid,
                        lobbyName: snap.data()?.lobbyName,
                        playerCount: snap.data()?.playerCount,
                        isLobbyPrivate: snap.data()?.isLobbyPrivate,
                        isAutoStart: snap.data()?.isAutoStart,
                        isLobbyInGame: snap.data()?.isLobbyInGame,
                        currentGameRound: snap.data()?.currentGameRound,
                        players: snap.data()?.players,
                        createdAt: snap.data()?.createdAt,
                    }
                })
        }

        return null
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
                isLobbyInGame: false,
                currentGameRound: 1,
                createdAt: serverTimestamp(),
            }
            await setDoc(doc(authStore.dataBase, "lobbies", uid), {...newLobby})
                .then(() => this.changeShowCreateModal())
                .then(() => this.makeParamsNull())
                .then(() => this.addPlayer(newLobby))
        }
    }

    // Удаляет существующее лобби
    async deleteLobby(lobbyInfo: ILobbyType) {
        if (authStore.dataBase)
            deleteDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid))
                .then(() => situationStore.deleteAllSituationAfterGameEnd(lobbyInfo.uid)
                    .then(() => answerStore.deleteAllAnswers(lobbyInfo.uid)
                        .then(() => reactionStore.deleteReaction(lobbyInfo.uid)
                            .then(() => this.getUserLobbyInfo())
                        )
                    )
                )
    }

    async deleteLobbyWithPlayers(lobbyInfo: ILobbyType) {
        this.deleteLobby(lobbyInfo).then(() => {
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
                        currentGameStage: "IdeaPropose",
                    })
                        .then(() => {
                            this.setUserLobbyID(null)
                            this.setUserIsLobbyLeader(false)
                        })
            })
        })
    }

    checkLobbyStart(lobbyInfo: ILobbyType) {
        if (lobbyInfo.players.length + 1 === lobbyInfo.playerCount && lobbyInfo.isAutoStart) {
            gameStore.startGame().then()
        }
    }

    // Добавляет игрока в лобби, делается проверка на наличие игрока в других лобби с помощью this.userLobbyID
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
                lobbyID: null,
                currentGameStage: "IdeaPropose",
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
            }
            const isUserNotInThisParty = lobbyInfo.players.findIndex(p => p.id === user.id) === -1

            if (!this.userLobbyID && isUserNotInThisParty)
                await setDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid), {
                    ...lobbyInfo,
                    players: [...lobbyInfo.players, user]
                })
                    .then(() => {
                        if (lobbyInfo.players.length === 0)
                            this.changeUserDataInDB(lobbyInfo, true)
                        else
                            this.changeUserDataInDB(lobbyInfo, false)
                                .then(() => this.checkLobbyStart(lobbyInfo))
                    })
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
    }
}

export default new LobbyStore()
