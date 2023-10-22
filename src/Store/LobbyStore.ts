import {makeAutoObservable} from "mobx";
import {
    collection, DocumentData, getDocs, serverTimestamp,
    QuerySnapshot, getDoc, doc, setDoc
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

    constructor() {
        makeAutoObservable(this)
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

    makeParamsNull() {
        this.setParamsLobbyName("")
        this.setParamsPlayerCount(0)
        this.setParamsIsLobbyPrivate(false)
        this.setParamsIsAutoStart(false)
    }

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

    async getLobbiesData() {
        if (authStore.dataBase) {
            await getDocs(collection(authStore.dataBase, "lobbies"))
                .then(snap => this.setCurrentAvailableParties(snap))
        }
    }

    setCurrentAvailableParties(snap: QuerySnapshot<DocumentData, DocumentData>) {
        this.currentAvailableParties = []
        snap.docs.forEach(item => {
            this.currentAvailableParties.push({
                uid: item.data().uid,
                lobbyName: item.data().lobbyName,
                isLobbyPrivate: item.data().isLobbyPrivate,
                isAutoStart: item.data().isAutoStart,
                players: item.data().players,
                playerCount: item.data().playerCount,
                createdAt: item.data().createdAt,
            })
        })
    }

    async addPlayer(lobbyInfo: ILobbyType) {
        const auth = getAuth()

        if (authStore.dataBase && auth.currentUser) {
            const user: IUserType = {
                email: auth.currentUser?.email,
                id: auth.currentUser?.uid,
                nickname: auth.currentUser?.displayName,
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
            }
            let resultLobby: ILobbyType | undefined
            let isPlayerInAnotherParty: boolean = false;

            await getDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid))
                .then(async (snap) => {
                    resultLobby = {
                        uid: snap.data()?.uid,
                        players: snap.data()?.players,
                        createdAt: snap.data()?.createdAt,
                        lobbyName: snap.data()?.lobbyName,
                        playerCount: snap.data()?.playerCount,
                        isLobbyPrivate: snap.data()?.isLobbyPrivate,
                        isAutoStart: snap.data()?.isAutoStart,
                    }

                    this.currentAvailableParties.forEach(party => {
                        if (party.players.findIndex(player => auth.currentUser?.uid === player.id) !== -1)
                            isPlayerInAnotherParty = true
                    })

                    return {resultLobby, isPlayerInAnotherParty}

                })
                .then(async ({resultLobby, isPlayerInAnotherParty}) => {
                    const isUserNotInThisParty = resultLobby.players.findIndex(p => p.id === user.id) === -1

                    if (!isPlayerInAnotherParty && isUserNotInThisParty && authStore.dataBase)
                        await setDoc(doc(authStore.dataBase, "lobbies", lobbyInfo.uid), {
                            ...resultLobby,
                            players: [...resultLobby.players, user]
                        })
                })
                .then(() => this.getLobbiesData())
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
                })
                .then(() => this.getLobbiesData())
    }
}

export default new LobbyStore()
