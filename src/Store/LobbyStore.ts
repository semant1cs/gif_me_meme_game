import {makeAutoObservable} from "mobx";
import {addDoc, collection, getDocs, serverTimestamp} from "firebase/firestore";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import userStore from "./UserStore";
import {ILobbyType} from "../Types/LobbyType";

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
        if (this.paramsLobbyName && this.paramsPlayerCount && userStore.dataBase) {
            await addDoc(collection(userStore.dataBase, "lobbies"), {
                uid: uuidv4(),
                lobbyName: this.paramsLobbyName,
                playerCount: this.paramsPlayerCount,
                isLobbyPrivate: this.paramsIsLobbyPrivate,
                isAutoStart: this.paramsIsAutoStart,
                players: [],
                createdAt: serverTimestamp()
            })
                .then(() => this.changeShowCreateModal())
                .then(() => this.makeParamsNull())
                .then(() => this.getLobbiesData())
        }
    }

    async getLobbiesData() {
        if (userStore.dataBase) {
            await getDocs(collection(userStore.dataBase, "lobbies"))
                .then(snap => {
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
                })
        }
    }

//     Получение элемента коллекции по id
//     const ref = doc(db, "cities", "LA").withConverter(cityConverter);
// await setDoc(ref, new City("Los Angeles", "CA", "USA"));
}

export default new LobbyStore()
